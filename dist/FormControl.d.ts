import { FormControlProps } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { $FieldHandler, BaseEasyFieldComponentProps, OtherKeys } from 'react-formutil';
declare type RegisterField = ((name: any, $fieldutil: any) => void) | null;
/**
 * 0 dirty & invalid & touched
 * 1 dirty & invalid
 * 2 invalid
 */
export declare type ErrorLevel = 0 | 1 | 2;
export declare const setErrorLevel: (level: ErrorLevel) => void;
export interface FormControlComponentProps<T = any, P = {}, Fields = {}, WeakFields = Fields> extends BaseEasyFieldComponentProps<T, P, Fields, WeakFields>, Omit<FormControlProps, 'defaultValue' | 'required'> {
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    errorLevel?: ErrorLevel;
    noStyle?: boolean;
    children: React.ReactElement<any> | (($fieldHandler: Partial<$FieldHandler<T>> & OtherKeys) => React.ReactNode);
}
declare class FormItem extends Component<FormControlComponentProps & OtherKeys> {
    static propTypes: {
        children(props: any, ...args: any[]): Error | null;
        label: PropTypes.Requireable<any>;
        helperText: PropTypes.Requireable<any>;
        controlProps: PropTypes.Requireable<object>;
        errorLevel: PropTypes.Requireable<number>;
        noStyle: PropTypes.Requireable<boolean>;
    };
    $fieldutil: any;
    registerAncestorField: RegisterField;
    compositionValue?: string;
    isComposing: boolean;
    fields: {};
    registerField: (name: any, $fieldutil: any) => any;
    latestValidationProps: any;
    checkHasError: (errorLevel: any, $invalid: any, $dirty: any, $touched: any) => any;
    fetchCurrentValidationProps: (errorLevel: any) => {
        validationProps: Record<string, boolean>;
        error: any;
    };
    getValidationProps: (errorLevel: any, $invalid: any, $dirty: any, $touched: any, $focused: any, $errors: any) => {
        validationProps: Record<string, boolean>;
        error: any;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default FormItem;
