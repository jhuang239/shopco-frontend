import axios from "axios";
import { queryClient } from "./queryClient";
import { LoaderFunctionArgs } from "react-router-dom";

const domain = import.meta.env.VITE_DOMAIN;

// Create a proper query key factory
export const productsKeys = {
    all: ['products'] as const,
    page: (page: number) => [...productsKeys.all, 'page', page] as const,
};


// Fetcher function
const getProductsAndReviews = async (page: number) => {
    const products = await axios.get(`${domain}/products/all?page=${page}`);
    const reviews = await axios.get(`${domain}/reviewPublic/top9`);
    return { products: products.data, reviews: reviews.data };
};

// React Router loader that integrates with React Query
export async function productsLoader({ params }: LoaderFunctionArgs) {
    const page = params.page ? Number(params.page) : 1;

    // Use React Query's prefetchQuery to fetch and cache data
    await queryClient.ensureQueryData({
        queryKey: productsKeys.page(page),
        queryFn: () => getProductsAndReviews(page),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return { page };
}

export { getProductsAndReviews };