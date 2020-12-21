import React, { useEffect, useState } from 'react';
// import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

import { useLoggedInUser } from '../hooks';
import { firebaseService } from '../services';

type UsernameDialogProps = {
  open: boolean;
  onClose: () => void;
}

const UsernameDialog: React.FC<UsernameDialogProps> = ({
  open,
  onClose
}: UsernameDialogProps) => {
  const [ username, setUsername ] = useState<string>('');
  const [ error, setError ] = useState<boolean>(false);

  const { user } = useLoggedInUser();

  useEffect(() => {
    if (username === '') {
      setError(false);
      return;
    }
    setError(!(/^[\w\d]+$/.test(username) && username.length > 3 && username.length < 21));
  }, [username]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    user?.updateProfile({ displayName: username }).then(() => {
      firebaseService.updateUser(user.uid, { displayName: username });
      // TODO: success alert
    }).catch(error => {
      console.error(error);
      // TODO: error alert
    }).finally(() => onClose());
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Username</DialogTitle>
        <DialogContent>
          {/* TODO: check if every provider has name? */}
          <DialogContentText>
            Enter an username you want to use. If you don&apos;t choose
            username, your name or email will be used.
          </DialogContentText>
          <TextField
            error={error}
            helperText="Username has to be between 4 - 20 characters long and consist of alphanumeric characters"
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setUsername(e.currentTarget.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — <strong>check it out!</strong>
      </Alert> */}
    </>
  );
};

export default UsernameDialog;
