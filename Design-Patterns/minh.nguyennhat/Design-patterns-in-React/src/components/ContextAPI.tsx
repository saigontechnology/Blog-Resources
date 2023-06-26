import React, { createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const updateUser = (newUser: any) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

const Profile = () => {
  const { user, updateUser } = useContext<any>(UserContext);

  const handleUpdate = () => {
    updateUser({
      name: "Jane Doe",
      email: "jane@example.com",
    });
  };

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

const ContextAPI = () => {
  return (
    <UserProvider>
      <Profile />
    </UserProvider>
  );
};

export default ContextAPI;
