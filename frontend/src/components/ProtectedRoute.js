import { Navigate } from 'react-router-dom';

function ProtectedRoute( {isLoggedIn, children} ) {
  return isLoggedIn 
    ? children 
    : <Navigate to="/sign-in" replace />
}

export default ProtectedRoute;