import '../css/Navbar.css';  // Убедитесь, что файл CSS правильно импортирован

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <nav className="navbar">  {/* Используем класс navbar для применения стилей */}
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="brand">Merch Service</Link>  {/* Применяем класс brand */}
                <div className="nav-links">  {/* Применяем класс nav-links */}
                    {user ? (
                        <>
                            <Link to="/profile" className="nav-link">Profile</Link>
                            {user.role === 'ADMIN' && (
                                <Link to="/users" className="nav-link">Users</Link>
                            )}
                            <Link to="/stores" className="nav-link">Stores</Link>
                            {user.role === 'ADMIN' && (
                                <Link to="/add-store" className="nav-link">Add Store</Link>
                            )}
                            {user.role === 'ADMIN' && (
                                <Link to="/delete-store" className="nav-link">Delete Store</Link>
                            )}
                            {user.role === 'ADMIN' && (
                                <Link to="/schedules" className="nav-link">Schedules</Link>
                            )}
                            {user.role === 'ADMIN' && (
                                <Link to="/reports" className="nav-link">Reports</Link>
                            )}
                            <button onClick={logout} className="nav-link logout-button">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
