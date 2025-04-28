import '../css/StoresPage.css';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const StoresPage = () => {
    const { token } = useContext(AuthContext);
    const [stores, setStores] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchStores = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/stores', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStores(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch stores');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        if (token) fetchStores();
    }, [token]);

    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Stores</h2>
            {isLoading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {stores.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <table className="w-full border">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stores.map((store) => (
                            <tr key={store.id}>
                                <td className="p-2 border">{store.id}</td>
                                <td className="p-2 border">{store.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StoresPage;