import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'


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
})

// 查看黑名单
class Blacklist extends Component {
    // 返回DID和违约记录
    createData(weid, violate_record) {
        return { weid, violate_record}
    }
    constructor(props){
        super(props)
        // this.state = store.getState().company[0].blacklist
    }

    render() {
        // this.createData(`0xc83b2cf766d3165acc2fc9164641380088defd1b`, "xx于xx年xx月xx日未还款金额xx元"),
        const rows = []

        // alert(this.props.blacklist[0].weid)

        this.props.blacklist.map((item, i) => {
            rows.push(this.createData(item.weid, item.description))
        })

        const { classes } = this.props
        return (
            <div>
                <h3 className={classes.title}>查看黑名单</h3>
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">WeID</TableCell>
                                    <TableCell align="center">违约记录</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow >
                                        <TableCell align="center">{row.weid}</TableCell>
                                        <TableCell align="center">{row.violate_record} </TableCell>
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

const BlacklistWithStyles = withStyles(useStyles)(Blacklist)

export { BlacklistWithStyles as Blacklist }