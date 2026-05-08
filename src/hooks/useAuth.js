import { useAuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const { user, login, logout, loading } = useAuthContext();
  const hasRole = (role) => user?.role === role;
  const isAuthenticated = () => !!user;
  return { user, login, logout, loading, hasRole, isAuthenticated };
};

export default useAuth;