import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
    const { token } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch profile');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        if (token) fetchProfile();
    }, [token]);

    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Profile</h2>
            {isLoading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {profile && (
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                    <p className="text-lg"><strong>Username:</strong> {profile.username}</p>
                    <p className="text-lg"><strong>Full Name:</strong> {profile.fullName}</p>
                    <p className="text-lg"><strong>Role:</strong> {profile.role}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;