import { useState, useContext, createContext, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    // Simulate checking auth status
    const checkAuthStatus = async () => {
      try {
        // In a real app, you would check with your backend
        // const response = await api.getCurrentUser();
        // setUser(response.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      // In a real app, you would make an API call
      // const response = await api.login(credentials);
      // setUser(response.user);
      // return response;
      
      // For demo purposes
      const mockUser = {
        id: 1,
        name: 'John Farmer',
        email: credentials.email,
        role: 'farmer',
      };
      setUser(mockUser);
      return { user: mockUser };
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    // Clear localStorage
    localStorage.removeItem('user');
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;