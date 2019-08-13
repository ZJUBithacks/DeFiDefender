import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Link } from 'react-router-dom'

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

function createData(description, owner, reward, status, expired, requestId) {
    return { description, owner, reward, status, expired, requestId }
}

const rows = [
    createData(`Is anyone has Lin's Passport?`, 'UnKnown', 10.0, 'Not completed', '2019-09-01', '001'),
    createData(`Is anyone has Lin's Driver License?`, 'UnKnown', 50.0, 'Failed', '2019-08-01', '002'),
    createData(`Is anyone has He's Passport?`, 'UnKnown', 30.0, 'Not completed', '2019-09-02', '003'),
    createData(`Is anyone has He's Driver License?`, 'UnKnown', 30.0, 'Not completed', '2019-09-03', '004'),
    createData(`How to go to Hangzhou?`, 'Sher', 2.0, 'Over', '2019-09-11', '005'),
    createData(`How to go to Beijing?`, 'Lin', 4.0, 'Over', '2019-07-22', '006'),
]

export function AllRequestsContent(props) {
    const classes = useStyles()

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Owner</TableCell>
                            <TableCell align="right">Reward</TableCell>
                            <TableCell align="right">Expire Date</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Answer it</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.description}
                                </TableCell>
                                <TableCell align="right">{row.owner}</TableCell>
                                <TableCell align="right">{row.reward}</TableCell>
                                <TableCell align="right">{row.expired}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    {row.status === "Not completed" ? <Button color="primary" component={Link} to="/requests/pushResponse">
                                        Response
                                        <CloudUploadIcon className={classes.rightIcon} />
                                    </Button>
                                        :
                                        <Button color="primary" disabled>
                                            Response
                                        <CloudUploadIcon className={classes.rightIcon} />
                                        </Button>
                                    }

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    )
}