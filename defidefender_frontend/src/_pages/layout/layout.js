import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PersonIcon from '@material-ui/icons/Person'
import { Link, Route, withRouter } from 'react-router-dom'
import { List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core'

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'All Rights Reserved by '}
            <Link color="inherit" href="https://material-ui.com/">
                UltraGeeks
      </Link>
            {' team.'}
        </Typography>
    )
}

const drawerWidth = 250

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
        width: drawerWidth
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
    const [open, setOpen] = React.useState(false)
    const { children, location: { pathname } } = props

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

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

            <AppBar position="absolute" >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        DeFiDefender Project
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={2} color="secondary">
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
                open={open}
            >
                <List
                    onMouseLeave={toggleDrawer(false)}
                    className={classes.drawerPaper}
                    role="presentation"
                >
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <Typography align="center" variant="h6">
                            政府
                        </Typography>
                    </ListItem>
                    {/* <ListItem component={Link} to="/home" selected={'/home' === pathname} className={classes.nested}>
                        <ListItemText primary={"主页"} />
                    </ListItem> */}
                    <ListItem button component={Link} to="/userInfo" selected={'/userInfo' === pathname} className={classes.nested}>
                        <ListItemText primary={"查看用户信息"} />
                    </ListItem>
                    <ListItem button component={Link} to="/userRegisterInfoList" selected={'/userRegisterInfoList' === pathname} className={classes.nested}>
                        <ListItemText primary={"用户注册审核"} />
                    </ListItem>
                    {/* <ListItem component={Link} to="/listAllCredential" selected={'/listAllCredential' === pathname} className={classes.nested}>
                        <ListItemText primary={"列出所有凭证"} />
                    </ListItem> */}

                    <ListItem button>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <Typography align="center" variant="h6">
                            机构
                        </Typography>
                    </ListItem>

                    <ListItem button component={Link} to="/loanRequestInfoList" selected={'/loanRequestInfoList' === pathname} className={classes.nested}>
                        <ListItemText primary={"借贷请求列表"} />
                    </ListItem>
                    <ListItem button component={Link} to="/blacklist" selected={'/blacklist' === pathname} className={classes.nested}>
                        <ListItemText primary={"黑名单"} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <Typography align="center" variant="h6">
                            用户
                        </Typography>
                    </ListItem>
                    {/* <ListItem component={Link} to="/userRegister" selected={'/userRegister' === pathname} className={classes.nested}>
                        <ListItemText primary={"注册"}/>
                    </ListItem> */}

                    <ListItem button component={Link} to="/listCredential" selected={'/listCredential' === pathname} className={classes.nested}>
                        <ListItemText primary={"查看凭证"} />
                    </ListItem>
                    {/* <ListItem component={Link} to="/requestCredential" selected={'/requestCredential' === pathname} className={classes.nested}>
                        <ListItemText primary={"生成凭证"} />
                    </ListItem> */}
                    <ListItem button component={Link} to="/loanRequest" selected={'/loanRequest' === pathname} className={classes.nested}>
                        <ListItemText primary={"借贷"} />
                    </ListItem>

                </List>
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