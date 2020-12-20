import React, { ReactNode } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { useLoaderContext } from '../../shared/hooks';

const useStyles = makeStyles({
  loader: {
    position: 'absolute',
    top: '30%',
    left: 'calc(50% - 50px)'
  }
});

const LoadingWrapper: React.FC = ({
  children
}: { children?: ReactNode}) => { // TODO: ugly but getting error otherwise
  const classes = useStyles();
  const { isLoading } = useLoaderContext();

  return (
    <>
      {isLoading && <CircularProgress className={classes.loader} size={100}/>}
      {children}
    </>
  );
};

export default LoadingWrapper;
