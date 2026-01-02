import { useState, useEffect } from 'react';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { LandingPage } from './components/home/LandingPage';
import { Dashboard } from './components/learning/Dashboard';
import { LessonQuiz } from './components/learning/LessonQuiz';
import { PronunciationGuide } from './components/learning/PronunciationGuide';
import { supabase } from './lib/supabase';

type View = 'landing' | 'dashboard' | 'lesson' | 'pronunciation';

interface Lesson {
  id: string;
  title: string;
  description: string;
  level: number;
  order_index: number;
  xp_reward: number;
  lesson_type: string;
  content: any;
}

function AppContent() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<View>('landing');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setView('dashboard');
      loadUserProfile();
    } else {
      setView('landing');
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setUserProfile(data);
    }
  };

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView('lesson');
  };

  const handleLessonComplete = () => {
    setView('dashboard');
    setSelectedLesson(null);
    loadUserProfile();
  };

  const handleExitLesson = () => {
    setView('dashboard');
    setSelectedLesson(null);
  };

  const handleViewPronunciation = () => {
    setView('pronunciation');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2D2D2D]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E07856]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2D2D2D]">
      {view !== 'lesson' && <Header userProfile={userProfile} />}

      {view === 'landing' && <LandingPage />}

      {view === 'dashboard' && user && (
        <>
          <Dashboard onStartLesson={handleStartLesson} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 bg-[#2D2D2D]">
            <button
              onClick={handleViewPronunciation}
              className="w-full sm:w-auto px-6 py-3 bg-[#7BA4B5] text-white rounded-xl hover:bg-[#6A93A4] transition font-semibold shadow-lg"
            >
              View Pronunciation Guide
            </button>
          </div>
        </>
      )}

      {view === 'lesson' && selectedLesson && (
        <LessonQuiz
          lesson={selectedLesson}
          onComplete={handleLessonComplete}
          onExit={handleExitLesson}
        />
      )}

      {view === 'pronunciation' && (
        <PronunciationGuide onBack={handleBackToDashboard} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
