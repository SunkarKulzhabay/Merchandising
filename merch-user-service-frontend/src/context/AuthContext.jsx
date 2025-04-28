import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:8080/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch(() => {
                    setToken('');
                    setUser(null);
                    localStorage.removeItem('token');
                });
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            const newToken = response.data.token;
            setToken(newToken);
            localStorage.setItem('token', newToken);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const register = async (username, fullName, password, role) => {
        try {
            await axios.post('http://localhost:8080/auth/register', {
                username,
                fullName,
                password,
                role,
            });
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            return false;
        }
    };

    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
