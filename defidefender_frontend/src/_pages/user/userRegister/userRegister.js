import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { SignUp } from '../../signup'

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

// 用户注册DID
class UserRegister extends Component {
    render() {
        const {classes} = this.props
        return (
            <div>
                <h3 className={classes.title}>用户注册DID</h3>
                <SignUp />
            </div>
        )
    }
}

const UserRegisterWithStyles = withStyles(useStyles)(UserRegister)

export { UserRegisterWithStyles as UserRegister }