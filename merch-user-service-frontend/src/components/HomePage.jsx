import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/HomePage.css'; // не забудь подключить!

const HomePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="home-container">
            {user ? (
                <div className="home-user-info">
                    <h2 className="home-username">Logged in as: {user.username}</h2>
                </div>
            ) : (
                <p className="home-please-login">Please log in to access features.</p>
            )}

            <h2 className="home-title">Merch Service</h2>

            <div className="home-grid">
                <Link to="/profile" className="home-card">
                    Get Profile
                </Link>

                {user?.role === 'ADMIN' && (
                    <Link to="/users" className="home-card">
                        Get Users
                    </Link>
                )}

                <Link to="/stores" className="home-card">
                    Get Stores
                </Link>

                {user?.role === 'ADMIN' && (
                    <Link to="/add-store" className="home-card">
                        Add Store
                    </Link>
                )}

                {user?.role === 'ADMIN' && (
                    <Link to="/delete-store" className="home-card">
                        Delete Store
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HomePage;
