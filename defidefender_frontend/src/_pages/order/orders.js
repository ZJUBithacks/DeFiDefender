/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Title } from '../title';

// Generate Order Data
function createData(id, date, requestId, responseId, amount) {
  return { id, date, requestId, responseId, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'd9f44bf8-8b5a-4053-bac6-c1ffc5bc188d', '109c972b-3f06-4e42-97c2-979f56aa4468', 312.44),
  createData(1, '16 Mar, 2019', '9547d58b-e414-490f-bf0f-27f1ed2a4d58', '2746ee05-19ad-4f18-a708-c93a31fc2e91', 866.99),
  createData(2, '16 Mar, 2019', '01b25001-5713-4384-ae93-58af39a5a9b3', '5b4ad39d-75bb-40b6-bd16-b0520565905c', 100.81),
  createData(3, '16 Mar, 2019', 'e90da3b3-d38e-4221-a420-dfea3dd25f4b', 'af5507bc-fa4a-4779-ae67-8a0253a15d3c', 654.39),
  createData(4, '15 Mar, 2019', '9ebc0469-8a34-49eb-b5ee-7860de871a4f', '31b7f16d-3d5e-484a-8020-9e76a2c41f8b', 212.79),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>RequestId</TableCell>
            <TableCell>ResponseId</TableCell>
            <TableCell align="right">Reward Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.requestId}</TableCell>
              <TableCell>{row.responseId}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
