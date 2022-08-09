"use strict";Object.defineProperty(exports,"__esModule",{value:true});var e=require("react-formutil");var r=require("@babel/runtime/helpers/objectSpread2");var t=require("@babel/runtime/helpers/defineProperty");var a=require("@babel/runtime/helpers/toPropertyKey");var n=require("@babel/runtime/helpers/objectWithoutProperties");var l=require("@babel/runtime/helpers/classCallCheck");var o=require("@babel/runtime/helpers/createClass");var i=require("@babel/runtime/helpers/inherits");var u=require("@babel/runtime/helpers/createSuper");var c=require("@mui/material");var s=require("react");var d=require("react-fast-compare");function f(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var p=f(r);var v=f(t);var m=f(a);var h=f(n);var b=f(l);var y=f(o);var g=f(i);var E=f(u);var k=f(s);var P=f(d);var C=["children","name","onChange","value","onFocus","onBlur"];var $=function(e){g["default"](t,e);var r=E["default"](t);function t(){b["default"](this,t);return r.apply(this,arguments)}y["default"](t,[{key:"render",value:function e(){var r=this.props,t=r.children,a=r.name,n=r.onChange,l=r.value,o=r.onFocus,i=r.onBlur,u=h["default"](r,C);var d=function e(r){var t=r.target,a=t.checked,o=t.value;var i=l||[];n===null||n===void 0?void 0:n(a?i.concat(o):i.filter((function(e){return e!==o})))};return k["default"].createElement(c.FormGroup,u,s.Children.map(t,(function(e){var r=e.props.value;return s.cloneElement(e,{checked:!!l&&l.indexOf(r)>-1,onChange:d,onFocus:o,onBlur:i,name:a})})))}}]);return t}(k["default"].Component);$.formutilType="array";var F=$;var _=["children","label","helperText","noStyle","errorLevel"];var x=s.createContext(null),V=x.Consumer,T=x.Provider;var A=1;var q=function e(r){A=r};function j(e){var r=e===null||e===void 0?void 0:e.type;if(r===c.FormControlLabel){r=j(e.props.control)}return r}var O=[c.TextField,c.Input,c.OutlinedInput,c.FilledInput,c.Autocomplete,c.Select];var S=[c.Select,c.OutlinedInput];var w=[c.Rating,c.Autocomplete,c.ToggleButtonGroup,c.Slider];var I=function(r){g["default"](a,r);var t=E["default"](a);function a(){var e;b["default"](this,a);for(var r=arguments.length,n=new Array(r),l=0;l<r;l++){n[l]=arguments[l]}e=t.call.apply(t,[this].concat(n));e.$fieldutil=void 0;e.registerAncestorField=void 0;e.compositionValue=void 0;e.isComposing=void 0;e.fields={};e.registerField=function(r,t){return t?e.fields[r]=t:delete e.fields[r]};e.latestValidationProps=null;e.checkHasError=function(e,r,t,a){switch(e){case 0:return r&&t&&a;case 1:return r&&t;case 2:return r;default:return false}};e.fetchCurrentValidationProps=function(r){var t=Object.keys(e.fields).map((function(r){return e.fields[r].$new()}));var a=t.filter((function(e){return e.$invalid}));var n=a.length>0;var l=t.some((function(e){return e.$dirty}));var o=t.some((function(e){return e.$touched}));var i=t.some((function(e){return e.$focused}));var u=a.map((function(t){var a=t.$invalid,n=t.$touched,l=t.$dirty,o=t.$getFirstError;var i=e.checkHasError(r,a,l,n);return i&&o()})).filter(Boolean);return e.getValidationProps(r,n,l,o,i,u)};e.getValidationProps=function(r,t,a,n,l,o){var i=e.checkHasError(r,t,a,n);var u={};if(i){u.error=true}return{validationProps:u,error:i?Array.isArray(o)?o.map((function(e,r){return k["default"].createElement(s.Fragment,{key:r},r>0&&k["default"].createElement("br",null),e)})):o:null}};return e}y["default"](a,[{key:"componentDidMount",value:function e(){var r;(r=this.registerAncestorField)===null||r===void 0?void 0:r.call(this,this.props.name,this.$fieldutil)}},{key:"componentWillUnmount",value:function e(){var r;(r=this.registerAncestorField)===null||r===void 0?void 0:r.call(this,this.props.name,null)}},{key:"render",value:function r(){var t=this;var a=this.props;var n=a.children,l=a.label,o=a.helperText,i=a.noStyle,u=a.errorLevel,d=u===void 0?A:u,f=h["default"](a,_);var b=j(n);if(!a.name){var y=this.latestValidationProps=this.fetchCurrentValidationProps(d),g=y.error,E=y.validationProps;Promise.resolve().then((function(){if(!P["default"](t.latestValidationProps,t.fetchCurrentValidationProps(d))){t.forceUpdate()}}));var C=typeof n==="function"?n():n;var $=g||o;return k["default"].createElement(T,{value:this.registerField},k["default"].createElement(c.Box,f,l&&k["default"].createElement(c.FormLabel,E,l),C,$&&k["default"].createElement(c.FormHelperText,E,$)))}if(f.$memo===true){f.__DIFF__={children:n,compositionValue:this.compositionValue}}else if(Array.isArray(f.$memo)){f.$memo=f.$memo.concat(this.compositionValue)}switch(b){case c.Switch:case c.Checkbox:case c.Radio:f.__TYPE__="checked";break;case c.Select:case c.Autocomplete:if(n.props.multiple){f.__TYPE__="array"}else if(!("$defaultValue"in f)&&b===c.Autocomplete){f.$defaultValue=null}break;case F:f.__TYPE__="array";break;case c.Slider:case c.Rating:if(!("$defaultValue"in f)){f.$defaultValue=null}break;case"checked":case"array":case"object":case"number":case"empty":f.__TYPE__=b;break}return k["default"].createElement(e.EasyField,Object.assign({},f,{passUtil:"$fieldutil",render:function e(r){var u,y,g;var E=a.valuePropName,P=E===void 0?"value":E,C=a.changePropName,$=C===void 0?"onChange":C,F=a.focusPropName,_=F===void 0?"onFocus":F,x=a.blurPropName,T=x===void 0?"onBlur":x;var A=r.$fieldutil,q=r[$],j=r[_],I=r[T],B=r[P],L=h["default"](r,["$fieldutil",$,_,T,P].map(m["default"]));var H=A.$invalid,Y=A.$dirty,N=A.$touched,U=A.$focused,R=A.$getFirstError;var D;switch(f.__TYPE__){case"checked":case"checkbox":case"radio":var G=a.checked,M=G===void 0?true:G,W=a.unchecked,K=W===void 0?false:W;D={checked:B===M,onChange:function e(r){var t=r&&r.target?r.target.checked:r;q(t?M:K,r)}};break;default:var z=w.includes(b)?function(e,r){q(r)}:q;D=(y={onCompositionEnd:function e(r){t.isComposing=false;delete t.compositionValue;q(r)},onCompositionStart:function e(){return t.isComposing=true}},v["default"](y,$,(function(e){if(t.isComposing){t.compositionValue=e.target[P];t.forceUpdate()}else{for(var r=arguments.length,a=new Array(r>1?r-1:0),n=1;n<r;n++){a[n-1]=arguments[n]}z.apply(void 0,[e].concat(a))}})),v["default"](y,P,(u=t.compositionValue)!==null&&u!==void 0?u:B),v["default"](y,T,(function(){if(t.isComposing){t.isComposing=false;delete t.compositionValue;q.apply(void 0,arguments)}return I.apply(void 0,arguments)})),y);break}var J=t.getValidationProps(d,H,Y,N,U,R()),Q=J.validationProps,X=J.error;Object.assign((g={},v["default"](g,_,j),v["default"](g,T,I),g),D);if(S.includes(b)&&l){D.label=l}var Z=typeof n==="function"?n(D):s.cloneElement(n,D);return k["default"].createElement(V,null,(function(e){var r;if(i){t.$fieldutil=A;t.registerAncestorField=e}switch(b){case c.TextField:return s.cloneElement(Z,p["default"](p["default"](p["default"]({},L),Q),{},{helperText:i?n.props.helperText:(r=X||o)!==null&&r!==void 0?r:n.props.helperText,label:l!==null&&l!==void 0?l:n.props.label}));case c.Autocomplete:var a=n.props.renderInput;return s.cloneElement(Z,{renderInput:function e(r){var t;var u=a(r);return s.cloneElement(u,p["default"](p["default"](p["default"]({},L),Q),{},{helperText:i?n.props.helperText:(t=X||o)!==null&&t!==void 0?t:n.props.helperText,label:l!==null&&l!==void 0?l:u.props.label}))}});default:var u=X||o;return k["default"].createElement(c.FormControl,Object.assign({},L,Q),l&&s.createElement(O.includes(b)?c.InputLabel:c.FormLabel,{children:l}),Z,u&&!i&&k["default"].createElement(c.FormHelperText,null,u))}}))}}))}}]);return a}(s.Component);var B=I;exports.FormControl=B;exports.setErrorLevel=q;Object.keys(e).forEach((function(r){if(r!=="default"&&!exports.hasOwnProperty(r))Object.defineProperty(exports,r,{enumerable:true,get:function(){return e[r]}})}));
