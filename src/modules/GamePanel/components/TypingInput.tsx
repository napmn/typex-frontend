import React, { SetStateAction, useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  input: {
    fontSize: '24px'
  },
  textField: {
    marginTop: '80px'
  }
});

interface TypingInputProps {
  activeToken: string;
  setActiveLetterIndex: React.Dispatch<SetStateAction<number>>;
  jumpToNextWord: () => void;
  errorIndex: number;
  setErrorIndex: React.Dispatch<SetStateAction<number>>;
}

const TypingInput: React.FC<TypingInputProps> = ({
  activeToken,
  setActiveLetterIndex,
  jumpToNextWord,
  errorIndex,
  setErrorIndex
}: TypingInputProps) => {
  const classes = useStyles();
  const [inputValue, setInputValue ] = useState('');

  useEffect(() => {
    setErrorIndex(index => {
      const match = inputValue === activeToken.substring(0, inputValue.length);
      if (index === -1 && !match) {
        // start of error section
        return inputValue.length - 1;
      } else if (index !== -1 && match) {
        // errors corrected
        return -1;
      } else {
        // still in error
        return index;
      }
    });
    setActiveLetterIndex(inputValue.length);
    if (inputValue === activeToken && activeToken !== '') {
      setInputValue('');
      jumpToNextWord();
    }
  }, [inputValue, activeToken]);

  return (
    <TextField
      className={classes.textField}
      InputProps={{
        classes: {
          input: classes.input,
        },
        autoFocus: true
      }}
      onChange={(e) => setInputValue(e.target.value)} value={inputValue}
      fullWidth
      autoFocus
      error={errorIndex !== -1}
      placeholder="Type here..."
    />
  );
};

export default TypingInput;
