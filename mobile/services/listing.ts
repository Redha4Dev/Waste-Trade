import api from "../utils/axios"

export type Listing = {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: string;
  images?: string[];
  createdAt?: string;
};

export async function getAllListings(): Promise<Listing[]> {
  try {
    const res = await api.get("/api/product/getAllProducts");

    // same structure as your web app
    return res.data.products;
  } catch (error) {
    console.log("Error fetching listings:", error);
    throw error;
  }
}
