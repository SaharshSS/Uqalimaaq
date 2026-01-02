import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, Trophy, Home } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Question {
  question: string;
  options: string[];
  correct: number;
  type: string;
}

interface Vocabulary {
  word: string;
  translation: string;
  phonetic: string;
}

interface Lesson {
  id: string;
  title: string;
  xp_reward: number;
  content: {
    vocabulary?: Vocabulary[];
    quiz?: Question[];
    pronunciation_guide?: any[];
    practice_words?: any[];
  };
}

interface LessonQuizProps {
  lesson: Lesson;
  onComplete: () => void;
  onExit: () => void;
}

type QuizState = 'learning' | 'quiz' | 'results';

export function LessonQuiz({ lesson, onComplete, onExit }: LessonQuizProps) {
  const { user } = useAuth();
  const [state, setState] = useState<QuizState>('learning');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [saving, setSaving] = useState(false);

  const vocabulary = lesson.content.vocabulary || [];
  const questions = lesson.content.quiz || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === currentQuestion.correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setState('results');
      saveProgress();
    }
  };

  const saveProgress = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const score = Math.round((correctAnswers / questions.length) * 100);
      const status = score >= 70 ? 'completed' : 'in_progress';

      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('id, attempts')
        .eq('user_id', user.id)
        .eq('lesson_id', lesson.id)
        .maybeSingle();

      if (existingProgress) {
        await supabase
          .from('user_progress')
          .update({
            status,
            score,
            attempts: existingProgress.attempts + 1,
            completed_at: status === 'completed' ? new Date().toISOString() : null,
          })
          .eq('id', existingProgress.id);
      } else {
        await supabase.from('user_progress').insert({
          user_id: user.id,
          lesson_id: lesson.id,
          status,
          score,
          attempts: 1,
          completed_at: status === 'completed' ? new Date().toISOString() : null,
        });
      }

      if (status === 'completed') {
        const { data: profile } = await supabase
          .from('profiles')
          .select('total_xp')
          .eq('id', user.id)
          .maybeSingle();

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              total_xp: profile.total_xp + lesson.xp_reward,
              last_activity_date: new Date().toISOString().split('T')[0],
            })
            .eq('id', user.id);
        }
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setSaving(false);
    }
  };

  if (state === 'learning') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{lesson.title}</h2>

            <div className="space-y-6 mb-8">
              {vocabulary.map((item, index) => (
                <div key={index} className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{item.word}</span>
                    <span className="text-gray-500 italic">{item.phonetic}</span>
                  </div>
                  <p className="text-xl text-gray-700">{item.translation}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={onExit}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold"
              >
                Exit
              </button>
              <button
                onClick={() => setState('quiz')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition font-semibold flex items-center justify-center gap-2"
              >
                Start Quiz
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'quiz') {
    const isCorrect = selectedAnswer === currentQuestion.correct;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-4 bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                {correctAnswers} Correct
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">{currentQuestion.question}</h3>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const showCorrect = showFeedback && index === currentQuestion.correct;
                const showWrong = showFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full p-6 rounded-2xl border-2 transition text-left font-medium ${
                      showCorrect
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : showWrong
                        ? 'border-red-500 bg-red-50 text-red-900'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{option}</span>
                      {showCorrect && <CheckCircle className="text-green-500" size={24} />}
                      {showWrong && <XCircle className="text-red-500" size={24} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback ? (
              <button
                onClick={handleNextQuestion}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition font-semibold flex items-center justify-center gap-2"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Answer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const score = Math.round((correctAnswers / questions.length) * 100);
  const passed = score >= 70;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div
            className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              passed ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-orange-500 to-red-500'
            }`}
          >
            {passed ? <Trophy className="text-white" size={48} /> : <XCircle className="text-white" size={48} />}
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            You scored {correctAnswers} out of {questions.length} ({score}%)
          </p>

          {passed && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
              <p className="text-lg font-semibold text-blue-900">
                +{lesson.xp_reward} XP Earned!
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onComplete}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition font-semibold flex items-center justify-center gap-2"
              disabled={saving}
            >
              <Home size={20} />
              {saving ? 'Saving...' : 'Back to Dashboard'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
