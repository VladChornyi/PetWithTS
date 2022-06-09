import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { authSelectors } from '../../redux/auth';

interface IProps {
  children: ReactNode;
  restricted: boolean;
  path: string;
  exact: boolean;
}

const PublicRoute = ({ children, restricted = false, exact, path, ...props }: IProps) => {
  const isLogedIn = useSelector(authSelectors.getIsLoggedIn);
  const shouldRedirect = isLogedIn && restricted;
  return (
    <Route {...props} path={path} exact={exact}>
      {shouldRedirect ? <Redirect to="/" /> : children}
    </Route>
  );
};

export default PublicRoute;
