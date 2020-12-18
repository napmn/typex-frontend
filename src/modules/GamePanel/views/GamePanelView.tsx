import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';

import { TextBoard, TypingInput } from '../components';
import { TGameType } from '../../shared/types';
import { getTextByGameVariation } from '../../shared/services';


type GamePanelViewProps = {
  gameType: TGameType;
}

const GamePanelView: React.FC<GamePanelViewProps> = ({
  gameType
}: GamePanelViewProps) => {
  const [ isFinished, setIsFinished ] = useState<boolean>(false);

  // Hooks for text partitioning
  const [ text, setText ] = useState<string>();
  const [ activeToken, setActiveToken ] = useState<string>('');
  const [ finishedTokens, setFinishedTokens ] = useState<Array<string>>([]);
  const [ activeLetterIndex, setActiveLetterIndex ] = useState<number>(0);
  const [ remainingTokens, setRemainingTokens ] = useState<Array<string>>([]);

  // Errors hooks
  const [ errorIndex, setErrorIndex ] = useState<number>(-1);
  const [ errorsNumber, setErrorsNumber ] = useState<number>(0);

  // CPM / WPM hooks
  const [ typedCharactersNumber, setTypedCharactersNumber ] = useState<number>(0);
  const [ typingStartTime ] = useState<Date>(new Date()); // TODO: setTypingStartTime
  const [ cpm, setCpm ] = useState<number>(0);
  const [ accuracy, setAccuracy ] = useState<number>(100);

  useEffect(() => {
    setText(getTextByGameVariation(gameType.name));
  }, []);

  useEffect(() => {
    // set up tokens on text change
    if (!text) return;
    let tokens = text.replace(/\s+/g, ' ').trim().split(' ');
    tokens = tokens.map(
      (token, index) => index === tokens.length - 1 ? token : `${token} `
    );
    setActiveToken(tokens[0]);
    tokens.splice(0, 1);
    setRemainingTokens(tokens);
  }, [text]);

  useEffect(() => {
    // logic when the typing is finished
    if (isFinished === true) {
      console.log('FINISHED');
      setAccuracy(calculateAccuracy());
    }
  }, [isFinished]);

  useEffect(() => {
    setActiveLetterIndex(0);
  }, [activeToken]);

  useEffect(() => {
    setCpm(calculateCpm());
  }, [typedCharactersNumber]);

  useEffect(() => {
    if (errorIndex !== -1) {
      // error was made -> increasing counter
      setErrorsNumber(n => n + 1);
    }
  }, [errorIndex]);

  const calculateCpm = (): number => {
    const now = new Date();
    const res = now.getTime() - typingStartTime.getTime();
    return typedCharactersNumber / (res / 1000 / 60);
  };

  const calculateAccuracy = (): number => {
    return (text!.length - errorsNumber) / text!.length * 100;
  };

  const jumpToNextWord = () => {
    // move one word forward
    setFinishedTokens(tokens => {
      return [...tokens, activeToken];
    });
    setRemainingTokens(tokens => {
      return tokens.slice(1);
    });
    setTypedCharactersNumber(n => n + activeToken.length);
    if (remainingTokens.length > 0) {
      setActiveToken(remainingTokens[0]);
    } else {
      setActiveToken("");
      setIsFinished(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <TextBoard
        finishedTokens={finishedTokens}
        activeToken={activeToken}
        activeLetterIndex={activeLetterIndex}
        remainingTokens={remainingTokens}
        errorIndex={errorIndex}
      />
      <TypingInput
        activeToken={activeToken}
        setActiveLetterIndex={setActiveLetterIndex}
        jumpToNextWord={jumpToNextWord}
        errorIndex={errorIndex}
        setErrorIndex={setErrorIndex}
      />
      <div>CPM: {cpm.toFixed(0)}</div>
      <div>WPM: {(cpm / 5).toFixed(0)}</div>
      <div>Accuracy: {accuracy.toFixed(2)}%</div>
    </Container>
  );
};

export default GamePanelView;
