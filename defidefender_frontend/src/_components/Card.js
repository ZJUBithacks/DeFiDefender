import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import JSONTree from 'react-json-tree'
import jsonTheme from '../../company/jsonResult'
import Modal from '@material-ui/core/Modal'


const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        textAlign: 'center'
    },
    cardContent: {
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
    card: {
        maxWidth: 330,
        maxHeight: 210,
        borderRadius: 10,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: theme.spacing.unit * 3
    },
    divider: {
        margin: `${theme.spacing.unit * 3}px 0`
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: -theme.spacing.unit
        }
    },
    modalPaper: {
        position: 'relative',
        width: 1000,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 5, 5),
    },
})

function Card(props) {
    const classes = useStyles()
    const cardDetails = [
        {
            "cptId": "CPT ID: 2000000",
            "issuer": "颁发者: did:weid:1:0x8dc34e4...23f3bbe7",
            "issuanceDate": "发行日期：20190814",
            "expirationDate": "到期日期：20250814"
        },
        {
            "cptId": "CPT ID:2000001",
            "issuer": "颁发者: did:weid:1:0x8dc34e4...23f3bbe7",
            "issuanceDate": "发行日期：20190814",
            "expirationDate": "到期日期：20250814"
        },
        {
            "cptId": "CPT ID: 2000002",
            "issuer": "颁发者: did:weid:1:0x8dc34e4...23f3bbe7",
            "issuanceDate": "发行日期：20190814",
            "expirationDate": "到期日期：20250814"
        }
    ]

    return (
        <div>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography
                            className={classes.cardContent}
                            variant={"h6"}
                            gutterBottom
                        >
                            {"ID:" + row.weid}
                        </Typography>
                        <Typography
                            className={classes.cardContent}
                            variant={"caption"}
                        >
                            {cardDetails[0].cptId} <br />
                            {cardDetails[0].issuer} <br />
                            {cardDetails[0].issuanceDate}<br />
                            {cardDetails[0].expirationDate}
                        </Typography>
                        <Divider className={classes.divider} light />
                        <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleOpenCredential}>
                            查看凭证
                                </Button>
                    </CardContent>
                </Card>
        </div>
    )
}

const CardWithStyles = withStyles(useStyles)(Card)

export { CardWithStyles as CardClass }