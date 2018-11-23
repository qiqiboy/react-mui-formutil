import React, { Component } from 'react';
import { withForm, FormControl } from 'app/../../src';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import { hobbiesOptions } from './config';

import {
    Input,
    TextField,
    Select,
    Switch,
    Checkbox,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    MenuItem
} from '@material-ui/core';

import MaskedInput from 'react-text-mask';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers';

import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = () => ({
    formGroup: {
        margin: '20px 0 !important'
    },
    pageTitle: {
        textAlign: 'center'
    },
    overflow: {
        overflow: 'hidden',
        wordWrap: 'break-word'
    }
});

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

@withForm
@withStyles(styles)
class App extends Component {
    state = { acDataSource: [] };

    submit = ev => {
        ev.preventDefault();

        const { $invalid, $batchDirty } = this.props.$formutil;
        console.log('submit');
        if ($invalid) {
            $batchDirty(true);
        } else {
            // submit data
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <h2 className={classes.pageTitle}>react-material-formutil</h2>
                <Grid container spacing={24}>
                    <Grid item lg={6} xs={12}>
                        <form autoComplete="off" onSubmit={this.submit}>
                            <h3>TextField</h3>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="textfield.name"
                                        required
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <TextField label="Name" margin="normal" />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="textfield.password-input"
                                        required
                                        $defaultValue="hello world"
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <TextField
                                            id="password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="textfield.readonly"
                                        required
                                        $defaultValue="hello world"
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <TextField
                                            id="read-only-input"
                                            label="Read Only"
                                            margin="normal"
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="textfield.multiline"
                                        required
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <TextField id="multiline-static" label="Multiline" multiline margin="normal" />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="textfield.placeholder"
                                        required
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <TextField
                                            id="with-placeholder"
                                            label="With placeholder"
                                            placeholder="Placeholder"
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="textfield.number"
                                        required
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <TextField
                                            label="Number"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="textfield.search"
                                        required
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <TextField
                                            label="Search field"
                                            type="search"
                                            margin="normal"
                                            helperText="helper text"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="textfield.select"
                                        required
                                        $defaultValue="Apple"
                                        helperText="helper text"
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <TextField select label="Select" margin="normal">
                                            {hobbiesOptions.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="textfield.nativeselect"
                                        required
                                        $defaultValue="Apple"
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <TextField
                                            select
                                            label="Native select"
                                            SelectProps={{
                                                native: true
                                            }}
                                            helperText="helper text"
                                            margin="normal">
                                            {hobbiesOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <h3>Input</h3>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="input.normal"
                                        controlProps={{
                                            fullWidth: true
                                        }}
                                        required
                                        label={<InputLabel>Input</InputLabel>}>
                                        <Input placeholder="Placeholder" />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="input.adornment"
                                        controlProps={{
                                            fullWidth: true
                                        }}
                                        required
                                        label="with adornment">
                                        <Input
                                            id="adornment-weight"
                                            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <h3>Formatted inputs</h3>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="input.mask"
                                        controlProps={{
                                            fullWidth: true
                                        }}
                                        required
                                        $defaultValue="1"
                                        label="MaskInput">
                                        <Input inputComponent={TextMaskCustom} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="input.icon"
                                        controlProps={{
                                            fullWidth: true
                                        }}
                                        required
                                        label="with icon adornment">
                                        <Input
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <h3>Select</h3>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="select"
                                        controlProps={{
                                            fullWidth: true
                                        }}
                                        required
                                        label="Select">
                                        <Select
                                            inputProps={{
                                                name: 'age'
                                            }}>
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <h3>Switch</h3>

                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl name="switch.single" required>
                                        <Switch />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl name="switch.label" required checked="yes" unchecked="no">
                                        <FormControlLabel control={<Switch />} label="The label" />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <h3>Checkbox</h3>

                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl name="checkbox.single" required>
                                        <Checkbox />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl name="checkbox.label" required checked="yes" unchecked="no">
                                        <FormControlLabel control={<Checkbox />} label="The label" />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <h3>Radio</h3>

                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl name="radio.single" required>
                                        <Radio />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl name="radio.label" required checked="yes">
                                        <FormControlLabel control={<Radio />} label="The label" />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="radio.group"
                                        required
                                        label={<FormLabel component="legend">Gender</FormLabel>}>
                                        <RadioGroup name="gender1">
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                            <FormControlLabel
                                                value="disabled"
                                                disabled
                                                control={<Radio />}
                                                label="(Disabled option)"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <h3>Material-UI-Pickers: DatePicker、TimePicker</h3>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="datepicker"
                                        required
                                        $defaultValue={null}
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <DatePicker label="DatePicker" autoOk clearable />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        name="timepicker"
                                        required
                                        $defaultValue={null}
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <TimePicker label="TimePicker" autoOk clearable />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl
                                        $defaultValue={moment()}
                                        name="datetimepicker"
                                        required
                                        controlProps={{
                                            fullWidth: true
                                        }}>
                                        <DateTimePicker label="DateTimePicker" />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                className={classes.formGroup}>
                                Submit
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <h3>$params</h3>
                        <pre className={classes.overflow}>{JSON.stringify(this.props.$formutil.$params, null, 2)}</pre>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <h3>$errors</h3>
                        <pre className={classes.overflow}>{JSON.stringify(this.props.$formutil.$errors, null, 2)}</pre>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        );
    }
}

export default App;
