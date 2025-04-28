import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const ReportPage = () => {
    const { token } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchReports = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/reports', {
                headers: { Authorization: `Bearer ${token}` },
                params: { date: date || undefined },
            });
            setReports(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load reports');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [date]);

    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Reports</h2>
            {isLoading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Filter by Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {reports.length === 0 ? (
                    <p className="text-gray-600">No reports found</p>
                ) : (
                    <table className="w-full table-auto">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Store</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Cash Registers</th>
                            <th className="px-4 py-2">Cash Register Photo</th>
                            <th className="px-4 py-2">Main Zone Photo</th>
                            <th className="px-4 py-2">Comment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reports.map((report) => (
                            <tr key={report.id} className="border-t">
                                <td className="px-4 py-2">{report.schedule.store.name}</td>
                                <td className="px-4 py-2">{report.date}</td>
                                <td className="px-4 py-2">{report.cashRegisterCount}</td>
                                <td className="px-4 py-2">
                                    {report.cashRegisterPhotoUrl ? (
                                        <a href={report.cashRegisterPhotoUrl} target="_blank" className="text-blue-600">
                                            View
                                        </a>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {report.mainZonePhotoUrl ? (
                                        <a href={report.mainZonePhotoUrl} target="_blank" className="text-blue-600">
                                            View
                                        </a>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td className="px-4 py-2">{report.comment || 'N/A'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ReportPage;