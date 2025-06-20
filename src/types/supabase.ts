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
      delivery_status: {
        Row: {
          id: string
          order_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          order_id?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_status_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          items_json: Json
          payment_status: string | null
          status: string | null
          total_amount: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          items_json: Json
          payment_status?: string | null
          status?: string | null
          total_amount: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          items_json?: Json
          payment_status?: string | null
          status?: string | null
          total_amount?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          available_stock: number | null
          id: string
          image_url: string | null
          name: string
          price: number
        }
        Insert: {
          available_stock?: number | null
          id?: string
          image_url?: string | null
          name: string
          price: number
        }
        Update: {
          available_stock?: number | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          is_blocked: boolean | null
          last_active: string | null
          phone_number: string
        }
        Insert: {
          id?: string
          is_blocked?: boolean | null
          last_active?: string | null
          phone_number: string
        }
        Update: {
          id?: string
          is_blocked?: boolean | null
          last_active?: string | null
          phone_number?: string
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