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
          slug: string;
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
          isFeatured: boolean;
          img: string | null;
          images: string[] | null;
          note: string | null;
          isMarketPrice: boolean | null;
        };
        Insert: {
          id?: string;
          sku: string;
          slug: string;
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
          isFeatured?: boolean;
          img?: string | null;
          images?: string[] | null;
          note?: string | null;
          isMarketPrice?: boolean | null;
        };
        Update: {
          id?: string;
          sku?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          pricePerUnit?: number;
          unitType?: string;
          stockQuantity?: number;
          origin?: string;
          shelfLifeDays?: number;
          isDeleted?: boolean;
          updatedAt?: string;
          isFeatured?: boolean;
          img?: string | null;
          images?: string[] | null;
          note?: string | null;
          isMarketPrice?: boolean | null;
        };
        Relationships: [];
      };
      Category: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image?: string | null;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image?: string | null;
          updatedAt?: string;
        };
        Relationships: [];
      };
      ProductCategory: {
        Row: {
          productId: string;
          categoryId: string;
        };
        Insert: {
          productId: string;
          categoryId: string;
        };
        Update: {
          productId?: string;
          categoryId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ProductCategory_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "Product";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ProductCategory_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
        ];
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
          orderDescription: string | null;
          amount: number;
          deliveryStatus: string;
          paymentStatus: string;
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
          orderDescription?: string | null;
          amount: number;
          deliveryStatus?: string;
          paymentStatus?: string;
          isDeleted?: boolean;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          orderNumber?: string;
          customerName?: string;
          customerPhone?: string;
          customerAddress?: string | null;
          orderDescription?: string | null;
          amount?: number;
          deliveryStatus?: string;
          paymentStatus?: string;
          isDeleted?: boolean;
          updatedAt?: string;
        };
        Relationships: [];
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
