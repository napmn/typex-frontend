import React from 'react';
import { format } from 'date-fns';

import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Result, User } from '../../shared/types';

type LeaderboardProps = {
  data: (Result & Partial<User>)[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  data
}: LeaderboardProps) => {

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>Leaderboard</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>CPM</TableCell>
              <TableCell>WPM</TableCell>
              <TableCell>Accuracy</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  <Avatar src={row.photoURL!} />
                  {row.displayName}
                </TableCell>
                <TableCell>{row.cpm}</TableCell>
                <TableCell>{row.wpm}</TableCell>
                <TableCell>{row.accuracy}</TableCell>
                <TableCell>{format(Date.parse(row.timestamp.toDate().toString()), 'yyyy MMM dd HH:mm:ss')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
};

export default Leaderboard;
