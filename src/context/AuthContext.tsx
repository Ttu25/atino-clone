import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

interface User {
    _id: string;
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Verify token and get user profile
            authAPI.getProfile()
                .then(response => {
                    if (response.success) {
                        setUser({ ...response.data, id: response.data._id });
                    }
                })
                .catch(() => {
                    // Token invalid, remove it
                    localStorage.removeItem('token');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await authAPI.login(email, password);

            if (response.success) {
                const { user: userData, token } = response.data;
                setUser({ ...userData, id: userData._id });
                localStorage.setItem('token', token);
                // Notify other components about token change
                window.dispatchEvent(new Event('tokenChanged'));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            const response = await authAPI.register(name, email, password);

            if (response.success) {
                const { user: userData, token } = response.data;
                setUser({ ...userData, id: userData._id });
                localStorage.setItem('token', token);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Register error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        // Notify other components about token change
        window.dispatchEvent(new Event('tokenChanged'));
    };

    const updateProfile = async (data: Partial<User>) => {
        try {
            const response = await authAPI.updateProfile(data);

            if (response.success) {
                setUser({ ...user!, ...response.data });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Update profile error:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                register,
                logout,
                updateProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
