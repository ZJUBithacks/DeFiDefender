import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import CircularProgress from '@material-ui/core/CircularProgress'
import JSONTree from 'react-json-tree';
import jsonTheme from '../jsonResult'

const useStyles = makeStyles(theme => ({
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
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(2),
    },
    rightIcon: {
        marginLeft: theme.spacing(1.5),
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    modalPaper: {
        position: 'relative',
        width: 1000,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 5, 5),
    },
    table: {
        minWidth: 650,
        width: '100%',
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

function getModalStyle() {
    const top = 30
    const left = 35

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}


// 个人借贷请求列表
function LoanRequestInfoList(props) {
    const [modalStyle] = React.useState(getModalStyle)
    const [open, setOpen] = React.useState(false)
    const [showRecords, setShowRecords] = React.useState(true)
    const [showMultiLoan, setShowMultiLoan] = React.useState(true)
    const [confirm, setConfirm] = React.useState(true)
    const [checkReal, setCheckReal] = React.useState(true)
    const [ready, setReady] = React.useState(true)
    const [openCredential, setOpenCredential] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenCredential = () => {
        setOpenCredential(true)
    }

    const handleCloseCredential = () => {
        setOpenCredential(false)
    }

    const handleShowRecords = () => {
        setShowRecords(false)
    }

    const handleShowMultiLoan = () => {
        setShowMultiLoan(false)
    }

    const handleConfirm = () => {
        setConfirm(false)
    }

    const handleCheckReal = () => {
        setCheckReal(false)
    }

    const handleSetReady = () => {
        setReady(false)
    }


    const oppo = (flag) => {
        console.log("123")
        console.log(flag)
        flag = !flag
    }

    // ipfs_hash可直接跳转到IPFS上显示
    const createData = (weid, hash, flag) => {
        return { weid, hash, flag }
    }

    const rows = [
        createData(`0xc83b2cf766d3165acc2fc916`, `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`, false),
        createData(`0xc83b2cf766d3165acc2fc916`, `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`, false),
        createData(`0xc83b2cf766d3165acc2fc916`, `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`, false),
        createData(`0xc83b2cf766d3165acc2fc916`, `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`, false),
        createData(`0xc83b2cf766d3165acc2fc916`, `QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr`, false)
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
            "address": "0x90b61546a7923d6bb41265af977d5ced73829424ddb171fc65b3b95390ed6caf",
            "gender": "M",
            "identityNumber": "0xf4ac3af7ec165fc3809dc01b00d16a731184415df69591df249be4e884460415",
            "name": "0x6c057d6817d7bc97cdf9194593eb957a278a145722f2a243a1035fcba68565f3"
        },
        "proof": {
            "creator": "did:weid:1:0x8dc34e4cad4d86f5f20f5b63d96230f759f3bbe7",
            "salt": {
                "birthday": "02GNQ",
                "address": "0",
                "gender": "CQARI",
                "identityNumber": "0",
                "name": "0"
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
            "address": "0",
            "gender": "CQARI",
            "identityNumber": "0",
            "name": "0"
        },
        "proofType": "EcdsaSignature"
    }

    const classes = useStyles()
    return (
        <div>
            <h3 className={classes.title}>借贷请求列表</h3>
            <Container maxWidth="lg" className={classes.container}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">WeID</TableCell>
                                <TableCell align="center">借贷金额</TableCell>
                                <TableCell align="center">凭证</TableCell>
                                <TableCell align="center">多头借贷数据情况</TableCell>
                                <TableCell align="center">借贷信用不良记录</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">{"did:weid:1:0xcb8e785c9370665b4712d611126080cf10a362f1"}</TableCell>
                                <TableCell align="center">10000</TableCell>
                                <TableCell align="center">
                                    {checkReal === true ? <Button variant="contained" color="primary" className={classes.button} onClick={handleCheckReal} >
                                        验证凭证真实性
                                    </Button> :
                                        ready === true ?
                                            <CircularProgress className={classes.progress} onClick={handleSetReady} />
                                            :
                                            <div>
                                                <Button variant="outlined" color="primary" className={classes.button} onClick={handleOpenCredential}>
                                                    查看凭证
                                                </Button>
                                                <Modal
                                                    aria-labelledby="simple-modal-title"
                                                    aria-describedby="simple-modal-description"
                                                    open={openCredential}
                                                    onClose={handleCloseCredential}
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

                                            </div>
                                    }

                                </TableCell>
                                <TableCell align="center">
                                    {showMultiLoan === true ?
                                        <Button variant="outlined" color="primary" className={classes.button} onClick={handleShowMultiLoan}>查询多方投资借贷数据</Button>
                                        :
                                        <div>
                                            已借平台: 0个<br></br>已借金额: 0万
                                        </div>

                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {showRecords === true ? <Button variant="outlined" color="primary" className={classes.button} onClick={handleShowRecords}>
                                        查询借贷不良信用记录
                                    </Button> : <Typography color="primary" variant="h6">无</Typography>}
                                </TableCell>
                                <TableCell align="center">
                                    {confirm === true ? <div>
                                        <Button variant="outlined" color="primary" className={classes.button} onClick={handleConfirm}>
                                            允许
                                    </Button>
                                        <Button variant="outlined" color="secondary" className={classes.button} >
                                            拒绝
                                    </Button>
                                    </div> : <Typography color="primary" variant="h6">已允许</Typography>}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell align="center">{"did:weid:1:0x8dc34e4cad4d86f5f20f5b63d96230f759f3bbe7"}</TableCell>
                                <TableCell align="center">200000</TableCell>
                                <TableCell align="center">
                                    <Typography color="secondary" variant="h6">非法凭证</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <div>已借平台: 3个<br></br>已借金额: 4万</div>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" color="primary" className={classes.button} onClick={handleOpen}>
                                        查询借贷不良信用记录
                                    </Button>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <div style={modalStyle} className={classes.modalPaper}>
                                            <Table className={classes.table}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">WeID</TableCell>
                                                        <TableCell align="center">违约记录</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell align="center">did:weid:1:0x8dc34e4cad4d86f5f20f5b63d96230f759f3bbe7</TableCell>
                                                        <TableCell align="center">应该于2019年7月3日还款3万元，但逾期未还</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </Modal>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography color="secondary" variant="h6">已拒绝</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </div>
    )

}

const LoanRequestInfoListWithStyles = withStyles(useStyles)(LoanRequestInfoList)

export { LoanRequestInfoListWithStyles as LoanRequestInfoList }