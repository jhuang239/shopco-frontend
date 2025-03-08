import axios from "axios";
import { queryClient } from "./queryClient";
import { LoaderFunctionArgs } from "react-router-dom";

const domain = import.meta.env.VITE_DOMAIN;

// Create a proper query key factory
export const productsKeys = {
    all: ['products'] as const,
    page: (page: number) => [...productsKeys.all, 'page', page] as const,
};

export const reviewsKeys = {
    all: ['reviews'] as const,
};


// Fetcher function for products and reviews
const getProductsAndReviews = async (page: number) => {
    const products = await axios.get(`${domain}/products/all?page=${page}`);
    const reviews = await axios.get(`${domain}/reviewPublic/top9`);
    return { products: products.data, reviews: reviews.data };
};

// Fetcher function for products
const getProducts = async (category: string, page: number) => {
    let url = `${domain}/products`;

    if (category === 'all') {
        url += `/all?page=${page}`;
    } else {
        url += `/category?page=${page}&categoryName=${category}`;
    }

    const products = await axios.get(url);
    return products.data;
}

// Fetcher function for categories
const getCategories = async () => {
    const categories = await axios.get(`${domain}/categories`);
    return categories.data;
}

// Fetcher function for product details
const getProductDetails = async (id: string) => {
    const product = await axios.get(`${domain}/products/${id}`);
    return product.data;
}

// Fetcher function for latest products
const getLatestProducts = async () => {
    const products = await axios.get(`${domain}/products/latest`);
    return products.data;
}

// Login mutation function
const login = async (data: { username: string, password: string }) => {
    const response = await axios.post(`${domain}/auth/login`, data);
    return response.data;
}


// React Router loader that integrates with React Query
export async function productsAndReviewsLoader({ params }: LoaderFunctionArgs) {
    const page = params.page ? Number(params.page) : 1;

    // Use React Query's prefetchQuery to fetch and cache data
    await queryClient.ensureQueryData({
        queryKey: [productsKeys.page(page), reviewsKeys.all],
        queryFn: () => getProductsAndReviews(page),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return { page };
}

export { getProductsAndReviews, getProducts, getCategories, getProductDetails, getLatestProducts, login };