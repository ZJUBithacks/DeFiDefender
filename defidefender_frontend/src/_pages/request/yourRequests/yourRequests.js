import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
}))

function createData(description, reward, status, expired, responsesCount, acceptResponseId, requestId) {
    return { description, reward, status, expired, responsesCount, acceptResponseId, requestId }
}

const rows = [
    createData(`Is anyone has Lin's Passport?`, 10.0, 'Not completed', '2019-09-01', 3, 'Response_001', '001'),
    createData(`Is anyone has Lin's Driver License?`, 50.0, 'Failed', '2019-08-01', 0, '-', '002'),
    createData(`Is anyone has He's Passport?`, 30.0, 'Not completed', '2019-09-02', 1, '-', '003'),
]

export function YourRequestsContent() {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid>
                <Button color="primary" variant="contained" component={Link} to="/requests/pushRequest">Create Request</Button>
            </Grid>
            <br></br>
            <Grid>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Reward</TableCell>
                                <TableCell align="right">Expire Date</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">ResponsesCount</TableCell>
                                <TableCell align="right">AcceptResponseId</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="right">{row.reward}</TableCell>
                                    <TableCell align="right">{row.expired}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">{row.responsesCount}</TableCell>
                                    <TableCell align="right">{row.acceptResponseId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Container>
    );
}