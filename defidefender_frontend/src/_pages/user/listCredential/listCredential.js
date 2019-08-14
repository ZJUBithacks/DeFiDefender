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
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
      },
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
    card: {
        maxWidth: 275,
        minHeight: 180
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
            this.createData(`0xc83b2cf766d3165acc2abc`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
            this.createData(`0xc83b2cf766d3165acc2def`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
            this.createData(`0xc83b2cf766d3165acc2adf8defd1b`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
            this.createData(`0xc83b2cf766d3165acc2dfb9164641380088defd1b`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
            this.createData(`0xc83b2cf766d3165acc2f`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`)
        ]
        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    {rows.map(row => (
                        <Card className={classes.card}>
                            <CardContent>
                                WeID:{row.weid}
                            </CardContent>
                            <CardActions>
                                <Button size="small">查看详细信息</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        )
    }
}

const ListCredentialWithStyles = withStyles(useStyles)(ListCredential)

export { ListCredentialWithStyles as ListCredential };