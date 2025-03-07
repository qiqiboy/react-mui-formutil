import { EasyField } from 'react-formutil';
export * from 'react-formutil';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _toPropertyKey from '@babel/runtime/helpers/esm/toPropertyKey';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import { FormGroup, Box, FormLabel, FormHelperText, Rating, Slider, Autocomplete, Select, Radio, Checkbox, Switch, FormControl, InputLabel, TextField, FormControlLabel, Input, OutlinedInput, FilledInput, ToggleButtonGroup } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Children, cloneElement, Fragment, createElement, Component, createContext } from 'react';
import isEqual from 'react-fast-compare';

var _excluded$1 = ["children", "name", "onChange", "value", "onFocus", "onBlur"];
var CheckboxGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(CheckboxGroup, _React$Component);

  var _super = _createSuper(CheckboxGroup);

  function CheckboxGroup() {
    _classCallCheck(this, CheckboxGroup);

    return _super.apply(this, arguments);
  }

  _createClass(CheckboxGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          name = _this$props.name,
          onChange = _this$props.onChange,
          value = _this$props.value,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          formGroupProps = _objectWithoutProperties(_this$props, _excluded$1);

      var childOnChange = function childOnChange(ev) {
        var _ev$target = ev.target,
            checked = _ev$target.checked,
            childValue = _ev$target.value;
        var newValue = value || [];
        onChange === null || onChange === void 0 ? void 0 : onChange(checked ? newValue.concat(childValue) : newValue.filter(function (v) {
          return v !== childValue;
        }));
      };

      return /*#__PURE__*/React.createElement(FormGroup, formGroupProps, Children.map(children, function (child) {
        var childValue = child.props.value;
        return /*#__PURE__*/cloneElement(child, {
          checked: !!value && value.indexOf(childValue) > -1,
          onChange: childOnChange,
          onFocus: onFocus,
          onBlur: onBlur,
          name: name
        });
      }));
    }
  }]);

  return CheckboxGroup;
}(React.Component);
CheckboxGroup.formutilType = 'array';
CheckboxGroup.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.array
};

var _excluded = ["children", "label", "helperText", "noStyle", "errorLevel"];

var _createContext = /*#__PURE__*/createContext(null),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;
/**
 * 0 dirty & invalid & touched
 * 1 dirty & invalid
 * 2 invalid
 */


var errorLevelGlobal = 1;
var setErrorLevel = function setErrorLevel(level) {
  errorLevelGlobal = level;
};

function getChildComponent(children) {
  var component = children === null || children === void 0 ? void 0 : children.type;

  if (component === FormControlLabel) {
    component = getChildComponent(children.props.control);
  }

  return component;
}

var inputLikeConponents = [TextField, Input, OutlinedInput, FilledInput, Autocomplete, Select];
var syncLabelComponents = [Select, OutlinedInput];
var specialValueComponents = [Rating, Autocomplete, ToggleButtonGroup, Slider];

var _FormControl = /*#__PURE__*/function (_Component) {
  _inherits(_FormControl, _Component);

  var _super = _createSuper(_FormControl);

  function _FormControl() {
    var _this;

    _classCallCheck(this, _FormControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.$fieldutil = void 0;
    _this.registerAncestorField = void 0;
    _this.compositionValue = void 0;
    _this.isComposing = void 0;
    _this.fields = {};

    _this.registerField = function (name, $fieldutil) {
      return $fieldutil ? _this.fields[name] = $fieldutil : delete _this.fields[name];
    };

    _this.latestValidationProps = null;

    _this.checkHasError = function (errorLevel, $invalid, $dirty, $touched) {
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

    _this.fetchCurrentValidationProps = function (errorLevel) {
      var allFieldutils = Object.keys(_this.fields).map(function (name) {
        return _this.fields[name].$new();
      });
      var errFieldutils = allFieldutils.filter(function ($fieldutil) {
        return $fieldutil.$invalid;
      });
      var $invalid = errFieldutils.length > 0;
      var $dirty = allFieldutils.some(function ($fieldutil) {
        return $fieldutil.$dirty;
      });
      var $touched = allFieldutils.some(function ($fieldutil) {
        return $fieldutil.$touched;
      });
      var $focused = allFieldutils.some(function ($fieldutil) {
        return $fieldutil.$focused;
      });
      var $errors = errFieldutils.map(function ($fieldutil) {
        var $invalid = $fieldutil.$invalid,
            $touched = $fieldutil.$touched,
            $dirty = $fieldutil.$dirty,
            $getFirstError = $fieldutil.$getFirstError;

        var hasError = _this.checkHasError(errorLevel, $invalid, $dirty, $touched);

        return hasError && $getFirstError();
      }).filter(Boolean);
      return _this.getValidationProps(errorLevel, $invalid, $dirty, $touched, $focused, $errors);
    };

    _this.getValidationProps = function (errorLevel, $invalid, $dirty, $touched, $focused, $errors) {
      var hasError = _this.checkHasError(errorLevel, $invalid, $dirty, $touched);

      var validationProps = {};

      if (hasError) {
        validationProps.error = true;
      }

      return {
        validationProps: validationProps,
        error: hasError ? Array.isArray($errors) ? $errors.map(function (err, index) {
          return /*#__PURE__*/React.createElement(Fragment, {
            key: index
          }, index > 0 && /*#__PURE__*/React.createElement("br", null), err);
        }) : $errors : null
      };
    };

    return _this;
  }

  _createClass(_FormControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$registerAncesto;

      (_this$registerAncesto = this.registerAncestorField) === null || _this$registerAncesto === void 0 ? void 0 : _this$registerAncesto.call(this, this.props.name, this.$fieldutil);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$registerAncesto2;

      (_this$registerAncesto2 = this.registerAncestorField) === null || _this$registerAncesto2 === void 0 ? void 0 : _this$registerAncesto2.call(this, this.props.name, null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;

      var children = props.children,
          label = props.label,
          helperText = props.helperText,
          noStyle = props.noStyle,
          _props$errorLevel = props.errorLevel,
          errorLevel = _props$errorLevel === void 0 ? errorLevelGlobal : _props$errorLevel,
          fieldProps = _objectWithoutProperties(props, _excluded);

      var component = getChildComponent(children);

      if (!props.name) {
        var _this$latestValidatio = this.latestValidationProps = this.fetchCurrentValidationProps(errorLevel),
            error = _this$latestValidatio.error,
            validationProps = _this$latestValidatio.validationProps;
        /**
         * 检查下最新的校验状态和当前是否一致，不一致的话需要强制刷新下
         */


        Promise.resolve().then(function () {
          if (!isEqual(_this2.latestValidationProps, _this2.fetchCurrentValidationProps(errorLevel))) {
            _this2.forceUpdate();
          }
        });
        var fieldInstance = typeof children === 'function' ? children() : children;
        var helperNode = error || helperText;
        return /*#__PURE__*/React.createElement(Provider, {
          value: this.registerField
        }, /*#__PURE__*/React.createElement(Box, fieldProps, label && /*#__PURE__*/React.createElement(FormLabel, validationProps, label), fieldInstance, helperNode && /*#__PURE__*/React.createElement(FormHelperText, validationProps, helperNode)));
      } // If $memo is true, pass the children to Field for SCU diffing.


      if (fieldProps.$memo === true) {
        fieldProps.__DIFF__ = {
          children: children,
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
      }

      return /*#__PURE__*/React.createElement(EasyField, Object.assign({}, fieldProps, {
        passUtil: "$fieldutil",
        render: function render($handleProps) {
          var _this2$compositionVal, _objectSpread2, _Object$assign;

          var _props$valuePropName = props.valuePropName,
              valuePropName = _props$valuePropName === void 0 ? 'value' : _props$valuePropName,
              _props$changePropName = props.changePropName,
              changePropName = _props$changePropName === void 0 ? 'onChange' : _props$changePropName,
              _props$focusPropName = props.focusPropName,
              focusPropName = _props$focusPropName === void 0 ? 'onFocus' : _props$focusPropName,
              _props$blurPropName = props.blurPropName,
              blurPropName = _props$blurPropName === void 0 ? 'onBlur' : _props$blurPropName;

          var $fieldutil = $handleProps.$fieldutil,
              _onChange = $handleProps[changePropName],
              onFocus = $handleProps[focusPropName],
              onBlur = $handleProps[blurPropName],
              value = $handleProps[valuePropName],
              restProps = _objectWithoutProperties($handleProps, ["$fieldutil", changePropName, focusPropName, blurPropName, valuePropName].map(_toPropertyKey));

          var $invalid = $fieldutil.$invalid,
              $dirty = $fieldutil.$dirty,
              $touched = $fieldutil.$touched,
              $focused = $fieldutil.$focused,
              $getFirstError = $fieldutil.$getFirstError;
          var childProps;

          switch (fieldProps.__TYPE__) {
            case 'checked':
            case 'checkbox':
            case 'radio':
              var _props$checked = props.checked,
                  checked = _props$checked === void 0 ? true : _props$checked,
                  _props$unchecked = props.unchecked,
                  unchecked = _props$unchecked === void 0 ? false : _props$unchecked;
              childProps = {
                checked: value === checked,
                onChange: function onChange(ev) {
                  var newValue = ev && ev.target ? ev.target.checked : ev;

                  _onChange(newValue ? checked : unchecked, ev);
                }
              };
              break;

            default:
              var fixedOnChange = specialValueComponents.includes(component) ? function (ev, value) {
                _onChange(value);
              } : _onChange;
              var compositionProps = {
                onCompositionEnd: function onCompositionEnd(ev) {
                  _this2.isComposing = false;
                  delete _this2.compositionValue;

                  _onChange(ev);
                },
                onCompositionStart: function onCompositionStart() {
                  return _this2.isComposing = true;
                }
              };
              childProps = _objectSpread(_objectSpread({}, specialValueComponents.includes(component) ? {} : compositionProps), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, changePropName, function (ev) {
                if (_this2.isComposing) {
                  _this2.compositionValue = ev.target[valuePropName];

                  _this2.forceUpdate();
                } else {
                  for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    rest[_key2 - 1] = arguments[_key2];
                  }

                  fixedOnChange.apply(void 0, [ev].concat(rest));
                }
              }), _defineProperty(_objectSpread2, valuePropName, (_this2$compositionVal = _this2.compositionValue) !== null && _this2$compositionVal !== void 0 ? _this2$compositionVal : value), _defineProperty(_objectSpread2, blurPropName, function () {
                if (_this2.isComposing) {
                  _this2.isComposing = false;
                  delete _this2.compositionValue;

                  _onChange.apply(void 0, arguments);
                }

                return onBlur.apply(void 0, arguments);
              }), _objectSpread2));
              break;
          }

          var _this2$getValidationP = _this2.getValidationProps(errorLevel, $invalid, $dirty, $touched, $focused, $getFirstError()),
              validationProps = _this2$getValidationP.validationProps,
              error = _this2$getValidationP.error;

          childProps = Object.assign((_Object$assign = {}, _defineProperty(_Object$assign, focusPropName, onFocus), _defineProperty(_Object$assign, blurPropName, onBlur), _Object$assign), childProps); // fix label

          if (syncLabelComponents.includes(component) && label) {
            childProps.label = label;
          }

          var fieldInstance = typeof children === 'function' ? children(childProps) : /*#__PURE__*/cloneElement(children, childProps);
          return /*#__PURE__*/React.createElement(Consumer, null, function (registerField) {
            var _ref;

            if (noStyle) {
              _this2.$fieldutil = $fieldutil;
              _this2.registerAncestorField = registerField;
            }

            switch (component) {
              case TextField:
                return /*#__PURE__*/cloneElement(fieldInstance, _objectSpread(_objectSpread(_objectSpread({}, restProps), validationProps), {}, {
                  helperText: noStyle ? children.props.helperText : (_ref = error || helperText) !== null && _ref !== void 0 ? _ref : children.props.helperText,
                  label: label !== null && label !== void 0 ? label : children.props.label
                }));

              case Autocomplete:
                var _renderInput = children.props.renderInput;
                return /*#__PURE__*/cloneElement(fieldInstance, {
                  renderInput: function renderInput(params) {
                    var _ref2;

                    var input = _renderInput(params);

                    return /*#__PURE__*/cloneElement(input, _objectSpread(_objectSpread(_objectSpread({}, restProps), validationProps), {}, {
                      helperText: noStyle ? children.props.helperText : (_ref2 = error || helperText) !== null && _ref2 !== void 0 ? _ref2 : children.props.helperText,
                      label: label !== null && label !== void 0 ? label : input.props.label
                    }));
                  }
                });

              default:
                var _helperNode = error || helperText;

                return /*#__PURE__*/React.createElement(FormControl, Object.assign({}, restProps, validationProps), label && /*#__PURE__*/createElement(inputLikeConponents.includes(component) ? InputLabel : FormLabel, {
                  children: label
                }), fieldInstance, _helperNode && !noStyle && /*#__PURE__*/React.createElement(FormHelperText, null, _helperNode));
            }
          });
        }
      }));
    }
  }]);

  return _FormControl;
}(Component);

_FormControl.propTypes = {
  children: function children(props) {
    var _PropTypes$node;

    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    if ('name' in props) {
      var _PropTypes$oneOfType;

      // @ts-ignore
      return (_PropTypes$oneOfType = PropTypes.oneOfType([PropTypes.element, PropTypes.func])).isRequired.apply(_PropTypes$oneOfType, [props].concat(args));
    } // @ts-ignore


    return (_PropTypes$node = PropTypes.node).isRequired.apply(_PropTypes$node, [props].concat(args));
  },
  label: PropTypes.any,
  helperText: PropTypes.any,
  controlProps: PropTypes.object,
  //传递给FormControl组件的属性
  errorLevel: PropTypes.oneOf([0, 1, 2, 'off']),
  noStyle: PropTypes.bool
};

export { CheckboxGroup, _FormControl as FormControl, setErrorLevel };
