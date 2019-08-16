import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import JSONTree from 'react-json-tree';
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
        maxWidth: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
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
});

var openCredential = false

// 列出所有凭证
class ListCredential extends Component {
    createData(weid, cpt, ipfs_hash) {
        return { weid, cpt, ipfs_hash }
    }

    constructor(props) {
        super(props)
        this.state = {
            openCredential: false
        }
    }

    getModalStyle() {
        const top = 30
        const left = 35

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        }
    }

    handleOpenCredential = () => {
        this.setState({openCredential:true})
    }

    handleCloseCredential = () => {
        this.setState({openCredential:false})
    }

    render() {

        const modalStyle = this.getModalStyle()
        const { classes } = this.props
        const faces = [
            "http://i.pravatar.cc/300?img=1",
            "http://i.pravatar.cc/300?img=2",
            "http://i.pravatar.cc/300?img=3",
            "http://i.pravatar.cc/300?img=4"
        ];
        const rows = [
            this.createData(`0xc83b2cf7d31acc2abc`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
            this.createData(`0xc83b2cf7665acc2def`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
            this.createData(`0xc83b2cf763165acadf`, 'cpt_name', `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`),
        ]
        const images = [
            "https://cdn.dribbble.com/users/42659/screenshots/6988457/aquila_logo_4x.png",
            "https://cdn.dribbble.com/users/74401/screenshots/6990193/ivory.png",
            "https://cdn.dribbble.com/users/14059/screenshots/6989899/laceemup.jpg",
        ]
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
                "expirationDate": "到期日期20250814"
            },
            {
                "cptId": "CPT ID: 2000002",
                "issuer": "颁发者: did:weid:1:0x8dc34e4...23f3bbe7",
                "issuanceDate": "发行日期：20190814",
                "expirationDate": "到期日期：20250814"
            }
        ]

        const credential = {
            "context": "https://github.com/WeBankFinTech/WeIdentity/blob/master/context/v1",
            "id": "ec0f4586-ebac-4948-b5a8-59bb4b9205f2",
            "cptId": 2000000,
            "issuer": "did:weid:1:0x8dc34e4cad4d86f5f20f5b63d96230f759f3bbe7",
            "issuanceDate": 1565807327,
            "expirationDate": 1565857393,
            "claim": {
                "birthday": "1995-05-09",
                "address": "浙江省",
                "gender": "M",
                "identityNumber": "666",
                "name": "Sher"
            },
            "proof": {
                "creator": "did:weid:1:0x8dc34e4cad4d86f5f20f5b63d96230f759f3bbe7",
                "salt": {
                    "birthday": "02GNQ",
                    "address": "kuoIq",
                    "gender": "CQARI",
                    "identityNumber": "LGvHg",
                    "name": "nT03w"
                },
                "created": 1565807327,
                "type": "EcdsaSignature",
                "signatureValue": "G7Sp86csiH062ZljFWWHklioeNz7gpFqWBZn72xOGm9iAuPhATD1wlvXgZyL4b6ZW+w3ifpZv8agn7dN9cTn+8Y="
            },
            "type": [
                "VerifiableCredential"
            ],
            "signature": "G7Sp86csiH062ZljFWWHklioeNz7gpFqWBZn72xOGm9iAuPhATD1wlvXgZyL4b6ZW+w3ifpZv8agn7dN9cTn+8Y=",
            "salt": {
                "birthday": "02GNQ",
                "address": "kuoIq",
                "gender": "CQARI",
                "identityNumber": "LGvHg",
                "name": "nT03w"
            },
            "proofType": "EcdsaSignature"
        }

        return (
            <div>
                <h3 className={classes.title}>用户凭证</h3>
                <Grid container className={classes.root} spacing={2}>
                    {
                        rows.map((row, i) => (
                            <Grid item xs={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image={
                                            images[i]
                                        }
                                    />
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
                                            {cardDetails[i].cptId} <br />
                                            {cardDetails[i].issuer} <br />
                                            {cardDetails[i].issuanceDate}<br />
                                            {cardDetails[i].expirationDate}
                                        </Typography>
                                        <Divider className={classes.divider} light />
                                        <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleOpenCredential}>
                                            查看凭证
                                                </Button>
                                        <Modal
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                            open={this.state.openCredential}
                                            onClose={this.handleCloseCredential}
                                        >
                                            <div style={modalStyle} className={classes.modalPaper}>
                                                <JSONTree
                                                    data={credential}
                                                    theme={jsonTheme}
                                                    shouldExpandNode={() => {
                                                        return false;
                                                    }}
                                                />
                                            </div>
                                        </Modal>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        )
    }
}

const ListCredentialWithStyles = withStyles(useStyles)(ListCredential)

export { ListCredentialWithStyles as ListCredential };