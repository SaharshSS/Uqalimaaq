/*
  # Uqalimaaq Language Learning Platform Schema

  ## Overview
  Complete database schema for the Uqalimaaq indigenous language learning platform,
  supporting Tlingit and other Pacific Northwest and Alaska indigenous languages.

  ## Tables Created

  ### 1. profiles
  - `id` (uuid, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `avatar_url` (text)
  - `native_language` (text)
  - `learning_streak` (integer) - consecutive days of learning
  - `total_xp` (integer) - experience points earned
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. languages
  - `id` (uuid)
  - `name` (text) - e.g., "Tlingit"
  - `native_name` (text) - name in the language itself
  - `code` (text) - language code
  - `description` (text)
  - `flag_emoji` (text)
  - `is_active` (boolean)
  - `created_at` (timestamptz)

  ### 3. lessons
  - `id` (uuid)
  - `language_id` (uuid, references languages)
  - `title` (text)
  - `description` (text)
  - `level` (integer) - difficulty level 1-10
  - `order_index` (integer) - lesson sequence
  - `xp_reward` (integer) - XP earned on completion
  - `lesson_type` (text) - vocabulary, grammar, pronunciation, culture
  - `content` (jsonb) - flexible lesson content structure
  - `is_published` (boolean)
  - `created_at` (timestamptz)

  ### 4. user_progress
  - `id` (uuid)
  - `user_id` (uuid, references profiles)
  - `lesson_id` (uuid, references lessons)
  - `status` (text) - not_started, in_progress, completed
  - `score` (integer) - quiz score percentage
  - `attempts` (integer)
  - `completed_at` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. achievements
  - `id` (uuid)
  - `name` (text)
  - `description` (text)
  - `icon` (text)
  - `requirement_type` (text) - streak, xp, lessons_completed, perfect_score
  - `requirement_value` (integer)
  - `created_at` (timestamptz)

  ### 6. user_achievements
  - `id` (uuid)
  - `user_id` (uuid, references profiles)
  - `achievement_id` (uuid, references achievements)
  - `earned_at` (timestamptz)

  ### 7. pronunciation_recordings
  - `id` (uuid)
  - `lesson_id` (uuid, references lessons)
  - `word` (text)
  - `translation` (text)
  - `audio_url` (text)
  - `phonetic` (text)
  - `created_at` (timestamptz)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only read/write their own data
  - Public read access for lessons, languages, and achievements
*/

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  native_language text DEFAULT 'English',
  learning_streak integer DEFAULT 0,
  total_xp integer DEFAULT 0,
  last_activity_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create languages table
CREATE TABLE IF NOT EXISTS languages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  native_name text NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  flag_emoji text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active languages"
  ON languages FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language_id uuid REFERENCES languages(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  level integer DEFAULT 1,
  order_index integer NOT NULL,
  xp_reward integer DEFAULT 10,
  lesson_type text DEFAULT 'vocabulary',
  content jsonb DEFAULT '{}',
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (is_published = true);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  status text DEFAULT 'not_started',
  score integer DEFAULT 0,
  attempts integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  requirement_type text NOT NULL,
  requirement_value integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create pronunciation_recordings table
CREATE TABLE IF NOT EXISTS pronunciation_recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  word text NOT NULL,
  translation text NOT NULL,
  audio_url text,
  phonetic text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pronunciation_recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pronunciation recordings"
  ON pronunciation_recordings FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lessons_language_id ON lessons(language_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(order_index);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_pronunciation_lesson_id ON pronunciation_recordings(lesson_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();