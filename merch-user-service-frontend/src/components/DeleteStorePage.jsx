import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const DeleteStorePage = () => {
    const { token } = useContext(AuthContext);
    const [deleteStoreId, setDeleteStoreId] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await axios.post(
                'http://localhost:8080/delete-store',
                new URLSearchParams({ id: deleteStoreId }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            setDeleteStoreId('');
            setError('');
            setShowModal(false);
            navigate('/stores'); // Переход на страницу магазинов после успеха
        } catch (err) {
            setError('Failed to delete store. Requires ADMIN role.');
            console.error(err);
            setShowModal(false);
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = (e) => {
        e.preventDefault();
        if (deleteStoreId) {
            setShowModal(true);
        } else {
            setError('Please enter a Store ID');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setError('');
    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Delete Store</h2>
            {isLoading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <form onSubmit={openModal} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store ID</label>
                        <input
                            type="number"
                            value={deleteStoreId}
                            onChange={(e) => setDeleteStoreId(e.target.value)}
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
                            Delete
                        </button>
                    </div>
                </form>
            </div>

            {/* Модальное окно подтверждения */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete the store with ID {deleteStoreId}?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400"
                                disabled={isLoading}
                            >
                                No
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                                disabled={isLoading}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteStorePage;