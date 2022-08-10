# react-mui-formutil

[![npm](https://img.shields.io/npm/v/react-mui-formutil.svg?style=flat)](https://npm.im/react-mui-formutil)
[![peerDependencies](https://img.shields.io/npm/dependency-version/react-mui-formutil/peer/react.svg?color=yellowgreen)](https://reactjs.org)
[![definitionTypes](https://img.shields.io/npm/types/react-mui-formutil.svg)](https://github.com/qiqiboy/react-mui-formutil/blob/master/index.d.ts)
[![gzip](https://img.shields.io/bundlephobia/minzip/react-mui-formutil.svg)](https://npm.im/react-mui-formutil)
[![download](https://img.shields.io/npm/dm/react-mui-formutil.svg)](https://npm.im/react-mui-formutil)
[![issues](https://img.shields.io/github/issues/qiqiboy/react-mui-formutil.svg)](https://github.com/qiqiboy/react-mui-formutil/issues)
[![license](https://img.shields.io/github/license/qiqiboy/react-mui-formutil.svg)](https://github.com/qiqiboy/react-mui-formutil/blob/master/LICENSE)
[![github](https://img.shields.io/github/last-commit/qiqiboy/react-mui-formutil.svg)](https://github.com/qiqiboy/react-mui-formutil)
[![github](https://img.shields.io/github/release-date/qiqiboy/react-mui-formutil.svg)](https://github.com/qiqiboy/react-mui-formutil/releases)
[![github](https://img.shields.io/github/commit-activity/m/qiqiboy/react-mui-formutil.svg)](https://github.com/qiqiboy/react-mui-formutil/commits/master)
[![github](https://img.shields.io/github/stars/qiqiboy/react-mui-formutil.svg?style=social)](https://github.com/qiqiboy/react-mui-formutil)

Happy to use react-formutil in the project based on `@mui/material` ^\_^

在 [@mui/material](https://github.com/mui-org/@mui/material) 项目，结合[react-formutil](https://github.com/qiqiboy/react-formutil) 来快速构建表单。

> **如果你在使用其他 react-组件库，可以查阅：**
>
> 1. ant-design [`react-antd-formutil`](https://github.com/qiqiboy/react-antd-formutil) [![npm](https://img.shields.io/npm/v/react-antd-formutil.svg?style=flat)](https://npm.im/react-antd-formutil)
> 1. react-bootstrap [`react-bootstrap-formutil`](https://github.com/qiqiboy/react-bootstrap-formutil) [![npm](https://img.shields.io/npm/v/react-bootstrap-formutil.svg?style=flat)](https://npm.im/react-bootstrap-formutil)
> 1. react-md [`react-md-formutil`](https://github.com/qiqiboy/react-md-formutil) [![npm](https://img.shields.io/npm/v/react-md-formutil.svg?style=flat)](https://npm.im/react-md-formutil)

<!-- vim-markdown-toc GFM -->

- [安装 Installation](#安装-installation)
- [使用 Usage](#使用-usage)
    + [`<FormControl />`](#formcontrol-)
        * [`name`](#name)
        * [`label`](#label)
        * [`helperText`](#helpertext)
        * [`noStyle`](#nostyle)
        * [`$defaultValue`](#defaultvalue)
        * [`$validators`](#validators)
        * [`$parser`](#parser)
        * [`$formatter`](#formatter)
        * [`checked` `unchecked`](#checked-unchecked)
        * [`validMessage`](#validmessage)
        * [`$validateLazy`](#validatelazy)
        * [`valuePropName` `changePropName` `focusPropName` `blurPropName`](#valuepropname-changepropname-focuspropname-blurpropname)
        * [`getValueFromEvent`](#getvaluefromevent)
        * [`errorLevel`](#errorlevel)
    + [`<CheckboxGroup />`](#checkboxgroup-)
    + [`setErrorLevel(level)`](#seterrorlevellevel)
    + [`支持的组件`](#支持的组件)
        * [`Autocomplete`](#autocomplete)
        * [`Checkbox`](#checkbox)
        * [`Radio button`](#radio-button)
        * [`Rating`](#rating)
        * [`Select`](#select)
        * [`Slider`](#slider)
        * [`Switch`](#switch)
        * [`TextField`](#textfield)
        * [`ToggleButton`](#togglebutton)
        * [`Date/Time pickers`](#datetime-pickers)

<!-- vim-markdown-toc -->

### 安装 Installation

[![react-mui-formutil](https://nodei.co/npm/react-mui-formutil.png?compact=true)](https://npm.im/react-mui-formutil)

```bash
# npm
npm install react-mui-formutil --save

# yarn
yarn install react-mui-formutil
```

### 使用 Usage

> `react-material-formutil` 整合了 `react-formutil` 的组件，所以可以直接从`react-material-formutil`中导出所需要的
> `react-formutil` 组件。不用单独从 `react-formutil` 中导出。

```typescript
import React, { Component } from 'react';
import { withForm, FormControl, $Formutil } from 'react-mui-formutil';
import { Box, TextField } from '@mui/material'; // 导入mui的TextField组件

interface MyFormProps {
    $formutil: $Formutil;
}
const MyForm: React.FC = () => {
    const onSubmit = ev => {
        ev.preventDefault();

        // ...
    };

    return (
        <Box component="form" noValidate onSubmit={onSubmit}>
            <FormControl label="Username" name="username" fullWidth>
                <TextField />
            </FormControl>

            <Button fullWidth type="submit">
                submit
            </Button>
        </Box>
    );
};

export default withForm(MyForm);
```

`FormControl`是 `react-mui-formuitl` 中提供的用于标单项交互的组件，`withForm`是`react-formutil`的组件（没错，你可以直接从`react-material-formutil`中导出`react-formutil`的组件啦）。

只需要将`@mui/material`的表单类组件，嵌套在`FormControl`下，即可实现自动的表单状态同步。

#### `<FormControl />`

要实现将`@mui/material`的表单组件的值能同步到 `react-formutil` 的状态中，需要通过 `FormControl` 这个组件来实现中间态绑定。

`FormControl`类似`@mui/material`中的同名组件，但是它基于`react-formutil`实现了表单状态的收集与同步。你应当在`react-formutil`表单中总是使用这个新的`FormControl`。

> `FormControl`下只允许放置一个表单组件，不允许多个。

##### `name`

设置输入项的 name 值，表单项将会以 name 作为 key 收集到 formutil 的状态中。支持嵌套语法 _（同`react-formutil`的`Field`同名参数，可以参考 [name](https://github.com/qiqiboy/react-formutil#name)）_

##### `label`

设置 label，你也可以传入`Typography`或者其他节点对象以实现 label 样式自定义。

```typescript
<FormControl name="name" label="Username">
    <TextField />
</FormControl>

// 如果要自定义label的样式，可以这样：
<FormControl name="name" label={<Typography variant="h5" sx={{ mb:1 }}>Username</Typography>}>
    <TextField />
</FormControl>
```

##### `helperText`

设置 `helperText`，你也可以直接传递各类节点对象以实现样式自定义。

```typescript
<FormControl name="name" helperText="Please type your name">
    <TextField />
</FormControl>

//or

<FormControl name="name" helperText={<Box component="span" sx={{ fontWeight: 700 }}>Please type your name</Box>}>
    <TextField />
</FormControl>
```

##### `noStyle`

`noStyle`可以用来控制是否输出`FormControl`的额外的样式元素。缺省情况下默认值为`false`。这在一些需要组合使用的场景下非常有用！

当`noStyle`为`true`时，将会只渲染字段节点本身，但是其表单状态依然会被处理收集。此时，如果其存在父级嵌套的`FormControl`，那么其表达校验状态将会传递给父级的`FormControl`来展现。

这对于连续的紧凑型表单元素将非常有用！可以避免校验错误描述信息都堆叠在一起! **但是没有额外的样式显示，包括表单校验状态都无法显示了。此时可以在其外层包裹一层不带`name`的`FormGroup`，这些`noStyle`的表单项就会把他们自身的状态向上进行注册显示了！**

但是有以下几点需要注意：

1. 最外层的`FormControl`不能设置`name`属性，否则将不会被当作子级的校验状态容器
2. 内层的`FormControl`需要添加相应的`name`值（向表单控制器注册自身）以及`noStyle`属性（不渲染额外的样式，避免和上层冲突）

```typescript
// 这里不能设置name
<FormControl label="姓名">
    <Grid container spacing={2}>
        {/* 与普通的FormControl用法一致，只是多了个noStyle */}
        <Grid item xs={6}>
            <FormGroup name="first_name" required validMessage={{ required: 'First name reuqired!' }} noStyle>
                <TextField label="姓" />
            </FormGroup>
        </Grid>
        <Grid item xs={6}>
            <FormGroup name="last_name" required validMessage={{ required: 'Last name reuqired!' }} noStyle>
                <TextField label="名" />
            </FormGroup>
        </Grid>
    </Grid>
</FormControl>
```

以上运行示例请参考 [示例 demo4](http://github.boy.im/react-mui-formutil/demo/)

##### `$defaultValue`

设置该表单项的默认值 _（同`react-formutil`的`Field`同名参数，可以参考[$defaultvalue](https://github.com/qiqiboy/react-formutil#defaultvalue)）_

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

内置的校验规则无需再次声明，除非规则不符合预期，需要替换，则可以通过`$validators` 传递同名校验方法即可替换默认的。另外，内置的校验规则，如果校验不通过，会尝试去 `validMessage` 匹配错误信息。

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

##### `$validateLazy`

可以用来优化表单的校验速度，请参考： [`$validateLazy`](https://github.com/qiqiboy/react-formutil#validatelazy)

##### `valuePropName` `changePropName` `focusPropName` `blurPropName`

该四个参数可以用来设置绑定到组件上的值或者值变动、是否聚焦等事件回调。该项一般不需要设置，`FormControl` 已经针对 `@mui/material`
中的所有 `data-entry` 型组件做了兼容处理。

对于一些特殊场景，例如不需要同步 `focus`、`blur`，则可以通过将该值设为`{null}`来禁用：

```javascript
//禁用focus、blur状态同步
<FormControl focusPropName={null} blurPropName={null} name="username">
    <Input />
</FormControl>
```

##### `getValueFromEvent`

请参考 [`getValueFromEvent()`](https://github.com/qiqiboy/react-formutil/blob/master/README.md#getvaluefromevent)

##### `errorLevel`

用来覆盖全局的 errorLevel 设置。参考[`setErrorLevel(level)`](#seterrorlevellevel)

#### `<CheckboxGroup />`

`@mu/material` 提供了`RadioGroup`组件，但是却并没有提供相应的`CheckboxGroup`。所以，它来了。

```javascript
<FormControl name="checkboxgroup" required label="Checkbox group">
    <CheckboxGroup>
        <FormControlLabel value="apple" control={<Checkbox />} label="Apple" />
        <FormControlLabel value="peach" control={<Checkbox />} label="Peach" />
    </CheckboxGroup>
</FormControl>
```

#### `setErrorLevel(level)`

`setErrorLevel` 该方法可以用来全局设置错误信息何时出现，有三个级别可以设置：

-   `0` 当`$dirty` `$touched` `invalid` 都为 true 时
-   `1` 当`$dirty` `invalid` 都为 true 时
-   `2` 当`invalid` 为 true 时

默认值为 `1`

```javascript
import { setErrorLevel } from 'react-antd-formutil';

setErrorLevel(0);
```

#### `支持的组件`

##### [`Autocomplete`](https://mui.com/zh/material-ui/react-autocomplete/)

##### [`Checkbox`](https://mui.com/zh/material-ui/react-checkbox/)

##### [`Radio button`](https://mui.com/zh/material-ui/react-radio-button/)

##### [`Rating`](https://mui.com/zh/material-ui/react-rating/)

##### [`Select`](https://mui.com/zh/material-ui/react-select/)

##### [`Slider`](https://mui.com/zh/material-ui/react-slider/)

##### [`Switch`](https://mui.com/zh/material-ui/react-switch/)

##### [`TextField`](https://mui.com/zh/material-ui/react-text-field/)

##### [`ToggleButton`](https://mui.com/zh/material-ui/react-toggle-button/)

##### [`Date/Time pickers`](https://mui.com/zh/x/react-date-pickers/getting-started/)

需要注意的是，日期、时间选择器组件的`value`和`onChange`的 ts 类型声明为必须，但是实际在配合`react-mui-formutil`使用时是无需指定的。为了避免报错，可以指定最小空值即可:

```typescript
<FormControl name="datepicker.datepicker" required fullWidth sx={{ mb: 2 }}>
    <DatePicker value={null} onChange={() => {}} label="DatePicker" renderInput={params => <TextField {...params} />} />
</FormControl>
```
