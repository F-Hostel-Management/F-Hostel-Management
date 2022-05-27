import * as React from 'react';
import * as Styled from './styles';

interface ILoadingProps {
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  return (
      <Styled.Container>
         <Styled.Letter delay={1.25}>F</Styled.Letter>
         <Styled.Letter delay={2.5}>-</Styled.Letter>
         <Styled.Letter delay={3.75}>H</Styled.Letter>
         <Styled.Letter delay={5}>O</Styled.Letter>
         <Styled.Letter delay={6.25}>S</Styled.Letter>
         <Styled.Letter delay={7.5}>T</Styled.Letter>
         <Styled.Letter delay={8.75}>E</Styled.Letter>
         <Styled.Letter delay={10}>L</Styled.Letter>
      </Styled.Container>
  );
};

export default Loading;
