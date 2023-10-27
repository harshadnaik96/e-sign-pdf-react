import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks";

/**
 * A wrapper around the element which checks if user is authenticated.
 * If user is authenticated , renders the element.
 * Else redirects & renders LoginPage
 */

/**
 * This Wrapper is made to be used in pages where all types of user can have
  access despite what role they have.
 */
type IProps = {
  children: JSX.Element;
};

export const AuthRoute = (props: IProps): JSX.Element => {
  const { children } = props;
  const auth = useAuth();
  let location = useLocation();

  if (!auth.isLoggedIn && auth.fetched) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return <>{children}</>;
};
