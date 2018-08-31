var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { EasyField } from 'react-formutil';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

var _TextField = 'textfield';
var _Switch = 'switch';
var _Checkbox = 'checkbox';
var _Radio = 'radio';

var FormItem = (_temp = _class = function (_Component) {
    _inherits(FormItem, _Component);

    function FormItem() {
        _classCallCheck(this, FormItem);

        return _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).apply(this, arguments));
    }

    _createClass(FormItem, [{
        key: 'render',
        value: function render() {
            var props = this.props;

            var children = props.children,
                component = props.component,
                label = props.label,
                helperText = props.helperText,
                controlProps = props.controlProps,
                fieldProps = _objectWithoutProperties(props, ['children', 'component', 'label', 'helperText', 'controlProps']);

            if (label && !isValidElement(label)) {
                label = React.createElement(
                    InputLabel,
                    null,
                    label
                );
            }

            if (helperText && !isValidElement(helperText)) {
                helperText = React.createElement(
                    FormHelperText,
                    null,
                    helperText
                );
            }

            var _component$toLowerCas = component.toLowerCase().split('.'),
                _component$toLowerCas2 = _slicedToArray(_component$toLowerCas, 2),
                childComponent = _component$toLowerCas2[1];

            var injectChildProps = true;

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

            return React.createElement(EasyField, Object.assign({}, fieldProps, {
                passUtil: '$fieldutil',
                render: function render(_ref) {
                    var _childProps, _Object$assign;

                    var $fieldutil = _ref.$fieldutil,
                        restProps = _objectWithoutProperties(_ref, ['$fieldutil']);

                    var $invalid = $fieldutil.$invalid,
                        $dirty = $fieldutil.$dirty,
                        $error = $fieldutil.$error;
                    var _props$valuePropName = props.valuePropName,
                        valuePropName = _props$valuePropName === undefined ? 'value' : _props$valuePropName,
                        _props$changePropName = props.changePropName,
                        changePropName = _props$changePropName === undefined ? 'onChange' : _props$changePropName,
                        _props$focusPropName = props.focusPropName,
                        focusPropName = _props$focusPropName === undefined ? 'onFocus' : _props$focusPropName,
                        _props$blurPropName = props.blurPropName,
                        blurPropName = _props$blurPropName === undefined ? 'onBlur' : _props$blurPropName;

                    var _onChange = restProps[changePropName];
                    var onFocus = restProps[focusPropName];
                    var onBlur = restProps[blurPropName];
                    var value = restProps[valuePropName];

                    var childProps = void 0;
                    switch (component) {
                        case _Switch:
                        case _Checkbox:
                        case _Radio:
                            var _props$checked = props.checked,
                                checked = _props$checked === undefined ? true : _props$checked,
                                _props$unchecked = props.unchecked,
                                unchecked = _props$unchecked === undefined ? false : _props$unchecked;

                            childProps = {
                                checked: value === checked,
                                onChange: function onChange(ev) {
                                    var newValue = ev && ev.target ? ev.target.checked : ev;
                                    _onChange(newValue ? checked : unchecked, ev);
                                }
                            };

                            if (!injectChildProps) {
                                children = cloneElement(children, {
                                    control: cloneElement(children.props.control, childProps)
                                });
                            }

                            break;

                        default:
                            childProps = (_childProps = {}, _defineProperty(_childProps, changePropName, _onChange), _defineProperty(_childProps, valuePropName, value), _childProps);
                            break;
                    }

                    Object.assign(childProps, (_Object$assign = {}, _defineProperty(_Object$assign, focusPropName, onFocus), _defineProperty(_Object$assign, blurPropName, onBlur), _Object$assign));

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

                        return cloneElement(children, Object.assign({}, childProps, controlProps));
                    }

                    return React.createElement(
                        FormControl,
                        Object.assign({}, controlProps, { error: $invalid && $dirty }),
                        label,
                        injectChildProps ? cloneElement(children, childProps) : children,
                        $invalid && $dirty ? React.createElement(
                            FormHelperText,
                            null,
                            Object.values($error)[0]
                        ) : helperText
                    );
                }
            }));
        }
    }]);

    return FormItem;
}(Component), _class.propTypes = {
    children: PropTypes.element.isRequired,
    component: PropTypes.string.isRequired,
    label: PropTypes.any,
    helperText: PropTypes.any,
    controlProps: PropTypes.object //传递给FormControl组件的属性
    //$parser $formatter checked unchecked $validators validMessage等传递给 EasyField 组件的额外参数
}, _class.defaultProps = {
    component: 'common'
}, _temp);


export default FormItem;