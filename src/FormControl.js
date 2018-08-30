import React, { Component, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { EasyField } from 'react-formutil';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

class FormItem extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        label: PropTypes.element,
        helper: PropTypes.element,
        controlProps: PropTypes.object //传递给FormControl组件的属性
        //$parser $formatter checked unchecked $validators validMessage等传递给 EasyField 组件的额外参数
    };

    render() {
        const props = this.props;
        const { children, label, helper, controlProps, ...fieldProps } = props;

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

                    let childProps = {
                        [changePropName]: onChange,
                        [valuePropName]: value
                    };

                    Object.assign(childProps, {
                        [focusPropName]: onFocus,
                        [blurPropName]: onBlur
                    });

                    return (
                        <FormControl {...controlProps} error={$invalid && $dirty}>
                            {label}
                            {cloneElement(children, childProps)}
                            {helper}
                            {$invalid && $dirty && <FormHelperText>{Object.values($error)[0]}</FormHelperText>}
                        </FormControl>
                    );
                }}
            />
        );
    }
}

export default FormItem;
