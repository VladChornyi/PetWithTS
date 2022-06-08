import IProps from '../types';
import { Container } from './ContainerStyled';

const MainContainer = ({ children }: IProps) => {
  return <Container>{children}</Container>;
};

export default MainContainer;
