import React from "react";
import { useUserAuthProvider } from "./contexts/UserAuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import PreLoader from "./components/common/PreLoader";

function PrivateRoute({ children }) {
  const { user, Loading } = useUserAuthProvider();
  const checkPath = window.location.pathname;

  return user ? (
    Loading ? (
      <PreLoader />
    ) : checkPath === "/" ? (
      <Navigate to="/login" />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" />
  );
}
// const PrivateRoute = ({ component: Component, ...restOfProps }) => {
// const { user, Loading } = useUserAuthProvider();

//   return (
//     <>
//       <Route
//         {...restOfProps}
//         render={(props) =>
//           Loading ? (
//             <PreLoader />
//           ) : user ? (
//             <Component {...props} />
//           ) : (
//             <Navigate to="/dashboard/add-task" />
//           )
//         }
//       />
//     </>
//   );
// };

export default PrivateRoute;
