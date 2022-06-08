import IProps from '../types';
import { Container } from './NavContainerStyled';

const NavContainer = ({ children }: IProps) => {
  return <Container>{children}</Container>;
};

export default NavContainer;
