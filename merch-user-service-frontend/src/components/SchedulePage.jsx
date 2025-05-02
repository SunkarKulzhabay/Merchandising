import '../css/SchedulePage.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const SchedulePage = () => {
    const { token } = useContext(AuthContext);
    const [stores, setStores] = useState([]);
    const [selectedStoreIds, setSelectedStoreIds] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [repeatUntil, setRepeatUntil] = useState('');
    const [merchandisers, setMerchandisers] = useState([]); // Список мерчандайзеров
    const [selectedMerchandiser, setSelectedMerchandiser] = useState(''); // Выбранный мерчандайзер
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Загрузка магазинов
                const storesResponse = await axios.get('http://localhost:8080/api/stores', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStores(storesResponse.data);

                // Загрузка мерчандайзеров
                const merchandisersResponse = await axios.get('http://localhost:8080/api/users/merchandisers', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMerchandisers(merchandisersResponse.data);
                setError('');
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load stores or merchandisers. Check console for details.');
            } finally {
                setIsLoading(false);
            }
        };
        if (token) {
            fetchData();
        } else {
            setError('No token found. Please log in.');
        }
    }, [token]);

    const handleStoreChange = (storeId) => {
        setSelectedStoreIds((prev) =>
            prev.includes(storeId)
                ? prev.filter((id) => id !== storeId)
                : [...prev, storeId]
        );
    };

    const handleTaskChange = (task) => {
        setSelectedTasks((prev) =>
            prev.includes(task)
                ? prev.filter((t) => t !== task)
                : [...prev, task]
        );
    };

    const handleDayChange = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day]
        );
    };

    const createSchedules = async (e) => {
        e.preventDefault();
        if (selectedStoreIds.length === 0 || selectedTasks.length === 0 || selectedDays.length === 0 || !repeatUntil) {
            setError('Please select at least one store, task, day, and repeat until date');
            return;
        }
        setIsLoading(true);
        try {
            for (const storeId of selectedStoreIds) {
                await axios.post(
                    'http://localhost:8080/api/schedules',
                    {
                        store: { id: storeId },
                        daysOfWeek: selectedDays,
                        requiresCashRegisterPhoto: selectedTasks.includes('CASH_PHOTO'),
                        requiresMainZonePhoto: selectedTasks.includes('ZONE_PHOTO'),
                        repeatUntil: repeatUntil,
                        userId: selectedMerchandiser || null, // Отправляем ID мерчандайзера
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            }
            setError('');
            navigate('/');
        } catch (err) {
            console.error('Error creating schedule:', err);
            setError('Failed to create schedules. Requires ADMIN role.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Create Schedule</h2>
            {isLoading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <form onSubmit={createSchedules} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stores</label>
                        <div className="space-y-2">
                            {stores.length === 0 ? (
                                <p className="text-gray-600">No stores available</p>
                            ) : (
                                <select
                                    multiple
                                    value={selectedStoreIds}
                                    onChange={(e) =>
                                        setSelectedStoreIds(
                                            Array.from(e.target.selectedOptions, (option) => option.value)
                                        )
                                    }
                                    className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {stores.map((store) => (
                                        <option key={store.id} value={store.id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tasks</label>
                        <div className="space-y-2">
                            <select
                                multiple
                                value={selectedTasks}
                                onChange={(e) =>
                                    setSelectedTasks(
                                        Array.from(e.target.selectedOptions, (option) => option.value)
                                    )
                                }
                                className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                {[
                                    { value: 'CASH_COUNT', label: 'Count Cash двухRegisters' },
                                    { value: 'CASH_PHOTO', label: 'Cash Register Photo' },
                                    { value: 'ZONE_PHOTO', label: 'Main Zone Photo' },
                                ].map((task) => (
                                    <option key={task.value} value={task.value}>
                                        {task.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Days of Week</label>
                        <div className="space-y-2">
                            <select
                                multiple
                                value={selectedDays}
                                onChange={(e) =>
                                    setSelectedDays(
                                        Array.from(e.target.selectedOptions, (option) => option.value)
                                    )
                                }
                                className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(
                                    (day) => (
                                        <option key={day} value={day}>
                                            {day.charAt(0) + day.slice(1).toLowerCase()}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Merchandiser</label>
                        <select
                            value={selectedMerchandiser}
                            onChange={(e) => setSelectedMerchandiser(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a merchandiser</option>
                            {merchandisers.map((merchandiser) => (
                                <option key={merchandiser.id} value={merchandiser.id}>
                                    {merchandiser.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Repeat Until</label>
                        <input
                            type="date"
                            value={repeatUntil}
                            onChange={(e) => setRepeatUntil(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
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
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SchedulePage;