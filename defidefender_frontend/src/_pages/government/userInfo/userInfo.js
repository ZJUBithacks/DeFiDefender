import React, { Component } from 'react';
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

class UserInfo extends Component {

    createData(name, gender, birthday, address, id_image) {
        return { name, gender, birthday, address, id_image }
    }
    
    render() {
        const rows = [
            this.createData(`高天尧`, '男', '1995-07-01', '杭州', '001'),
            this.createData(`李其柄`, '男', '1993-07-01', '杭州', '002'),
            this.createData(`林泽培`, '男', '1995-07-01', '杭州', '003'),
            this.createData(`王兵`, '男', '1993-01-13', '杭州', '004'),
            this.createData(`应昊`, '男', '1993-07-01', '杭州', '005')
        ]

        const{ classes } = this.props
        return (
            <div>
                <h2 className={classes.userInfo}>用户信息</h2> 
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">姓名</TableCell>
                                    <TableCell align="center">性别</TableCell>
                                    <TableCell align="center">生日</TableCell>
                                    <TableCell align="center">户籍</TableCell>
                                    <TableCell align="center">身份证</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { rows.map(row => (
                                    <TableRow >
                                        <TableCell align="center">{row.name} </TableCell>
                                        <TableCell align="center">{row.gender}</TableCell>
                                        <TableCell align="center">{row.birthday}</TableCell>
                                        <TableCell align="center">{row.address}</TableCell>
                                        <TableCell align="center">{row.id_image}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            </div> 
        );
    }
}

const UserInfoWithStyles = withStyles(useStyles)(UserInfo)

export {UserInfoWithStyles as UserInfo};
