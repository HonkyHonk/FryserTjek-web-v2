import React from 'react';
import Parse from 'parse/dist/parse.min.js';
import { User } from 'lucide-react';

interface UserProfileProps {
  user: Parse.User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="text-center">
      <div className="mb-4">
        <User className="mx-auto text-blue-500" size={48} />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Welcome, {user.get('username')}!</h2>
      <p className="text-gray-600">You're successfully logged in.</p>
    </div>
  );
};

export default UserProfile;