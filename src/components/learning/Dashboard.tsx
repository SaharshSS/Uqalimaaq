import { useEffect, useState } from 'react';
import { BookOpen, Lock, CheckCircle, Play, Trophy } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Lesson {
  id: string;
  title: string;
  description: string;
  level: number;
  order_index: number;
  xp_reward: number;
  lesson_type: string;
}

interface UserProgress {
  lesson_id: string;
  status: string;
  score: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned_at?: string;
}

interface DashboardProps {
  onStartLesson: (lesson: Lesson) => void;
}

export function Dashboard({ onStartLesson }: DashboardProps) {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, UserProgress>>({});
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const { data: tlingit } = await supabase
        .from('languages')
        .select('id')
        .eq('code', 'tli')
        .maybeSingle();

      if (tlingit) {
        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('*')
          .eq('language_id', tlingit.id)
          .eq('is_published', true)
          .order('order_index');

        if (lessonsData) {
          setLessons(lessonsData);
        }

        const { data: progressData } = await supabase
          .from('user_progress')
          .select('lesson_id, status, score')
          .eq('user_id', user!.id);

        if (progressData) {
          const progressMap: Record<string, UserProgress> = {};
          progressData.forEach((p) => {
            progressMap[p.lesson_id] = p;
          });
          setProgress(progressMap);
        }

        const { data: achievementsData } = await supabase
          .from('achievements')
          .select(`
            id,
            name,
            description,
            icon,
            user_achievements!left(earned_at)
          `)
          .limit(5);

        if (achievementsData) {
          const mapped = achievementsData.map((a: any) => ({
            id: a.id,
            name: a.name,
            description: a.description,
            icon: a.icon,
            earned_at: a.user_achievements?.[0]?.earned_at,
          }));
          setAchievements(mapped);
        }
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLessonUnlocked = (lesson: Lesson) => {
    if (lesson.order_index === 1) return true;
    const previousLesson = lessons.find((l) => l.order_index === lesson.order_index - 1);
    if (!previousLesson) return true;
    const prevProgress = progress[previousLesson.id];
    return prevProgress?.status === 'completed';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#2D2D2D]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E07856]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#2D2D2D] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Lingít (Tlingit)</h1>
        <p className="text-gray-300">Continue your language learning journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-4">Your Learning Path</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => {
              const unlocked = isLessonUnlocked(lesson);
              const lessonProgress = progress[lesson.id];
              const completed = lessonProgress?.status === 'completed';

              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  unlocked={unlocked}
                  completed={completed}
                  score={lessonProgress?.score}
                  onStart={() => onStartLesson(lesson)}
                />
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#3D3D3D] rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-[#D4B896]" size={24} />
              <h3 className="font-bold text-white">Achievements</h3>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonCard({
  lesson,
  unlocked,
  completed,
  score,
  onStart,
}: {
  lesson: Lesson;
  unlocked: boolean;
  completed: boolean;
  score?: number;
  onStart: () => void;
}) {
  return (
    <div
      className={`bg-[#3D3D3D] rounded-2xl shadow-lg p-6 transition ${
        unlocked ? 'hover:shadow-xl cursor-pointer' : 'opacity-60'
      }`}
      onClick={unlocked ? onStart : undefined}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
            completed
              ? 'bg-gradient-to-br from-green-500 to-emerald-500'
              : unlocked
              ? 'bg-gradient-to-br from-[#E07856] to-[#D4B896]'
              : 'bg-gray-600'
          }`}
        >
          {completed ? (
            <CheckCircle className="text-white" size={32} />
          ) : unlocked ? (
            <Play className="text-white" size={32} />
          ) : (
            <Lock className="text-gray-400" size={32} />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-white text-lg">{lesson.title}</h3>
              <p className="text-gray-300 text-sm">{lesson.description}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-semibold text-[#7BA4B5]">+{lesson.xp_reward} XP</span>
              {completed && score !== undefined && (
                <span className="text-sm font-semibold text-green-400">{score}%</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="px-2 py-1 bg-gray-700 rounded-full">Level {lesson.level}</span>
            <span className="px-2 py-1 bg-gray-700 rounded-full capitalize">{lesson.lesson_type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementBadge({ achievement }: { achievement: Achievement }) {
  const earned = !!achievement.earned_at;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl ${
        earned ? 'bg-[#D4B896] bg-opacity-20 border-2 border-[#D4B896]' : 'bg-gray-700'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          earned ? 'bg-[#D4B896]' : 'bg-gray-600'
        }`}
      >
        <Trophy className="text-white" size={20} />
      </div>
      <div className="flex-1">
        <p className={`font-semibold text-sm ${earned ? 'text-white' : 'text-gray-400'}`}>
          {achievement.name}
        </p>
        <p className="text-xs text-gray-400">{achievement.description}</p>
      </div>
    </div>
  );
}
