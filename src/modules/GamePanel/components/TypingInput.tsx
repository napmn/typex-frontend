import React, { SetStateAction, useEffect, useState } from 'react';

import Input from '@material-ui/core/Input';

interface TypingInputProps {
  activeToken: string;
  setActiveLetterIndex: React.Dispatch<SetStateAction<number>>;
  jumpToNextWord: () => void;
  setErrorIndex: React.Dispatch<SetStateAction<number>>;
}

const TypingInput: React.FC<TypingInputProps> = ({
  activeToken,
  setActiveLetterIndex,
  jumpToNextWord,
  setErrorIndex
}: TypingInputProps) => {
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
    if (inputValue === activeToken) {
      setInputValue('');
      jumpToNextWord();
    }
  }, [inputValue, activeToken]);

  return (
    <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue}/>
  );
};

export default TypingInput;
