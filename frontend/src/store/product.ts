import { create } from "zustand";

export type Product = {
  _id?: string;
  name: string;
  price: string;
  image: string;
};

type CreateProductResult = {
  success: boolean;
  message: string;
};

type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (newProduct: Product) => Promise<CreateProductResult>;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: "Please fill in all fields",
      };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));
    return {
      success: data.success,
      message: "Product created successfully",
    };
  },
}));

