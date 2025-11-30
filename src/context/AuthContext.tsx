import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('atino-user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('atino-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('atino-user');
        }
    }, [user]);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Mock authentication - in real app, this would call an API
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

        // Check if user exists in localStorage (registered users)
        const registeredUsers = JSON.parse(localStorage.getItem('atino-registered-users') || '[]');
        const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password);

        if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            return true;
        }

        // Demo account
        if (email === 'demo@atino.vn' && password === 'demo123') {
            setUser({
                id: 'demo-user',
                name: 'Nguyễn Văn A',
                email: 'demo@atino.vn',
                phone: '0987654321',
                address: '123 Nguyễn Huệ, Quận 1, TP.HCM'
            });
            return true;
        }

        return false;
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        // Mock registration
        await new Promise(resolve => setTimeout(resolve, 500));

        const registeredUsers = JSON.parse(localStorage.getItem('atino-registered-users') || '[]');

        // Check if email already exists
        if (registeredUsers.some((u: any) => u.email === email)) {
            return false;
        }

        const newUser = {
            id: `user-${Date.now()}`,
            name,
            email,
            password, // In real app, this would be hashed
            phone: '',
            address: ''
        };

        registeredUsers.push(newUser);
        localStorage.setItem('atino-registered-users', JSON.stringify(registeredUsers));

        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    const updateProfile = (data: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);

            // Update in registered users list
            const registeredUsers = JSON.parse(localStorage.getItem('atino-registered-users') || '[]');
            const index = registeredUsers.findIndex((u: any) => u.id === user.id);
            if (index !== -1) {
                registeredUsers[index] = { ...registeredUsers[index], ...data };
                localStorage.setItem('atino-registered-users', JSON.stringify(registeredUsers));
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
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
