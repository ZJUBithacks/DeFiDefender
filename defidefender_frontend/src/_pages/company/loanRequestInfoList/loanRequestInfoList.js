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

// 个人借贷请求列表
class LoanRequestInfoList extends Component {
    // ipfs_hash可直接跳转到IPFS上显示
    createData(weid, ipfs_hash, amount, expired_date, in_blacklist) {
        return { weid, ipfs_hash, amount, expired_date, in_blacklist }
    }
    render() {
        const rows = [
            this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`, `1000`, '1995-07-01', `yes`),
            this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`, `2000`, '1993-07-01', `yes`),
            this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`, `10000`, '1995-07-01', `no`),
            this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`, `4000`, '1993-01-13', `yes`),
            this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`, `8000`, '1993-07-01', `no`)
        ]
        const { classes } = this.props

        return (
            <div>
                <h3 className={classes.title}>个人借贷请求列表</h3>
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">WeID</TableCell>
                                    <TableCell align="center">IPFS Hash</TableCell>
                                    <TableCell align="center">借款金额</TableCell>
                                    <TableCell align="center">到期时间</TableCell>
                                    <TableCell align="center">违约</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow >
                                        <TableCell align="center">{row.weid}</TableCell>
                                        <TableCell align="center">{row.ipfs_hash} </TableCell>
                                        <TableCell align="center">{row.amount} </TableCell>
                                        <TableCell align="center">{row.expired_date}</TableCell>
                                        <TableCell align="center">{row.in_blacklist}</TableCell>
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

const LoanRequestInfoListWithStyles = withStyles(useStyles)(LoanRequestInfoList)

export { LoanRequestInfoListWithStyles as LoanRequestInfoList };