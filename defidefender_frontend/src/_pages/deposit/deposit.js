/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Title } from '../title';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export function Deposits() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Balance</Title>
            <Typography component="p" variant="h4">
                $666.00
      </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                Recent reward on 15 March, 2019
      </Typography>
            <div>
                <Link color="primary" href="javascript:;">
                    View records
        </Link>
            </div>
        </React.Fragment>
    );
}
