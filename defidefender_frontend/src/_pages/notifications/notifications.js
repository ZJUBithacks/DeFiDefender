import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green,blue } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: blue[300],
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}))

function MySnackbarContentWrapper(props) {
    const classes = useStyles1()
    const { className, message, onClose, variant, ...other } = props
    const Icon = variantIcon[variant]

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    )
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
}

const useStyles2 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}))

export function NotificationsContent() {
    const classes = useStyles2()

    return (
        <Container>
            <MySnackbarContentWrapper
                variant="success"
                className={classes.margin}
                message="Your response:Response_001 of request:Request_001 has been accepted on 2019-08-04 12:00:00, you got a reward of $5"
            />
            <MySnackbarContentWrapper
                variant="info"
                className={classes.margin}
                message="There is a new request on 2019-08-01 12:00:00"
            />
            <MySnackbarContentWrapper
                variant="info"
                className={classes.margin}
                message="There is a new request on 2019-08-02 12:00:00"
            />
            <MySnackbarContentWrapper
                variant="info"
                className={classes.margin}
                message="There is a new request on 2019-08-03 12:00:00"
            />
            <MySnackbarContentWrapper
                variant="info"
                className={classes.margin}
                message="There is a new request on 2019-08-04 12:00:00"
            />
        </Container>
    )
}