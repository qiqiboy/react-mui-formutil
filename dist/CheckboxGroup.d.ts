import { FormGroupProps } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
export interface CheckboxGroupProps extends Omit<FormGroupProps, 'onChange'> {
    name?: string;
    value?: any[];
    onChange?(value: any[]): void;
    onFocus?(): void;
    onBlur?(): void;
    children: React.ReactElement | React.ReactElement[];
}
declare class CheckboxGroup extends React.Component<CheckboxGroupProps> {
    static formutilType: string;
    static propTypes: {
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        value: PropTypes.Requireable<any[]>;
    };
    render(): JSX.Element;
}
export default CheckboxGroup;
