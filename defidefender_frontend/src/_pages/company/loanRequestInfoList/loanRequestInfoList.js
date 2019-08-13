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
    userInfo: {
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

class LoanRequestInfoList extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

const LoanRequestInfoListWithStyles = withStyles(useStyles)(LoanRequestInfoList)

export { LoanRequestInfoListWithStyles as LoanRequestInfoList };