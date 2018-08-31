import React, { Component, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { EasyField } from 'react-formutil';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const _TextField = 'textfield';
const _Switch = 'switch';
const _Checkbox = 'checkbox';
const _Radio = 'radio';

class FormItem extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        component: PropTypes.string.isRequired,
        label: PropTypes.any,
        helperText: PropTypes.any,
        controlProps: PropTypes.object //传递给FormControl组件的属性
        //$parser $formatter checked unchecked $validators validMessage等传递给 EasyField 组件的额外参数
    };

    static defaultProps = {
        component: 'common'
    };

    render() {
        const props = this.props;
        let { children, component, label, helperText, controlProps, ...fieldProps } = props;

        if (label && !isValidElement(label)) {
            label = <InputLabel>{label}</InputLabel>;
        }

        if (helperText && !isValidElement(helperText)) {
            helperText = <FormHelperText>{helperText}</FormHelperText>;
        }

        let [, childComponent] = component.toLowerCase().split('.');
        let injectChildProps = true;

        if (childComponent) {
            component = childComponent;
            injectChildProps = false;
        }

        switch (component) {
            case _Switch:
            case _Checkbox:
            case _Radio:
                fieldProps.__TYPE__ = 'checked';
                break;

            default:
                break;
        }

        return (
            <EasyField
                {...fieldProps}
                passUtil="$fieldutil"
                render={({ $fieldutil, ...restProps }) => {
                    const { $invalid, $dirty, $error } = $fieldutil;
                    const {
                        valuePropName = 'value',
                        changePropName = 'onChange',
                        focusPropName = 'onFocus',
                        blurPropName = 'onBlur'
                    } = props;
                    const onChange = restProps[changePropName];
                    const onFocus = restProps[focusPropName];
                    const onBlur = restProps[blurPropName];
                    const value = restProps[valuePropName];

                    let childProps;
                    switch (component) {
                        case _Switch:
                        case _Checkbox:
                        case _Radio:
                            const { checked = true, unchecked = false } = props;
                            childProps = {
                                checked: value === checked,
                                onChange: ev => {
                                    const newValue = ev && ev.target ? ev.target.checked : ev;
                                    onChange(newValue ? checked : unchecked, ev);
                                }
                            };

                            if (!injectChildProps) {
                                children = cloneElement(children, {
                                    control: cloneElement(children.props.control, childProps)
                                });
                            }

                            break;

                        default:
                            childProps = {
                                [changePropName]: onChange,
                                [valuePropName]: value
                            };
                            break;
                    }

                    Object.assign(childProps, {
                        [focusPropName]: onFocus,
                        [blurPropName]: onBlur
                    });

                    if (component === _TextField) {
                        if (label) {
                            childProps.label = props.label;
                        }

                        if (helperText) {
                            childProps.helperText = props.helperText;
                        }

                        if ($invalid && $dirty) {
                            childProps.error = true;
                            childProps.helperText = Object.values($error)[0];
                        }

                        return cloneElement(children, {
                            ...childProps,
                            ...controlProps
                        });
                    }

                    return (
                        <FormControl {...controlProps} error={$invalid && $dirty}>
                            {label}
                            {injectChildProps ? cloneElement(children, childProps) : children}
                            {$invalid && $dirty ? (
                                <FormHelperText>{Object.values($error)[0]}</FormHelperText>
                            ) : (
                                helperText
                            )}
                        </FormControl>
                    );
                }}
            />
        );
    }
}

export default FormItem;