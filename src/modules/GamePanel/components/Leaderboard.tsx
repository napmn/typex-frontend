import React from 'react';
import { format } from 'date-fns';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Result, User } from '../../shared/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: '10px'
  }
}));

type LeaderboardProps = {
  data: (Result & Partial<User>)[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  data
}: LeaderboardProps) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" color="textSecondary" align="center" gutterBottom>Leaderboard</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">CPM</TableCell>
              <TableCell align="right">WPM</TableCell>
              <TableCell align="right">Accuracy</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  <Grid container>
                    <Avatar className={classes.avatar} src={row.photoURL!}/>
                    <span>{row.displayName}</span>
                  </Grid>
                </TableCell>
                <TableCell align="right">{row.cpm}</TableCell>
                <TableCell align="right">{row.wpm}</TableCell>
                <TableCell align="right">{row.accuracy}</TableCell>
                <TableCell align="right">{format(Date.parse(row.timestamp.toDate().toString()), 'yyyy MMM dd HH:mm:ss')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
};

export default Leaderboard;
