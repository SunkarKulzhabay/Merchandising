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
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/stores', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Stores response:', response.data); // Отладка
                setStores(response.data);
                setError('');
            } catch (err) {
                console.error('Error fetching stores:', err); // Отладка
                setError('Failed to load stores. Check console for details.');
            } finally {
                setIsLoading(false);
            }
        };
        if (token) {
            fetchStores();
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
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            }
            setError('');
            navigate('/');
        } catch (err) {
            console.error('Error creating schedule:', err); // Отладка
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
                                stores.map((store) => (
                                    <label key={store.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedStoreIds.includes(store.id)}
                                            onChange={() => handleStoreChange(store.id)}
                                            className="mr-2"
                                        />
                                        {store.name}
                                    </label>
                                ))
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tasks</label>
                        <div className="space-y-2">
                            {[
                                { value: 'CASH_COUNT', label: 'Count Cash Registers' },
                                { value: 'CASH_PHOTO', label: 'Cash Register Photo' },
                                { value: 'ZONE_PHOTO', label: 'Main Zone Photo' },
                            ].map((task) => (
                                <label key={task.value} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedTasks.includes(task.value)}
                                        onChange={() => handleTaskChange(task.value)}
                                        className="mr-2"
                                    />
                                    {task.label}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Days of Week</label>
                        <div className="space-y-2">
                            {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(
                                (day) => (
                                    <label key={day} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedDays.includes(day)}
                                            onChange={() => handleDayChange(day)}
                                            className="mr-2"
                                        />
                                        {day.charAt(0) + day.slice(1).toLowerCase()}
                                    </label>
                                )
                            )}
                        </div>
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