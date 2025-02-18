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
            analytics: {
                Row: {
                    business_id: string
                    clicks: number | null
                    customer_feedback_id: string | null
                    id: string
                    ip_address: string | null
                    platform: string | null
                    short_url_id: string
                }
                Insert: {
                    business_id: string
                    clicks?: number | null
                    customer_feedback_id?: string | null
                    id?: string
                    ip_address?: string | null
                    platform?: string | null
                    short_url_id: string
                }
                Update: {
                    business_id?: string
                    clicks?: number | null
                    customer_feedback_id?: string | null
                    id?: string
                    ip_address?: string | null
                    platform?: string | null
                    short_url_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "analytics_business_id_fkey"
                        columns: ["business_id"]
                        isOneToOne: false
                        referencedRelation: "businesses"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "analytics_customer_feedback_id_fkey"
                        columns: ["customer_feedback_id"]
                        isOneToOne: false
                        referencedRelation: "customer_feedback"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "analytics_short_url_id_fkey"
                        columns: ["short_url_id"]
                        isOneToOne: false
                        referencedRelation: "short_urls"
                        referencedColumns: ["id"]
                    },
                ]
            }
            businesses: {
                Row: {
                    facebook_url: string | null
                    google_maps_url: string | null
                    id: string
                    logo_url: string | null
                    name: string
                    yelp_url: string | null
                }
                Insert: {
                    facebook_url?: string | null
                    google_maps_url?: string | null
                    id?: string
                    logo_url?: string | null
                    name: string
                    yelp_url?: string | null
                }
                Update: {
                    facebook_url?: string | null
                    google_maps_url?: string | null
                    id?: string
                    logo_url?: string | null
                    name?: string
                    yelp_url?: string | null
                }
                Relationships: []
            }
            customer_feedback: {
                Row: {
                    business_id: string
                    created_at: string | null
                    email: string | null
                    feedback: string | null
                    id: string
                    ip_address: string | null
                    name: string | null
                    phone: string | null
                    rating: number | null
                    short_url_id: string | null
                }
                Insert: {
                    business_id: string
                    created_at?: string | null
                    email?: string | null
                    feedback?: string | null
                    id?: string
                    ip_address?: string | null
                    name?: string | null
                    phone?: string | null
                    rating?: number | null
                    short_url_id?: string | null
                }
                Update: {
                    business_id?: string
                    created_at?: string | null
                    email?: string | null
                    feedback?: string | null
                    id?: string
                    ip_address?: string | null
                    name?: string | null
                    phone?: string | null
                    rating?: number | null
                    short_url_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "customer_feedback_business_id_fkey"
                        columns: ["business_id"]
                        isOneToOne: false
                        referencedRelation: "businesses"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "customer_feedback_short_url_id_fkey"
                        columns: ["short_url_id"]
                        isOneToOne: false
                        referencedRelation: "short_urls"
                        referencedColumns: ["id"]
                    },
                ]
            }
            short_urls: {
                Row: {
                    business_id: string
                    id: string
                    qr_code_url: string | null
                    short_code: string
                }
                Insert: {
                    business_id: string
                    id?: string
                    qr_code_url?: string | null
                    short_code: string
                }
                Update: {
                    business_id?: string
                    id?: string
                    qr_code_url?: string | null
                    short_code?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "short_urls_business_id_fkey"
                        columns: ["business_id"]
                        isOneToOne: false
                        referencedRelation: "businesses"
                        referencedColumns: ["id"]
                    },
                ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never