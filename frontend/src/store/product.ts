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
  fetchProducts: () => Promise<void>;
  deleteProduct: (pid: string) => Promise<CreateProductResult>;
  updateProduct: (pid: string, updatedProduct: Product) => Promise<CreateProductResult>;
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
  fetchProducts: async (): Promise<void> => {
    const res = await fetch("/api/products");
    const data: { data: Product[] } = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (pid: string): Promise<CreateProductResult> => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
       return {
      success: data.success,
      message: "Product deleted successfully",
    };
  } else {
    throw new Error(data.message);
    return {
      success: data.success,
      message: data.message,
    };
  }
},

updateProduct: async (pid: string, updatedProduct: Product): Promise<CreateProductResult> => {
  const res = await fetch(`/api/products/${pid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });
  const data = await res.json();
  if (data.success) {
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? { ...product, ...updatedProduct } : product
      ),
    }));
    return {
      success: data.success,
      message: "Product updated successfully",
    };
  } else {
    return {
      success: data.success,
      message: data.message,
    };
  }
  },   
}));

