import React from "react";
import { useUserAuthProvider } from "./contexts/UserAuthProvider";
import { Navigate, Route } from "react-router-dom";
import PreLoader from "./components/common/PreLoader";

const PrivateRoute = ({ component: Component, ...restOfProps }) => {
  const { user, Loading } = useUserAuthProvider();

  return (
    <>
      <Route
        {...restOfProps}
        render={(props) =>
          Loading ? (
            <PreLoader />
          ) : user ? (
            <Component {...props} />
          ) : (
            <Navigate to="/dashboard/add-task" />
          )
        }
      />
    </>
  );
};

export default PrivateRoute;
