import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { authSelectors } from '../../redux/auth';

interface IProps {
  children: ReactNode;
  redirectTo: string;
}

const PrivateRoute = ({ children, redirectTo = '/login', ...props }: IProps) => {
  const isLogedIn = useSelector(authSelectors.getIsLoggedIn);

  return <Route {...props}>{isLogedIn ? children : <Redirect to={redirectTo} />}</Route>;
};
export default PrivateRoute;
