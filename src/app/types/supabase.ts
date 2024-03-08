export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat: {
        Row: {
          created_at: string
          id: number
          message: string | null
          user: string
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          user: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          user?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          comments: Json[] | null
          id: number
          likes: number
          media_type: string | null
          media_url: string | null
          post_id: string
          post_time: string
          timestamp: string | null
          user_id: number | null
          username: string | null
        }
        Insert: {
          comments?: Json[] | null
          id?: number
          likes?: number
          media_type?: string | null
          media_url?: string | null
          post_id: string
          post_time?: string
          timestamp?: string | null
          user_id?: number | null
          username?: string | null
        }
        Update: {
          comments?: Json[] | null
          id?: number
          likes?: number
          media_type?: string | null
          media_url?: string | null
          post_id?: string
          post_time?: string
          timestamp?: string | null
          user_id?: number | null
          username?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          comments: string[] | null
          favourites: string[] | null
          information: string[] | null
          last_seen: string | null
          liked: string[] | null
          media_url: string[] | null
          user_id: number
          user_name: string | null
        }
        Insert: {
          comments?: string[] | null
          favourites?: string[] | null
          information?: string[] | null
          last_seen?: string | null
          liked?: string[] | null
          media_url?: string[] | null
          user_id?: number
          user_name?: string | null
        }
        Update: {
          comments?: string[] | null
          favourites?: string[] | null
          information?: string[] | null
          last_seen?: string | null
          liked?: string[] | null
          media_url?: string[] | null
          user_id?: number
          user_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
