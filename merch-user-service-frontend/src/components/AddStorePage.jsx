import '../css/AddStorePage.css';
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
            console.log('Токен:', token); // Логируем токен
            await axios.post(
                'http://localhost:8080/api/stores/add-store', // Исправленный URL
                { name: addStoreName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setAddStoreName('');
            setError('');
            navigate('/stores');
        } catch (err) {
            console.log('Статус ответа:', err.response?.status);
            console.log('Данные ответа:', err.response?.data);
            console.error('Полная ошибка:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(`Ошибка: ${err.response.data.message}`);
            } else if (err.response?.status === 403) {
                setError('Доступ запрещен: требуется роль ADMIN.');
            } else if (err.response?.status === 404) {
                setError('Эндпоинт не найден. Проверьте URL.');
            } else {
                setError('Не удалось добавить магазин: ' + (err.message || 'Неизвестная ошибка'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-store-page">
            <div className="add-store-card">
                <h2 className="add-store-title">Добавить новый магазин</h2>

                {isLoading && (
                    <div className="flex justify-center">
                        <div className="spinner"></div>
                    </div>
                )}

                {error && (
                    <p className="add-store-error">{error}</p>
                )}

                <form onSubmit={addStore} className="add-store-form">
                    <div>
                        <label htmlFor="storeName" className="add-store-label">
                            Название магазина
                        </label>
                        <input
                            id="storeName"
                            type="text"
                            value={addStoreName}
                            onChange={(e) => setAddStoreName(e.target.value)}
                            className="add-store-input"
                            placeholder="Введите название магазина"
                            required
                        />
                    </div>

                    <div className="add-store-buttons">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="add-store-cancel"
                        >
                            Отмена
                        </button>

                        <button
                            type="submit"
                            className="add-store-submit"
                            disabled={isLoading}
                        >
                            Добавить магазин
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStorePage;