import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import UsersPage from './components/UsersPage';
import StoresPage from './components/StoresPage';
import AddStorePage from './components/AddStorePage';
import DeleteStorePage from './components/DeleteStorePage';
import SchedulePage from './components/SchedulePage';
import ReportPage from './components/ReportPage';

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/stores" element={<StoresPage />} />
                <Route path="/add-store" element={<AddStorePage />} />
                <Route path="/delete-store" element={<DeleteStorePage />} />
                <Route path="/schedules" element={<SchedulePage />} />
                <Route path="/reports" element={<ReportPage />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;