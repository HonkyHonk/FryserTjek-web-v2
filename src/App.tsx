import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { LogIn, LogOut, User, Database } from 'lucide-react';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import ParseDataPage from './components/ParseDataPage';

// Initialize Parse
Parse.initialize("r3TKrBxscy7P1c7UF670quOOWdJVEU3YSLnQNNiA", "kCD0fZQBR044XRzIJ5DAjXWz6dOAVROYUNSSQJL3");
Parse.serverURL = 'https://pg-app-q2lyq74v5e55eyhzp4eq7xtzs9e55u.scalabl.cloud/1/';

function App() {
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);
  const [showParseData, setShowParseData] = useState(false);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await Parse.User.current();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error checking current user:', error);
        setCurrentUser(null);
      }
    };
    checkCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      setCurrentUser(null);
      setShowParseData(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Parse Auth Website</h1>
        {currentUser ? (
          <>
            <UserProfile user={currentUser} />
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => setShowParseData(false)}
                className={`flex-1 py-2 px-4 rounded transition duration-300 flex items-center justify-center ${
                  !showParseData ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <User className="mr-2" size={18} />
                Profile
              </button>
              <button
                onClick={() => setShowParseData(true)}
                className={`flex-1 py-2 px-4 rounded transition duration-300 flex items-center justify-center ${
                  showParseData ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Database className="mr-2" size={18} />
                Parse Data
              </button>
            </div>
            {showParseData ? (
              <ParseDataPage />
            ) : (
              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 flex items-center justify-center"
              >
                <LogOut className="mr-2" size={18} />
                Logout
              </button>
            )}
          </>
        ) : (
          <LoginForm setCurrentUser={setCurrentUser} />
        )}
      </div>
    </div>
  );
}

export default App;