import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { authSelectors } from '../../redux/auth';

interface IProps {
  children: ReactNode;
  redirectTo?: string;
  path: string;
  exact: boolean;
}

const PrivateRoute = ({ children, redirectTo = '/login', path, exact, ...props }: IProps) => {
  const isLogedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Route {...props} exact={exact} path={path}>
      {isLogedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
};
export default PrivateRoute;
