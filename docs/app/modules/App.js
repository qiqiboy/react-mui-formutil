import React, { Component } from 'react';
import { withForm, FormControl } from 'app/../../src';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

const styles = () => ({
    formGroup: {
        margin: '20px 0'
    }
});

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
            <Grid container spacing={24}>
                <Grid item lg={6} xs={12}>
                    <form autoComplete="off" onSubmit={this.submit}>
                        <FormControl
                            name="select"
                            controlProps={{
                                fullWidth: true
                            }}
                            required
                            label={<InputLabel>Select</InputLabel>}>
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
                        <DatePicker
                            autoOk
                            label="Clearable"
                            clearable
                            disableFuture
                            maxDateMessage="Date must be less than today"
                            animateYearScrolling={false}
                        />
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
                <Grid item lg xs={12}>
                    <pre>{JSON.stringify(this.props.$formutil.$params, null, 2)}</pre>
                </Grid>
                <Grid item lg xs={12}>
                    <pre>{JSON.stringify(this.props.$formutil.$errors, null, 2)}</pre>
                </Grid>
            </Grid>
        );
    }
}

export default App;
