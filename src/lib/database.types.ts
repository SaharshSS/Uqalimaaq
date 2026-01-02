export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          native_language: string
          learning_streak: number
          total_xp: number
          last_activity_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          native_language?: string
          learning_streak?: number
          total_xp?: number
          last_activity_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          native_language?: string
          learning_streak?: number
          total_xp?: number
          last_activity_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      languages: {
        Row: {
          id: string
          name: string
          native_name: string
          code: string
          description: string | null
          flag_emoji: string | null
          is_active: boolean
          created_at: string
        }
      }
      lessons: {
        Row: {
          id: string
          language_id: string
          title: string
          description: string | null
          level: number
          order_index: number
          xp_reward: number
          lesson_type: string
          content: Json
          is_published: boolean
          created_at: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          status: string
          score: number
          attempts: number
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          status?: string
          score?: number
          attempts?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          status?: string
          score?: number
          attempts?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          requirement_type: string
          requirement_value: number
          created_at: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
      }
      pronunciation_recordings: {
        Row: {
          id: string
          lesson_id: string
          word: string
          translation: string
          audio_url: string | null
          phonetic: string | null
          notes: string | null
          created_at: string
        }
      }
    }
  }
}
