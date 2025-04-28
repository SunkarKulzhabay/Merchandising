import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="container mx-auto mt-8 p-4">
            {user ? (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Logged in as: {user.username}</h2>
                </div>
            ) : (
                <p className="text-gray-600">Please log in to access features.</p>
            )}
            <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Merch Service</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                    to="/profile"
                    className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-center"
                >
                    Get Profile
                </Link>
                {user?.role === 'ADMIN' && (
                    <Link
                        to="/users"
                        className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-center"
                    >
                        Get Users
                    </Link>
                )}
                <Link
                    to="/stores"
                    className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-center"
                >
                    Get Stores
                </Link>
                {user?.role === 'ADMIN' && (
                    <Link
                        to="/add-store"
                        className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-center"
                    >
                        Add Store
                    </Link>
                )}
                {user?.role === 'ADMIN' && (
                    <Link
                        to="/delete-store"
                        className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-center"
                    >
                        Delete Store
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HomePage;