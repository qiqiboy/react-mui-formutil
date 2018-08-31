# react-material-formutil

[![npm](https://img.shields.io/npm/v/react-material-formutil.svg?style=flat)](https://npm.im/react-material-formutil)

Happy to use react-formutil in the project based on `Material-UI` ^\_^

在 [Material-UI](https://github.com/mui-org/material-ui) 项目，结
合[react-formutil](https://github.com/qiqiboy/react-formutil) 来快速构建表单。

<!-- vim-markdown-toc GFM -->

- [安装 Installation](#安装-installation)
- [使用 Usage](#使用-usage)
    + [`<FormControl />`](#formcontrol-)
        * [`component`](#component)
        * [`name`](#name)
        * [`$defaultValue`](#defaultvalue)
        * [`$validators`](#validators)
        * [`controlProps`](#controlprops)
        * [`label`](#label)
        * [`helperText`](#helpertext)
        * [`$parser`](#parser)
        * [`$formatter`](#formatter)
        * [`checked` `unchecked`](#checked-unchecked)
        * [`validMessage`](#validmessage)
        * [`valuePropName` `changePropName` `focusPropName` `blurPropName`](#valuepropname-changepropname-focuspropname-blurpropname)
    + [`支持的组件`](#支持的组件)
        * [`TextField`](#textfield)
        * [`Select`](#select)
        * [`NativeSelect`](#nativeselect)
        * [`Input`](#input)
        * [`Checkbox`](#checkbox)
        * [`Radio`](#radio)
        * [`Switch`](#switch)
        * [`FormControlLabel`](#formcontrollabel)
        * [`DatePicker`](#datepicker)
        * [`TimePicker`](#timepicker)
        * [`DateTimePicker`](#datetimepicker)
- [FAQ](#faq)
    + [`给组件设置的 onChange、onFocus 等方法无效、不执行`](#给组件设置的-onchangeonfocus-等方法无效不执行)
    + [`为什么有些搭配某些组件时必须给 FormControl 传递 component 参数呢？`](#为什么有些搭配某些组件时必须给-formcontrol-传递-component-参数呢)

<!-- vim-markdown-toc -->

### 安装 Installation

```bash
# npm
npm install react-material-formutil --save

# yarn
yarn install react-material-formutil
```

### 使用 Usage

> `react-material-formutil` 整合了 `react-formutil` 的组件，所以可以直接从`react-material-formutil`中导出所需要的
> `react-formutil` 组件。不用单独从 `react-formutil` 中导出。

先看一个使用示例（点击查看在线完整示例 :
[react-material-formutil on codesandbox.io](https://codesandbox.io/s/n524m5040p)）：

```javascript
import React, { Component } from 'react';
import { withForm, FormControl } from 'react-material-formutil';
import { TextField } from '@material-ui/core'; // 导入mui的TextField组件

@withForm
class MyForm extends Component {
    submit = () => {
        const { $invalid, $getFirstError, $params } = this.props.$formutil;

        if ($invalid) {
            alert($getFistError());
        } else {
            // submit your data
        }
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <FormControl name="username" required>
                    <TextField label="Username" />
                </FormControl>
            </form>
        );
    }
}
```

`FormControl`是 `react-material-formuitl` 新增加的组件，`withForm`是`react-formutil`的组件（没错，你可以直接
从`react-antd-formutil`中导出`react-formutil`的组件啦）。

只需要将`material-ui`的交互组件，嵌套在`FormControl`下，即可实现自动的表单状态同步。

#### `<FormControl />`

要实现将`material-ui`的交互组件的值能同步到 `react-formutil` 的状态中，需要通过 `FormControl` 这个组件来实现中间态绑定。

`FormControl`类似`material-ui`中的同名组件，但是它基于`react-formutil`实现了表单状态的收集与同步，并对`Checkbox` `Radio`
`Switch` `Select` `Input`等做了兼容，并且也提供了类似`material-ui`中同名组件的同样的 UI 层面功能。

> `FormControl`下只允许放置一个表单组件，不允许多个。

##### `component`

`component`不是必须的，但是对于 `Checkbox` `Radio` `Switch` `TextField` 这四种组件，必须通过`component`传递其组件名，以告诉`FormControl`需要特殊处理。

```javascript
<FormControl name="name" component="TextField">
    <TextField />
</FormControl>

<FormControl name="agree" component="Switch">
    <Switch />
</FormControl>

<FormControl name="agree" component="Checkbox">
    <Checkbox />
</FormControl>
```

##### `name`

设置输入项的 name 值，表单项将会以 name 作为 key 收集到 formutil 的状态中。支持嵌套语法 _（同`react-formutil`的`Field`同
名参数，可以参考 [name](https://github.com/qiqiboy/react-formutil#name)）_

##### `$defaultValue`

设置该表单项的默认值 _（同`react-formutil`的`Field`同名参数，可以参
考[$defaultvalue](https://github.com/qiqiboy/react-formutil#defaultvalue)）_

##### `$validators`

设置校验方法 _（同`react-formutil`的`Field`同名参数 , 可以参考
[$validators](https://github.com/qiqiboy/react-formutil#validators)）_

> 同 react-formutil 的 EasyField，FormControl 也内置了同样的校验规则：

> -   `required` 必填 `required`
> -   `maxLength` 。最大输入长度，有效输入时才会校验 `maxLength="100"`
> -   `minLength` 最小输入长度，有效输入时才会校验 `minLength="10"`
> -   `max` 最大输入数值，仅支持 Number 比较。有效输入时才会校验 `max="100"`
> -   `min` 最小输入数值，仅支持 Number 比较。有效输入时才会校验 `min="10"`
> -   `pattern` 正则匹配。有效输入时才会校验 `pattern={/^\d+$/}`
> -   `enum` 枚举值检测。有效输入时才会校验 `enum={[1,2,3]}`
> -   `checker` 自定义校验函数。`checker={value => value > 10 && value < 100 || ' 输入比如大于 10 小与 100'}`

注：校验属性的值为 `null` 时表示不进行该校验

内置的校验规则无需再次声明，除非规则不符合预期，需要替换，则可以通过`$validators` 传递同名校验方法即可替换默认的。另外，
内置的校验规则，如果校验不通过，会尝试去 `validMessage` 匹配错误信息。

##### `controlProps`

该属性为要传递给`material-ui`中的`FormControl`组件的配置项。如果使用`TextField`，则会传递给`TextField`组件：

```javascript
<FormControl
    controlProps={{
        fullWidth: true
    }}>
    <Input />
</FormControl>
```

##### `label`

设置 label，如果传入字符串，会自动应用`InputLabel`：

```javascript
<FormControl name="name" label="Username">
    <Input />
</FormControl>

//or

<FormControl name="name" label={<InputLabel>Username</InputLabel>}>
    <Input />
</FormControl>
```

##### `helperText`

设置 helperText，如果传入字符串，会自动应用`FormHelperText`：

```javascript
<FormControl name="name" helperText="Please type your name">
    <Input />
</FormControl>

//or

<FormControl name="name" helperText={<FormHelperText>Please type your name</FormHelperText>}>
    <Input />
</FormControl>
```

##### `$parser`

设置输入的值收集到 formutil 状态中时的过滤处理。默认为`value => value`

```javascript
<FormControl $parser={value => parseInt(value)}>
    <Input />
</FormControl>
```

##### `$formatter`

设置 formutil 中的值渲染到输入组件上时的过滤处理。默认为`value => value`

```javascript
<FormControl $formatter={value => '$' + value}>
    <Input />
</FormControl>
```

##### `checked` `unchecked`

对于 `<Switch />` `<Checkbox />` `<Radio />` 这三种组件，其值默认是 checked 属性，为布尔值。可以通过`checked`
`unchecked`来设置 checked 状态时所要映射的值：

```javascript
<FormControl checked="yes" unchecked="no">
    <Switch />
</FormControl>
```

该示例中， 当 Switch 为开时，获取的值将为 yes。

##### `validMessage`

设置校验结果的错误信息。

```javascript
<FormControl
    name="username"
    required
    validMessage={{
        required: '请输入用户名'
    }}>
    <Input />
</FormControl>
```

##### `valuePropName` `changePropName` `focusPropName` `blurPropName`

该四个参数可以用来设置绑定到组件上的值或者值变动、是否聚焦等事件回调。该项一般不需要设置，`FormControl` 已经针对 `antd`
中的所有 `data-entry` 型组件做了兼容处理。

对于一些特殊场景，例如不需要同步 `focus`、`blur`，则可以通过将该值设为`{null}`来禁用：

```javascript
//禁用focus、blur状态同步
<FormControl focusPropName={null} blurPropName={null} name="username">
    <Input />
</FormControl>
```

#### `支持的组件`

##### [`TextField`](https://material-ui.com/api/text-field/)

**注意**：`component="TextField"` 必须不可少。

```javascript
<FormControl name="name" component="TextField">
    <TextField label="Name" margin="normal" />
</FormControl>
```

##### [`Select`](https://material-ui.com/api/select/)

```javascript
<FormControl name="age">
    <Select>
        <MenuItem value="">
            <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
    </Select>
</FormControl>
```

##### [`NativeSelect`](https://material-ui.com/api/native-select/)

```javascript
<FormControl name="age">
    <NativeSelect>
        <option value="" />
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
    </NativeSelect>
</FormControl>
```

##### [`Input`](https://material-ui.com/api/input/)

```javascript
<FormControl name="name">
    <Input />}
</FormControl>
```

##### [`Checkbox`](https://material-ui.com/api/checkbox/)

**注意**：`component="Checkbox"` 必须不可少。

```javascript
<FormControl name="agree" component="Checkbox">
    <Checkbox />}
</FormControl>
```

##### [`Radio`](https://material-ui.com/api/radio/)

**注意**：`component="Radio"` 必须不可少。

```javascript
<FormControl name="agree" component="Radio">
    <Radio />}
</FormControl>
```

##### [`Switch`](https://material-ui.com/api/switch/)

**注意**：`component="Switch"` 必须不可少。

```javascript
<FormControl name="agree" component="Switch">
    <Switch />}
</FormControl>
```

##### [`FormControlLabel`](https://material-ui.com/api/form-control-label/)

`FormControlLabel`必须配合`Checkbox` `Radio` `Switch`其一一起用：

```javascript
<FormControl name="agree">
    <FormControlLabel control={<Checkbox />} />
</FormControl>
```

##### [`DatePicker`](https://material-ui-pickers.firebaseapp.com/demo/datepicker)

日期、时间选择，依赖于外部库[`material-ui-pickers`](https://material-ui-pickers.firebaseapp.com/installation)

##### [`TimePicker`](https://material-ui-pickers.firebaseapp.com/demo/timepicker)

日期、时间选择，依赖于外部库[`material-ui-pickers`](https://material-ui-pickers.firebaseapp.com/installation)

##### [`DateTimePicker`](https://material-ui-pickers.firebaseapp.com/demo/datetimepicker)

日期、时间选择，依赖于外部库[`material-ui-pickers`](https://material-ui-pickers.firebaseapp.com/installation)

### FAQ

#### `给组件设置的 onChange、onFocus 等方法无效、不执行`

`FormControl`会覆盖掉直接添加到 antd 组件上的`onFocus` `onBlur` `onChange`方法，所以如果需要这三个事件方法，需要添加到
`FormControl`上：

```javascript
<FormControl name="test" onChange={ev => console.log('change', ev)} onFocus={ev => console.log('focus', ev)}>
    <Input />
</FormControl>
```

#### `为什么有些搭配某些组件时必须给 FormControl 传递 component 参数呢？`

由于`material-ui`库的设计，其一些组件使用了 `withStyles` 高阶组件包装，导致代码压缩后无法区别到底是哪个组件类型，也就无法针对这些组件做特殊状态同步处理。

所以对于 `Checkbox` `Radio` `Switch` `TextField` 这四种需要特殊处理的组件，必须传递 `component` 参数，以确保正确运行。
