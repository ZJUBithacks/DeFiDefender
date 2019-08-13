import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

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
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}))

export function PushResponseContent(props) {
    const classes = useStyles()
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: true,
    })

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked })
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid>
                <TextField
                    id="standard-full-width"
                    label="Request Description"
                    style={{ margin: 8 }}
                    value="Is anyone has Lin's Passport?"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid>
                <TextField
                    id="standard-full-width"
                    label="Your Response"
                    style={{ margin: 8 }}
                    placeholder="Just put your response"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <label>or</label>
            <Grid>
                <input
                    accept="file/*"
                    className={classes.input}
                    id="outlined-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="outlined-button-file">
                    <Button variant="outlined" component="span" className={classes.button}>
                        Upload
                    </Button>
                </label>
            </Grid>
            <Grid>
                <FormControlLabel
                    control={
                        <Switch checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
                    }
                    label="Keep anonymous"
                />
            </Grid>
            <Grid>
                <Button variant="contained" color="primary" component={Link} to="/responses/yourResponses">Push Response</Button>
            </Grid>
        </Container >
    )
}