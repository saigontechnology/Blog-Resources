import { useDeferredValue } from "react";

interface IUserProfileProps {
  user: {
    name: string;
    bio: string;
  };
}

const UserProfile: React.FC<IUserProfileProps> = ({ user }) => {
  const deferredUser = useDeferredValue(user);

  return (
    <div>
      <h1>{deferredUser.name}</h1>
      <p>{deferredUser.bio}</p>
    </div>
  );
};

export default UserProfile;
