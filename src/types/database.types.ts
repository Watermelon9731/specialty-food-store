export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Product: {
        Row: {
          id: string;
          sku: string;
          name: string;
          description: string | null;
          pricePerUnit: number;
          unitType: string;
          stockQuantity: number;
          origin: string;
          shelfLifeDays: number;
          isDeleted: boolean;
          createdAt: string;
          updatedAt: string;
          categoryId: string;
        };
        Insert: {
          id?: string;
          sku: string;
          name: string;
          description?: string | null;
          pricePerUnit: number;
          unitType: string;
          stockQuantity?: number;
          origin: string;
          shelfLifeDays?: number;
          isDeleted?: boolean;
          createdAt?: string;
          updatedAt?: string;
          categoryId: string;
        };
        Update: {
          id?: string;
          sku?: string;
          name?: string;
          description?: string | null;
          pricePerUnit?: number;
          unitType?: string;
          stockQuantity?: number;
          origin?: string;
          shelfLifeDays?: number;
          isDeleted?: boolean;
          updatedAt?: string;
          categoryId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Product_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
        ];
      };
      Category: {
        Row: {
          id: string;
          name: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          name: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          name?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      InventoryLog: {
        Row: {
          id: string;
          quantityChange: number;
          batchNumber: string | null;
          expiryDate: string | null;
          reason: string | null;
          productId: string;
          createdAt: string;
        };
        Insert: {
          id?: string;
          quantityChange: number;
          batchNumber?: string | null;
          expiryDate?: string | null;
          reason?: string | null;
          productId: string;
          createdAt?: string;
        };
        Update: {
          quantityChange?: number;
          batchNumber?: string | null;
          expiryDate?: string | null;
          reason?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "InventoryLog_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "Product";
            referencedColumns: ["id"];
          },
        ];
      };
      Order: {
        Row: {
          id: string;
          orderNumber: string;
          customerName: string;
          customerPhone: string;
          customerAddress: string | null;
          productName: string | null;
          productId: string | null;
          amount: number;
          status: string;
          isDeleted: boolean;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          orderNumber: string;
          customerName: string;
          customerPhone: string;
          customerAddress?: string | null;
          productName?: string | null;
          productId?: string | null;
          amount: number;
          status?: string;
          isDeleted?: boolean;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          orderNumber?: string;
          customerName?: string;
          customerPhone?: string;
          customerAddress?: string | null;
          productName?: string | null;
          productId?: string | null;
          amount?: number;
          status?: string;
          isDeleted?: boolean;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Order_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "Product";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_monthly_revenue: {
        Args: Record<string, never>;
        Returns: { month: string; revenue: number; count: number }[];
      };
    };
    Enums: Record<string, never>;
  };
}
