import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
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
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
}))

function createData(requestDesc, requestOwner, status, expired, response, requestId) {
    return { requestDesc, requestOwner, status, expired, response, requestId }
}

const rows = [
    createData(`Is anyone has He's Passport?`, 'UnKnown', 'Not completed', '2019-09-02', 'http://img.sher.vip/1.jpg', '003'),
    createData(`Is anyone has He's Driver License?`, 'UnKnown', 'Not completed', '2019-09-03', 'http://img.sher.vip/1.jpg', '004'),
    createData(`How to go to Hangzhou?`, 'Sher', 'Over', '2019-09-11', 'Just take railway', '005'),
]

export function YourResponsesContent() {
    const classes = useStyles()

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Request Description</TableCell>
                            <TableCell align="right">Request Owner</TableCell>
                            <TableCell align="right">Expire Date</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Response</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.requestDesc}
                                </TableCell>
                                <TableCell align="right">{row.requestOwner}</TableCell>
                                <TableCell align="right">{row.expired}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    {!row.response.search("http") ? <a href={row.response} target="_blank">Link it</a> : <div>{row.response}</div>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    )
}