import { AuthWrapperStyled } from './AuthWrapperStyled';
import Title from '../../common/title/Title';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface IProps {
  title: string;
  redirectMessage: string;
  redirectLinkMessage: string;
  redirectTo: string;
  children: ReactNode;
}

const AuthWrapper = ({
  title = 'Реєстрація',
  redirectMessage = 'Маєте акаунт?',
  redirectLinkMessage = 'Увійти',
  redirectTo = '/login',
  children,
}: IProps) => {
  return (
    <AuthWrapperStyled>
      <Title title={title} />
      {children}
      <p className="underLink">
        {redirectMessage} <Link to={redirectTo}>{redirectLinkMessage}</Link>
      </p>
    </AuthWrapperStyled>
  );
};

export default AuthWrapper;
