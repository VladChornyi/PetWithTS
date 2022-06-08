import { TitleStyled } from './TitleStyled';

interface IProps {
  title: string;
}

const Title = ({ title }: IProps) => {
  return <TitleStyled>{title}</TitleStyled>;
};

export default Title;
