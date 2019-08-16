import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

// 用户请求贷款
export function LoanRequest() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid>
                <Typography variant="h4">借贷</Typography>
            </Grid>
            <Grid>
                <TextField
                    id="filled-select-currency-native"
                    select
                    label="微众银行"
                    className={classes.textField}
                    onChange={handleChange('currency')}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="请选择你要借贷的公司"
                    margin="normal"
                    variant="filled"
                ></TextField>
            </Grid>
            <Grid>
                <TextField
                    id="outlined-number"
                    label="金额"
                    onChange={handleChange('age')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid>
                <TextField
                    id="date"
                    label="还款日期"
                    style={{ margin: 8 }}
                    type="date"
                    defaultValue="2019-08-24"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid>
                <FormControlLabel
                    control={
                        <Switch checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
                    }
                    label="自动上传相关凭证"
                />
            </Grid>
            <Grid>
                <Button variant="contained" color="primary" component={Link} to="/loanRequestInfoList">借贷</Button>
            </Grid>
        </Container >
    );
}
