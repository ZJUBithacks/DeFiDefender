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
})

class UserInfo extends Component {

    createData(weid, name, gender, birthday, address, id_image) {
        return { weid, name, gender, birthday, address, id_image }
    }
    
    render() {
        const rows = [
            this.createData(`did:weid:1:0xcb8e785c9370665b4712d611126080cf10a362f1`, `高天尧`, '男', '1995-07-01', '杭州', '001'),
            this.createData(`did:weid:1:0x703968c09ae967ae052f52c13d58ded42d0efab9`, `李其柄`, '男', '1993-07-01', '杭州', '002'),
            this.createData(`did:weid:1:0x210d26636c5384b9399a2540f5d8a14ff5ed030d`, `林泽培`, '男', '1995-07-01', '杭州', '003'),
            this.createData(`did:weid:1:0x8d6f2da910b3d367ac53013f7d7eb40ef71fa3c6`, `王兵`, '男', '1993-01-13', '杭州', '004'),
            this.createData(`did:weid:1:0x6b7bdb92f9a1a2dec084e35e89a936118e1e18e2`, `应昊`, '男', '1993-07-01', '杭州', '005')
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
                                    <TableCell align="center">WeID</TableCell>
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
                                        <TableCell align="center">{row.weid}</TableCell>
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
        
        )
    }
}

const UserInfoWithStyles = withStyles(useStyles)(UserInfo)

export {UserInfoWithStyles as UserInfo}
