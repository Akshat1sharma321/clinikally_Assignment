
import { ProductSearchResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

export async function searchProducts(
  query: string,
  limit: number = 10,
  skip: number = 0
): Promise<ProductSearchResponse> {
  try {
    if (!query || query.length < 2) {
      return { products: [], total: 0, skip, limit };
    }

    const response = await fetch(
      `${BASE_URL}/products/search?q=${encodeURIComponent(
        query
      )}&limit=${limit}&skip=${skip}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to search products:", error);
    throw error;
  }
}
