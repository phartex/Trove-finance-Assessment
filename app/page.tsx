'use client';

import { useAuth } from './context/AuthContext';
import LoginPage from './login/page';
import DashboardPage from './dashboard/page';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardPage /> : <LoginPage />;
}
