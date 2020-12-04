import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minHeight: '200px'
  }
});

const TextBoard: React.FC = () => {
  const classes = useStyles();
  const text = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Proin dignissim diam ac lorem volutpat, placerat posuere augue aliquam.
  Praesent pharetra justo in nunc pretium, vel malesuada ante congue.
  Mauris vulputate libero ac justo porta malesuada. Ut vel ipsum sit amet
  nisi elementum finibus sed ac erat. Vestibulum vel sagittis dolor.
  `;

  return (
    <Card className={classes.card}>
      <Typography>{text}</Typography>
    </Card>
  );
};

export default TextBoard;
