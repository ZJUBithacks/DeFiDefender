import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Link } from 'react-router-dom'

const useStyles = theme => ({
    title: {
        textAlign: 'center'
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
});

// 列出所有凭证
class ListCredential extends Component {
    createData(weid, cpt, ipfs_hash) {
        return { weid, cpt, ipfs_hash }
    }

    render() {
        const {classes} = this.props
        const rows = [
            this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
            this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
            this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
            this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
            this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`)
        ]
        return (
            <div>
                <h3 className={classes.title}>用户所有凭证</h3>
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">WeID</TableCell>
                                    <TableCell align="center">CPT</TableCell>
                                    <TableCell align="center">IPFS Hash</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { rows.map(row => (
                                    <TableRow >
                                        <TableCell align="center">{row.weid}</TableCell>
                                        <TableCell align="center">{row.cpt}</TableCell>
                                        <TableCell align="center"><Link>{row.ipfs_hash} </Link></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            </div>
        )
    }
}

const ListCredentialWithStyles = withStyles(useStyles)(ListCredential)

export { ListCredentialWithStyles as ListCredential };