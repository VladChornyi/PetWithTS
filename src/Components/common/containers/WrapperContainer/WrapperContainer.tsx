import IProps from '../types';
import { Wrapper } from './WrapperContainerStyled';

const WrapperContainer = ({ children }: IProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default WrapperContainer;
