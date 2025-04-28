import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Merch Service</Link>
                <div className="space-x-4">
                    {user ? (
                        <>
                            <Link to="/profile" className="text-white hover:text-blue-200">Profile</Link>
                            {user.role === 'ADMIN' && (
                                <Link to="/users" className="text-white hover:text-blue-200">Users</Link>
                            )}
                            <Link to="/stores" className="text-white hover:text-blue-200">Stores</Link>
                            {user.role === 'ADMIN' && (
                                <Link to="/add-store" className="text-white hover:text-blue-200">Add Store</Link>
                            )}
                            {user.role === 'ADMIN' && (
                                <Link to="/delete-store" className="text-white hover:text-blue-200">Delete Store</Link>
                            )}
                            {user.role === 'ADMIN' && (
                                <Link to="/schedules" className="text-white hover:text-blue-200">Schedules</Link>
                            )}
                            {user.role === 'ADMIN' && (
                                <Link to="/reports" className="text-white hover:text-blue-200">Reports</Link>
                            )}
                            <button onClick={logout} className="text-white hover:text-blue-200">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
                            <Link to="/register" className="text-white hover:text-blue-200">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;