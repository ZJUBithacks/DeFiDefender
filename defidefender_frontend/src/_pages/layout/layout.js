import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import PeopleIcon from '@material-ui/icons/People'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PersonIcon from '@material-ui/icons/Person'
import { ListItemIcon } from '@material-ui/core'
import { Link, Route, withRouter } from 'react-router-dom'
import { HomeContent } from '../homeContent';

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Built by the '}
            <Link color="inherit" href="https://material-ui.com/">
                BEP
      </Link>
            {' team.'}
        </Typography>
    )
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
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
    nested: {
        paddingLeft: theme.spacing(4),
    },
}))


const LayoutWithRouter = withRouter(function Layout(props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)
    const { children, location: { pathname } } = props
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Blob Exchange Platform
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <PersonIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                </div>
                <Divider />
                <MenuList>
                    <MenuItem component={Link} to="/home" selected={'/home' === pathname}>
                        <ListItemIcon>
                            <HomeIcon></HomeIcon>
                        </ListItemIcon>
                        Home
                    </MenuItem>
                    <MenuItem>
                        Requests
                    </MenuItem>
                    <MenuList>
                        <MenuItem className={classes.nested} component={Link} to="/requests/allRequests" selected={'/requests/allRequests' === pathname}>
                            All Requests
                        </MenuItem>
                        <MenuItem className={classes.nested} component={Link} to="/requests/yourRequests" selected={'/requests/yourRequests' === pathname}>
                            Your Requests
                        </MenuItem>
                    </MenuList>
                    <MenuItem>
                        Responses
                    </MenuItem>
                    <MenuList>
                        <MenuItem className={classes.nested} component={Link} to="/responses/yourResponses" selected={'/responses/yourResponses' === pathname}>
                            Your Responses
                        </MenuItem>
                        <MenuItem className={classes.nested} component={Link} to="/responses/receivedResponses" selected={'/responses/receivedResponses' === pathname}>
                            Received Responses
                        </MenuItem>
                    </MenuList>
                    <MenuItem component={Link} to="/records" selected={'/records' === pathname}>
                        Records
                    </MenuItem>
                    <MenuItem component={Link} to="/notifications" selected={'/notifications' === pathname}>
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        Notifications
                    </MenuItem>
                    <MenuItem component={Link} to="/profile" selected={'/profile' === pathname}>
                        <ListItemIcon>
                            <PeopleIcon></PeopleIcon>
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                </MenuList>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
                <MadeWithLove />
            </main>
        </div>
    )
})

export { LayoutWithRouter as Layout }