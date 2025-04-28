import '../css/DeleteStorePage.css';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const DeleteStorePage = () => {
    const { token } = useContext(AuthContext);
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/stores', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStores(response.data); // Сохраняем полученные магазины
            } catch (error) {
                console.error('Ошибка загрузки магазинов:', error);
                alert('Произошла ошибка при загрузке магазинов.');
            }
        };

        if (token) {
            fetchStores(); // Выполняем запрос только если токен есть
        } else {
            alert('Необходимо авторизоваться.');
        }
    }, [token]); // Добавляем токен как зависимость



    const handleDelete = async () => {
        console.log('Deleting store:', selectedStore); // Логирование
        if (!selectedStore) {
            setError('Выберите магазин для удаления.');
            return;
        }

        setIsLoading(true);
        try {
            const storeToDelete = stores.find(store => store.name === selectedStore);
            if (!storeToDelete) {
                setError('Магазин не найден.');
                return;
            }

            await axios.delete(`http://localhost:8080/api/stores/${storeToDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSelectedStore('');
            setError('');
            setShowModal(false);
            navigate('/stores');
        } catch (err) {
            console.error('Ошибка удаления магазина:', err);
            setError('Не удалось удалить магазин. Требуется роль ADMIN или неверное название.');
            setShowModal(false);
        } finally {
            setIsLoading(false);
        }
    };


    const openModal = (e) => {
        e.preventDefault();
        if (selectedStore) {
            setShowModal(true);
        } else {
            setError('Выберите магазин для удаления.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Удалить магазин</h2>
                {isLoading && (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                )}
                {error && (
                    <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</p>
                )}
                <form onSubmit={openModal} className="space-y-6">
                    <div>
                        <label htmlFor="storeSelect" className="block text-sm font-medium text-gray-700">
                            Выберите магазин для удаления
                        </label>
                        <select
                            id="storeSelect"
                            value={selectedStore}
                            onChange={(e) => setSelectedStore(e.target.value)}
                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            disabled={isLoading}
                        >
                            <option value="">Выберите магазин</option>
                            {stores.map((store) => (
                                <option key={store.id} value={store.name}>
                                    {store.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                            disabled={isLoading}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            Удалить
                        </button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full transform transition-all">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Подтверждение удаления</h3>
                        <p className="text-gray-600 mb-6">
                            Вы уверены, что хотите удалить магазин "{selectedStore}"?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                                disabled={isLoading}
                            >
                                Нет
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                Да
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteStorePage;