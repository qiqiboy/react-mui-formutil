import {
    AccountCircle,
    FormatAlignCenter,
    FormatAlignJustify,
    FormatAlignLeft,
    FormatAlignRight
} from '@mui/icons-material';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import {
    Autocomplete,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    DialogActions,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Rating,
    TextField,
    ThemeProvider,
    ToggleButton,
    ToggleButtonGroup,
    Checkbox,
    Switch,
    Divider,
    MenuItem,
    InputAdornment,
    OutlinedInput,
    Typography,
    Select,
    Slider
} from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // eslint-disable-line
import React, { FormEvent, useState } from 'react';
import { $Formutil, withForm } from 'react-formutil';
import { CheckboxGroup, FormControl } from 'app/../../src';
import { top100Films } from './config';

interface AppProps {
    $formutil: $Formutil;
}

const theme = createTheme({
    components: {
        MuiTooltip: {
            defaultProps: {
                arrow: true
            }
        }
    }
});

const App: React.FC<AppProps> = props => {
    const [memoMode, setMemoMode] = useState<0 | 1 | 2>(0);
    const [formErrorMsg, setFormErrorMsg] = useState('');
    const [dialogVisiable, setDialog] = useState(false);
    const { $formutil } = props;

    const onSubmit = (formEvenet: FormEvent) => {
        formEvenet.preventDefault();

        const { $invalid, $batchDirty, $getFirstError } = $formutil;

        if ($invalid) {
            $batchDirty(true);
            setDialog(true);
            setFormErrorMsg($getFirstError());
        } else {
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container>
                    <Typography variant="h3" sx={{ textAlign: 'center', mb: 3 }}>
                        react-mui-formutil
                    </Typography>
                    <FormLabel sx={{ fontWeight: 'bold' }}>Enable $memo: </FormLabel>
                    <ToggleButtonGroup
                        exclusive
                        color="error"
                        value={memoMode}
                        onChange={(ev, value) => setMemoMode(value)}>
                        <ToggleButton value={0}>false</ToggleButton>
                        <ToggleButton value={1}>true</ToggleButton>
                        <ToggleButton value={2}>空数组</ToggleButton>
                    </ToggleButtonGroup>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <Box component="form" noValidate onSubmit={onSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item lg={4} md={6}>
                                        <Typography variant="h4" gutterBottom>
                                            TextField*
                                        </Typography>
                                        <FormControl
                                            name="textfield.outlined"
                                            required
                                            label="TextField Outline"
                                            sx={{ mb: 2 }}>
                                            <TextField variant="outlined" fullWidth />
                                        </FormControl>
                                        <FormControl
                                            name="textfield.filled"
                                            required
                                            label="TextField Filled"
                                            sx={{ mb: 2 }}>
                                            <TextField variant="filled" fullWidth />
                                        </FormControl>
                                        <FormControl
                                            name="textfield.standard"
                                            required
                                            label="TextField Standard"
                                            sx={{ mb: 2 }}>
                                            <TextField variant="standard" fullWidth />
                                        </FormControl>
                                        <FormControl
                                            name="textfield.multiline"
                                            required
                                            label="TextField Multiline"
                                            sx={{ mb: 2 }}>
                                            <TextField multiline rows={4} fullWidth />
                                        </FormControl>
                                        <FormControl
                                            name="textfield.select"
                                            required
                                            label="TextField Select"
                                            sx={{ mb: 2 }}>
                                            <TextField select helperText="Please select your currency" fullWidth>
                                                {top100Films.map(option => (
                                                    <MenuItem key={option.label} value={option.label}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                        <FormControl
                                            name="textfield.icon"
                                            required
                                            label="TextField ICON"
                                            sx={{ mb: 2 }}>
                                            <TextField
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    )
                                                }}
                                                variant="standard"
                                            />
                                        </FormControl>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 4 }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <FormControl name="textfield.icon2" required label="TextField ICON 2">
                                                <TextField variant="standard" fullWidth />
                                            </FormControl>
                                        </Box>
                                        <FormControl
                                            name="textfield.prefix"
                                            required
                                            label="TextField prefix"
                                            sx={{ mb: 2 }}>
                                            <TextField
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    endAdornment: <InputAdornment position="end">RMB</InputAdornment>
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl
                                            name="textfield.input"
                                            required
                                            fullWidth
                                            label="TextField Input"
                                            sx={{ my: 2 }}>
                                            <OutlinedInput />
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={6}>
                                        <Typography variant="h4" gutterBottom>
                                            Select/Autocomplete
                                        </Typography>
                                        <FormControl
                                            name="select.single"
                                            required
                                            label="Select"
                                            sx={{ mb: 2 }}
                                            fullWidth>
                                            <Select>
                                                {top100Films.map(option => (
                                                    <MenuItem key={option.label} value={option.label}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            name="select.multiple"
                                            required
                                            label="Select Multiple"
                                            sx={{ mb: 2 }}
                                            fullWidth>
                                            <Select multiple>
                                                {top100Films.map(option => (
                                                    <MenuItem key={option.label} value={option.label}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            name="autocomplete.single"
                                            required
                                            label="Autocomplete"
                                            sx={{ mb: 2 }}>
                                            <Autocomplete
                                                disablePortal
                                                options={top100Films}
                                                renderInput={params => <TextField {...params} fullWidth />}
                                            />
                                        </FormControl>
                                        <Autocomplete
                                                multiple
                                                disablePortal
                                            onChange={(...a) => console.log(a)}
                                                options={top100Films}
                                                renderInput={params => <TextField {...params} fullWidth />}
                                            />
                                        <FormControl
                                            name="autocomplete.multiple"
                                            required
                                            label="Autocomplete"
                                            sx={{ mb: 2 }}>
                                            <Autocomplete
                                                multiple
                                                disablePortal
                                                options={top100Films}
                                                renderInput={params => <TextField {...params} fullWidth />}
                                            />
                                        </FormControl>
                                        <FormControl
                                            name="slider.single"
                                            required
                                            label="Slider"
                                            sx={{ mb: 2 }}
                                            fullWidth>
                                            <Slider valueLabelDisplay="auto" step={10} marks min={10} max={110} />
                                        </FormControl>
                                        <FormControl
                                            name="slider.range"
                                            required
                                            label="Slider Range"
                                            $defaultValue={[20, 30]}
                                            sx={{ mb: 2 }}
                                            fullWidth>
                                            <Slider valueLabelDisplay="auto" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={6}>
                                        <Typography variant="h4" gutterBottom>
                                            Checkbox/Radio/Switch
                                        </Typography>
                                        <FormControl
                                            label="Rating"
                                            name="rating"
                                            fullWidth
                                            required
                                            sx={{
                                                mb: 2
                                            }}>
                                            <Rating name="rating" />
                                        </FormControl>
                                        <FormControl
                                            required
                                            fullWidth
                                            checked="yes"
                                            unchecked="no"
                                            label="Checkbox"
                                            name="checkbox"
                                            sx={{
                                                alignItems: 'flex-start',
                                                mb: 2
                                            }}>
                                            <Checkbox />
                                        </FormControl>
                                        <FormControl
                                            required
                                            fullWidth
                                            label="Radio"
                                            name="radio"
                                            sx={{
                                                alignItems: 'flex-start',
                                                mb: 2
                                            }}>
                                            <Radio />
                                        </FormControl>
                                        <FormControl
                                            required
                                            fullWidth
                                            label="Switch"
                                            name="switch"
                                            sx={{
                                                mb: 2
                                            }}>
                                            <Switch />
                                        </FormControl>
                                        <Divider>SPLIT LINE</Divider>
                                        <FormControl required name="fcl.checkbox" fullWidth>
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Checkbox(FormControlLabel)"
                                            />
                                        </FormControl>
                                        <FormControl required name="fcl.radio" fullWidth>
                                            <FormControlLabel control={<Radio />} label="Radio(FormControlLabel)" />
                                        </FormControl>
                                        <FormControl required name="fcl.switch" fullWidth>
                                            <FormControlLabel control={<Switch />} label="Switch(FormControlLabel)" />
                                        </FormControl>
                                        <Divider sx={{ my: 2 }}>SPLIT LINE</Divider>
                                        <FormControl
                                            label="RadioGroup"
                                            $defaultValue="female"
                                            name="radio-group"
                                            sx={{ mb: 2 }}
                                            required
                                            fullWidth>
                                            <RadioGroup>
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                                            </RadioGroup>
                                        </FormControl>
                                        <FormControl
                                            label="CheckboxGroup"
                                            name="checkbox-group"
                                            required
                                            sx={{ mb: 2 }}
                                            fullWidth>
                                            <CheckboxGroup>
                                                <FormControlLabel
                                                    value="female"
                                                    control={<Checkbox />}
                                                    label="Female"
                                                />
                                                <FormControlLabel value="male" control={<Checkbox />} label="Male" />
                                                <FormControlLabel value="other" control={<Checkbox />} label="Other" />
                                            </CheckboxGroup>
                                        </FormControl>
                                        <FormControl
                                            label="SwitchGroup"
                                            name="switch-group"
                                            required
                                            fullWidth
                                            sx={{ mb: 2 }}>
                                            <CheckboxGroup>
                                                <FormControlLabel value="female" control={<Switch />} label="Female" />
                                                <FormControlLabel value="male" control={<Switch />} label="Male" />
                                                <FormControlLabel value="other" control={<Switch />} label="Other" />
                                            </CheckboxGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={6}>
                                        <Typography variant="h4" gutterBottom>
                                            ToggleButtonGroup
                                        </Typography>
                                        <FormControl
                                            label={
                                                <Box component="div" sx={{ mb: 1 }}>
                                                    ToggleButtonGroup
                                                </Box>
                                            }
                                            name="togglebuttongroup.horizontal"
                                            required
                                            fullWidth
                                            sx={{ mb: 2 }}>
                                            <ToggleButtonGroup exclusive>
                                                <ToggleButton value="left" aria-label="left aligned">
                                                    <FormatAlignLeft />
                                                </ToggleButton>
                                                <ToggleButton value="center" aria-label="centered">
                                                    <FormatAlignCenter />
                                                </ToggleButton>
                                                <ToggleButton value="right" aria-label="right aligned">
                                                    <FormatAlignRight />
                                                </ToggleButton>
                                                <ToggleButton value="justify" aria-label="justified" disabled>
                                                    <FormatAlignJustify />
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </FormControl>
                                        <FormControl
                                            label={
                                                <Box component="div" sx={{ mb: 1 }}>
                                                    ToggleButtonGroup
                                                </Box>
                                            }
                                            name="togglebuttongroup.vertical"
                                            required
                                            fullWidth
                                            sx={{ mb: 2 }}>
                                            <ToggleButtonGroup exclusive orientation="vertical">
                                                <ToggleButton value="left" aria-label="left aligned">
                                                    <FormatAlignLeft />
                                                </ToggleButton>
                                                <ToggleButton value="center" aria-label="centered">
                                                    <FormatAlignCenter />
                                                </ToggleButton>
                                                <ToggleButton value="right" aria-label="right aligned">
                                                    <FormatAlignRight />
                                                </ToggleButton>
                                                <ToggleButton value="justify" aria-label="justified" disabled>
                                                    <FormatAlignJustify />
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={6}>
                                        <Typography variant="h4" gutterBottom>
                                            DatePicker
                                        </Typography>
                                        <FormControl name="datepicker.datepicker" required fullWidth sx={{ mb: 2 }}>
                                            <DatePicker
                                                value={null}
                                                onChange={() => {}}
                                                label="DatePicker"
                                                renderInput={params => <TextField {...params} />}
                                            />
                                        </FormControl>
                                        <FormControl name="datepicker.datetimepicker" required fullWidth sx={{ mb: 2 }}>
                                            <DateTimePicker
                                                value={null}
                                                onChange={() => {}}
                                                label="DateTimePicker"
                                                renderInput={params => <TextField {...params} />}
                                            />
                                        </FormControl>
                                        <FormControl
                                            name="datepicker.daterangepicker"
                                            required
                                            fullWidth
                                            $defaultValue={[null, null]}
                                            sx={{ mb: 2 }}>
                                            <DateRangePicker
                                                value={[null, null]}
                                                onChange={() => {}}
                                                label="DateRangePicker"
                                                renderInput={(startProps, endProps) => (
                                                    <>
                                                        <TextField {...startProps} />
                                                        <Box sx={{ mx: 2 }}> to </Box>
                                                        <TextField {...endProps} />
                                                    </>
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={6}>
                                        <Typography variant="h4" gutterBottom>
                                            Form Groups
                                        </Typography>
                                        <FormControl label="Your Name" fullWidth sx={{ mb: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <FormControl name="formgroup.firstName" required noStyle>
                                                        <TextField label="First Name" />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl name="formgroup.lastname" required noStyle>
                                                        <TextField label="Last Name" />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </FormControl>
                                        <FormControl label="Birthday and Sex" fullWidth sx={{ mb: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <FormControl
                                                        name="formgroup.birthday"
                                                        label="Birthday"
                                                        required
                                                        noStyle
                                                        fullWidth>
                                                        <Select>
                                                            {new Array(50).fill(0).map((_, index) => (
                                                                <MenuItem key={index} value={1980 + index}>
                                                                    {1980 + index}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl
                                                        name="formgroup.sex"
                                                        label="Sex"
                                                        required
                                                        noStyle
                                                        fullWidth>
                                                        <Select>
                                                            <MenuItem value="female">Female</MenuItem>
                                                            <MenuItem value="male">Male</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button color="error" variant="contained" type="submit" fullWidth size="large">
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box component="pre">{JSON.stringify($formutil.$params, null, 2)}</Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box component="pre">{JSON.stringify($formutil.$errors, null, 2)}</Box>
                        </Grid>
                    </Grid>
                </Container>
            </LocalizationProvider>
            <Dialog open={dialogVisiable} onClose={() => setDialog(false)}>
                <DialogTitle>Oops, please check you form inputs</DialogTitle>
                <DialogContent>
                    <DialogContentText>{formErrorMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog(false)} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

export default withForm(App);
