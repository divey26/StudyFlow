import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute() {
  const { token, initializing } = useAuth();
  if (initializing) {
    return <div className="grid min-h-screen place-items-center text-slate-500">Loading StudyFlow...</div>;
  }
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
