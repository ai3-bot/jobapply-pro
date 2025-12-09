import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { LogIn, UserCircle, LogOut } from "lucide-react";

export default function Layout({ children }) {
  const [user, setUser] = React.useState(null);
  const location = useLocation();

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (e) {
        setUser(null);
      }
    };
    checkAuth();
  }, [location]);

  const handleLogin = () => {
    base44.auth.redirectToLogin(window.location.origin + '/admin');
  };

  const handleLogout = async () => {
    await base44.auth.logout();
    setUser(null);
  };

  const isApplicantPage = location.pathname.startsWith('/application');

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">JobPortal</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/admin">
                    <Button variant="ghost" className="text-sm font-medium">
                        Admin Dashboard
                    </Button>
                </Link>
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                  <UserCircle className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-medium hidden sm:block">{user.first_name || user.email}</span>
                  <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                    <LogOut className="w-4 h-4 text-slate-500" />
                  </Button>
                </div>
              </div>
            ) : (
               !isApplicantPage && (
                  <Button 
                    onClick={handleLogin}
                    variant="ghost"
                    className="flex items-center gap-2 hover:bg-slate-100"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Admin Login</span>
                  </Button>
               )
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen flex flex-col">
        {children}
      </main>

      {/* Footer */}
      {!isApplicantPage && (
        <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} JobPortal Inc. All rights reserved.
            </div>
        </footer>
      )}
    </div>
  );
}