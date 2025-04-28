import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AddStorePage = () => {
    const { token } = useContext(AuthContext);
    const [addStoreName, setAddStoreName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const addStore = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(
                'http://localhost:8080/add-store',
                new URLSearchParams({ name: addStoreName }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            setAddStoreName('');
            setError('');
            navigate('/stores'); // Переход на страницу магазинов после успеха
        } catch (err) {
            setError('Failed to add store. Requires ADMIN role.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Add Store</h2>
            {isLoading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <form onSubmit={addStore} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input
                            type="text"
                            value={addStoreName}
                            onChange={(e) => setAddStoreName(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                            disabled={isLoading}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStorePage;