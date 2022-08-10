import {
    Autocomplete,
    Box,
    Checkbox,
    FilledInput,
    FormControl,
    FormControlLabel,
    FormControlProps,
    FormHelperText,
    FormLabel,
    Input,
    InputLabel,
    OutlinedInput,
    Radio,
    Rating,
    Select,
    Slider,
    Switch,
    TextField,
    ToggleButtonGroup
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component, cloneElement, createElement, createContext, Fragment } from 'react';
import { $FieldHandler, BaseEasyFieldComponentProps, EasyField, OtherKeys } from 'react-formutil';
import isEqual from 'react-fast-compare';
import { CheckboxGroup } from './CheckboxGroup';

type RegisterField = ((name, $fieldutil) => void) | null;

const { Consumer, Provider } = createContext<RegisterField>(null);

/**
 * 0 dirty & invalid & touched
 * 1 dirty & invalid
 * 2 invalid
 */
export type ErrorLevel = 0 | 1 | 2;

let errorLevelGlobal: ErrorLevel = 1;

export const setErrorLevel = function (level: ErrorLevel) {
    errorLevelGlobal = level;
};

function getChildComponent(children) {
    let component = children?.type;

    if (component === FormControlLabel) {
        component = getChildComponent(children.props.control);
    }

    return component;
}

export interface FormControlComponentProps<T = any, P = {}, Fields = {}, WeakFields = Fields>
    extends BaseEasyFieldComponentProps<T, P, Fields, WeakFields>,
        Omit<FormControlProps, 'defaultValue' | 'required'> {
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    errorLevel?: ErrorLevel;
    noStyle?: boolean;
    children: React.ReactElement<any> | (($fieldHandler: Partial<$FieldHandler<T>> & OtherKeys) => React.ReactNode);
}

const inputLikeConponents = [TextField, Input, OutlinedInput, FilledInput, Autocomplete, Select];
const syncLabelComponents = [Select, OutlinedInput];
const specialValueComponents = [Rating, Autocomplete, ToggleButtonGroup, Slider];

class _FormControl extends Component<FormControlComponentProps & OtherKeys> {
    static propTypes = {
        children(props, ...args) {
            if ('name' in props) {
                // @ts-ignore
                return PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired(props, ...args);
            }

            // @ts-ignore
            return PropTypes.node.isRequired(props, ...args);
        },
        label: PropTypes.any,
        helperText: PropTypes.any,
        controlProps: PropTypes.object, //传递给FormControl组件的属性
        errorLevel: PropTypes.number,
        noStyle: PropTypes.bool
    };

    $fieldutil: any;
    registerAncestorField: RegisterField;
    compositionValue?: string;
    isComposing: boolean;

    fields = {};
    registerField = (name, $fieldutil) => ($fieldutil ? (this.fields[name] = $fieldutil) : delete this.fields[name]);
    latestValidationProps: any = null;
    checkHasError = (errorLevel, $invalid, $dirty, $touched) => {
        switch (errorLevel) {
            case 0:
                return $invalid && $dirty && $touched;
            case 1:
                return $invalid && $dirty;
            case 2:
                return $invalid;
            default:
                return false;
        }
    };

    fetchCurrentValidationProps = errorLevel => {
        const allFieldutils = Object.keys(this.fields).map(name => this.fields[name].$new());
        const errFieldutils = allFieldutils.filter($fieldutil => $fieldutil.$invalid);

        const $invalid = errFieldutils.length > 0;
        const $dirty = allFieldutils.some($fieldutil => $fieldutil.$dirty);
        const $touched = allFieldutils.some($fieldutil => $fieldutil.$touched);
        const $focused = allFieldutils.some($fieldutil => $fieldutil.$focused);
        const $errors = errFieldutils
            .map($fieldutil => {
                const { $invalid, $touched, $dirty, $getFirstError } = $fieldutil;
                const hasError = this.checkHasError(errorLevel, $invalid, $dirty, $touched);

                return hasError && $getFirstError();
            })
            .filter(Boolean);

        return this.getValidationProps(errorLevel, $invalid, $dirty, $touched, $focused, $errors);
    };

    getValidationProps = (errorLevel, $invalid, $dirty, $touched, $focused, $errors) => {
        const hasError = this.checkHasError(errorLevel, $invalid, $dirty, $touched);

        const validationProps: Record<string, boolean> = {};

        if (hasError) {
            validationProps.error = true;
        }

        return {
            validationProps,
            error: hasError
                ? Array.isArray($errors)
                    ? $errors.map((err, index) => (
                          <Fragment key={index}>
                              {index > 0 && <br />}
                              {err}
                          </Fragment>
                      ))
                    : $errors
                : null
        };
    };

    componentDidMount() {
        this.registerAncestorField?.(this.props.name, this.$fieldutil);
    }

    componentWillUnmount() {
        this.registerAncestorField?.(this.props.name, null);
    }

    render() {
        const props: any = this.props;
        let { children, label, helperText, noStyle, errorLevel = errorLevelGlobal, ...fieldProps } = props;
        let component = getChildComponent(children);

        if (!props.name) {
            const { error, validationProps } = (this.latestValidationProps =
                this.fetchCurrentValidationProps(errorLevel));

            /**
             * 检查下最新的校验状态和当前是否一致，不一致的话需要强制刷新下
             */
            Promise.resolve().then(() => {
                if (!isEqual(this.latestValidationProps, this.fetchCurrentValidationProps(errorLevel))) {
                    this.forceUpdate();
                }
            });

            const fieldInstance = typeof children === 'function' ? children() : children;
            const helperNode = error || helperText;

            return (
                <Provider value={this.registerField}>
                    <Box {...fieldProps}>
                        {label && <FormLabel {...validationProps}>{label}</FormLabel>}
                        {fieldInstance}
                        {helperNode && <FormHelperText {...validationProps}>{helperNode}</FormHelperText>}
                    </Box>
                </Provider>
            );
        }

        // If $memo is true, pass the children to Field for SCU diffing.
        if (fieldProps.$memo === true) {
            fieldProps.__DIFF__ = {
                children,
                compositionValue: this.compositionValue
            };
        } else if (Array.isArray(fieldProps.$memo)) {
            fieldProps.$memo = fieldProps.$memo.concat(this.compositionValue);
        }

        switch (component) {
            case Switch:
            case Checkbox:
            case Radio:
                fieldProps.__TYPE__ = 'checked';
                break;

            case Select:
            case Autocomplete:
                if (children.props.multiple) {
                    fieldProps.__TYPE__ = 'array';
                } else if (!('$defaultValue' in fieldProps) && component === Autocomplete) {
                    fieldProps.$defaultValue = null;
                }

                break;

            case CheckboxGroup:
                fieldProps.__TYPE__ = 'array';
                break;

            case Slider:
            case Rating:
                if (!('$defaultValue' in fieldProps)) {
                    fieldProps.$defaultValue = null;
                }

                break;

            case 'checked':
            case 'array':
            case 'object':
            case 'number':
            case 'empty':
                // @ts-ignore
                fieldProps.__TYPE__ = component;
                break;

            default:
                break;
        }

        return (
            <EasyField
                {...fieldProps}
                passUtil="$fieldutil"
                render={$handleProps => {
                    const {
                        valuePropName = 'value',
                        changePropName = 'onChange',
                        focusPropName = 'onFocus',
                        blurPropName = 'onBlur'
                    } = props;
                    const {
                        // @ts-ignore
                        $fieldutil,

                        // @ts-ignore
                        [changePropName]: onChange,
                        // @ts-ignore
                        [focusPropName]: onFocus,
                        // @ts-ignore
                        [blurPropName]: onBlur,
                        // @ts-ignore
                        [valuePropName]: value,

                        ...restProps
                    } = $handleProps;
                    const { $invalid, $dirty, $touched, $focused, $getFirstError } = $fieldutil;

                    let childProps: any;

                    switch (fieldProps.__TYPE__) {
                        case 'checked':
                        case 'checkbox':
                        case 'radio':
                            const { checked = true, unchecked = false } = props;

                            childProps = {
                                checked: value === checked,
                                onChange: ev => {
                                    const newValue = ev && ev.target ? ev.target.checked : ev;

                                    onChange(newValue ? checked : unchecked, ev);
                                }
                            };

                            break;

                        default:
                            const fixedOnChange = specialValueComponents.includes(component)
                                ? (ev, value) => {
                                      onChange(value);
                                  }
                                : onChange;
                            const compositionProps = {
                                onCompositionEnd: ev => {
                                    this.isComposing = false;
                                    delete this.compositionValue;
                                    onChange(ev);
                                },
                                onCompositionStart: () => (this.isComposing = true)
                            };

                            childProps = {
                                ...(specialValueComponents.includes(component) ? {} : compositionProps),
                                [changePropName]: (ev, ...rest) => {
                                    if (this.isComposing) {
                                        this.compositionValue = ev.target[valuePropName];
                                        this.forceUpdate();
                                    } else {
                                        fixedOnChange(ev, ...rest);
                                    }
                                },
                                [valuePropName]: this.compositionValue ?? value,
                                [blurPropName]: (...args) => {
                                    if (this.isComposing) {
                                        this.isComposing = false;
                                        delete this.compositionValue;
                                        onChange(...args);
                                    }

                                    return onBlur(...args);
                                }
                            };

                            break;
                    }

                    const { validationProps, error } = this.getValidationProps(
                        errorLevel,
                        $invalid,
                        $dirty,
                        $touched,
                        $focused,
                        $getFirstError()
                    );

                    Object.assign(
                        {
                            [focusPropName]: onFocus,
                            [blurPropName]: onBlur
                        },
                        childProps
                    );

                    // fix label
                    if (syncLabelComponents.includes(component) && label) {
                        childProps.label = label;
                    }

                    const fieldInstance =
                        typeof children === 'function' ? children(childProps) : cloneElement(children, childProps);

                    return (
                        <Consumer>
                            {registerField => {
                                if (noStyle) {
                                    this.$fieldutil = $fieldutil;
                                    this.registerAncestorField = registerField;
                                }

                                switch (component) {
                                    case TextField:
                                        return cloneElement(fieldInstance, {
                                            ...restProps,
                                            ...validationProps,
                                            helperText: noStyle
                                                ? children.props.helperText
                                                : (error || helperText) ?? children.props.helperText,
                                            label: label ?? children.props.label
                                        });

                                    case Autocomplete:
                                        const { renderInput } = children.props;

                                        return cloneElement(fieldInstance, {
                                            renderInput(params) {
                                                const input = renderInput(params);

                                                return cloneElement(input, {
                                                    ...restProps,
                                                    ...validationProps,
                                                    helperText: noStyle
                                                        ? children.props.helperText
                                                        : (error || helperText) ?? children.props.helperText,
                                                    label: label ?? input.props.label
                                                });
                                            }
                                        });

                                    default:
                                        const helperNode = error || helperText;

                                        return (
                                            <FormControl {...restProps} {...validationProps}>
                                                {label &&
                                                    createElement(
                                                        inputLikeConponents.includes(component)
                                                            ? InputLabel
                                                            : FormLabel,
                                                        {
                                                            children: label
                                                        }
                                                    )}
                                                {fieldInstance}
                                                {helperNode && !noStyle && (
                                                    <FormHelperText>{helperNode}</FormHelperText>
                                                )}
                                            </FormControl>
                                        );
                                }
                            }}
                        </Consumer>
                    );
                }}
            />
        );
    }
}

export { _FormControl as FormControl };
