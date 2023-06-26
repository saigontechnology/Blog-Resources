import React, { useState, useEffect } from "react";

const checkAuth = () => true;

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      // check if user is authenticated
      const isAuthenticated = checkAuth();
      setIsAuthenticated(isAuthenticated);
    }, []);

    // pass down props to wrapped component
    return <WrappedComponent isAuthenticated={isAuthenticated} {...props} />;
  };
};

const MyComponent = ({ isAuthenticated }: any) => {
  return (
    <div>
      {isAuthenticated ? <p>Authenticated</p> : <p>Not authenticated</p>}
    </div>
  );
};

const AuthenticatedComponent = withAuth(MyComponent);

export default AuthenticatedComponent;
