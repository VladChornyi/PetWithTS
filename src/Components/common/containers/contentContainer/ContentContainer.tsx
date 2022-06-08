import IProps from '../types';
import { Container } from './ContentContainerStyled';

const ContentContainer = ({ children }: IProps) => {
  return <Container>{children}</Container>;
};

export default ContentContainer;
