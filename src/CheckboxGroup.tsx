import { FormGroup, FormGroupProps } from '@mui/material';
import PropTypes from 'prop-types';
import React, { cloneElement, Children } from 'react';

export interface CheckboxGroupProps extends Omit<FormGroupProps, 'onChange'> {
    name?: string;
    value?: any[];
    onChange?(value: any[]): void;
    onFocus?(): void;
    onBlur?(): void;
    children: React.ReactElement | React.ReactElement[];
}

class CheckboxGroup extends React.Component<CheckboxGroupProps> {
    static formutilType = 'array';
    static propTypes = {
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        value: PropTypes.array
    };

    render() {
        const { children, name, onChange, value, onFocus, onBlur, ...formGroupProps } = this.props;
        const childOnChange = ev => {
            const { checked, value: childValue } = ev.target;
            const newValue = value || [];

            onChange?.(checked ? newValue.concat(childValue) : newValue.filter(v => v !== childValue));
        };

        return (
            <FormGroup {...formGroupProps}>
                {Children.map(children, (child: React.ReactElement) => {
                    const childValue = child.props.value;

                    return cloneElement(child, {
                        checked: !!value && value.indexOf(childValue) > -1,
                        onChange: childOnChange,
                        onFocus,
                        onBlur,
                        name
                    });
                })}
            </FormGroup>
        );
    }
}

export default CheckboxGroup;
