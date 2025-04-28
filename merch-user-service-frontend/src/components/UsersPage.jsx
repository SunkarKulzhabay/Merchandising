import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const UsersPage = () => {
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch users. Requires ADMIN role.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        if (token) fetchUsers();
    }, [token]);

    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Users</h2>
            {isLoading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {users.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <table className="w-full border">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Username</th>
                            <th className="p-2 border">Full Name</th>
                            <th className="p-2 border">Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="p-2 border">{user.username}</td>
                                <td className="p-2 border">{user.fullName}</td>
                                <td className="p-2 border">{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UsersPage;