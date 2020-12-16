import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';

import { TextBoard, TypingInput } from '../components';

const text = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Proin dignissim diam ac lorem volutpat, placerat posuere augue aliquam.
    Praesent pharetra justo in nunc pretium, vel malesuada ante congue.
    Mauris vulputate libero ac justo porta malesuada. Ut vel ipsum sit amet
    nisi elementum finibus sed ac erat. Vestibulum vel sagittis dolor.
    `;

const GamePanelView: React.FC = () => {
  const [ activeToken, setActiveToken ] = useState<string>('');
  const [ finishedTokens, setFinishedTokens ] = useState<Array<string>>([]);
  const [ activeLetterIndex, setActiveLetterIndex ] = useState<number>(0);
  const [ remainingTokens, setRemainingTokens ] = useState<Array<string>>([]);
  const [ errorIndex, setErrorIndex ] = useState<number>(-1);

  useEffect(() => {
    let tokens = text.replace(/\s+/g, ' ').trim().split(' ');
    tokens = tokens.map(
      (token, index) => index === tokens.length + 1 ? token : `${token} `
    );
    setActiveToken(tokens[0]);
    tokens.splice(0, 1);
    setRemainingTokens(tokens);
  }, []); // TODO: dependency text

  useEffect(() => {
    setActiveLetterIndex(0);
  }, [activeToken]);

  const jumpToNextWord = () => {
    if (remainingTokens.length > 0) {
      // move one word forward
      setFinishedTokens(tokens => {
        return [...tokens, activeToken];
      });
      // if it's not the last token add space to it
      setActiveToken(remainingTokens[0]);
      setRemainingTokens(tokens => {
        return tokens.slice(1);
      });
    } else {
      // TODO: whole text is finished
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
        setErrorIndex={setErrorIndex}
      />
    </Container>
  );
};

export default GamePanelView;
