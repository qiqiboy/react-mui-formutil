// Type definitions for react-material-formutil@>0.0.3
// Project: react-material-formutil
// Definitions by: qiqiboy <https://github.com/qiqiboy>

import { FormControlProps } from '@material-ui/core/FormControl';
import React from 'react';
import { EasyFieldComponentProps } from 'react-formutil';

export * from 'react-formutil';

export type ErrorLevel = 0 | 1 | 2;

export interface FormControlComponentProps<T = any, P = {}, Fields = {}, WeakFields = Fields>
    extends EasyFieldComponentProps<T, P, Fields, WeakFields> {
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    controlProps?: FormControlProps;
    errorLevel?: ErrorLevel;
    children: React.ReactElement<any>;

    [otherName: string]: any;
}

export class FormControl<T = any, P = {}, Fields = {}, WeakFields = Fields> extends React.Component<
    FormControlComponentProps<T, P, Fields, WeakFields>
> {}

export function setErrorLevel(errorLevel: ErrorLevel): void;
