import { useUserAuth } from "./_utils/auth-context";

export default function Profile() {
  const { user } = useUserAuth();

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      {/* Display additional user information if needed */}
    </div>
  );
}
