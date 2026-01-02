import { useState } from 'react';
import { Flame, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';

interface HeaderProps {
  userProfile?: {
    full_name: string | null;
    learning_streak: number;
    total_xp: number;
  } | null;
}

export function Header({ userProfile }: HeaderProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="bg-[#2D2D2D] border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/logo_new.png" alt="Uqalimaaq Logo" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-white">Uqalimaaq</h1>
                <p className="text-xs text-gray-400">Indigenous Languages</p>
              </div>
            </div>

            {user && userProfile ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E07856] bg-opacity-20 rounded-full">
                  <Flame className="text-[#E07856]" size={18} />
                  <span className="font-bold text-[#E07856]">{userProfile.learning_streak}</span>
                </div>

                <div className="px-3 py-1.5 bg-[#7BA4B5] bg-opacity-20 rounded-full">
                  <span className="font-bold text-[#7BA4B5]">{userProfile.total_xp} XP</span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-xl transition"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#E07856] to-[#D4B896] rounded-full flex items-center justify-center">
                      <User className="text-white" size={18} />
                    </div>
                    <span className="font-medium text-white hidden sm:block">
                      {userProfile.full_name || 'User'}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#3D3D3D] rounded-xl shadow-lg border border-gray-700 py-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-[#E07856] hover:bg-gray-700 transition"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-6 py-2 bg-[#E07856] text-white rounded-xl hover:bg-[#D06846] transition font-semibold"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
