import axios from "axios";
import { queryClient } from "./queryClient";
import { LoaderFunctionArgs } from "react-router-dom";
import { getToken } from "./Token";

const domain = import.meta.env.VITE_DOMAIN;
console.log("domain", domain);

// Create a proper query key factory
export const productsKeys = {
    all: ["products"] as const,
    page: (page: number) => [...productsKeys.all, "page", page] as const,
};

export const reviewsKeys = {
    all: ["reviews"] as const,
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

    if (category.toLocaleLowerCase() === "all") {
        url += `/all?page=${page}`;
    } else {
        url += `/category?page=${page}&categoryName=${category}`;
    }

    const products = await axios.get(url);
    return products.data;
};

// Fetcher function for products by brand
const getProductsByBrand = async (brand: string, page: number) => {
    const encodedBrand = brand.replace(/ /g, "%20").replace(/&/g, "%26");

    const response = await axios.get(
        `${domain}/products/brand?page=${page}&brandName=${encodedBrand}`
    );
    return response.data;
};

// Fetcher function for products by filters
export type filterProps = {
    style_ids: string[];
    brand_id: string | null;
    category_ids: string[];
    product_name: string | null;
};

const getProductsByFilters = async (filter: filterProps, page: number) => {
    const response = await axios.post(
        `${domain}/products/search?page=${page}`,
        {
            category_ids: filter.category_ids,
            style_ids: filter.style_ids,
            brand_id: filter.brand_id,
            product_name: filter.product_name,
        },
        {
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
        }
    );
    return response.data;
};

// Fetcher function for categories
const getCategories = async () => {
    const categories = await axios.get(`${domain}/categories`);
    return categories.data;
};

// Fetcher function for styles
const getStyles = async () => {
    const styles = await axios.get(`${domain}/styles`);
    return styles.data;
};

// Fetcher function for product details
const getProductDetails = async (id: string) => {
    const product = await axios.get(`${domain}/products/${id}`);
    return product.data;
};

// Fetcher function for latest products
const getLatestProducts = async () => {
    const products = await axios.get(`${domain}/products/latest`);
    return products.data;
};

// Login mutation function
const login = async (data: { username: string; password: string }) => {
    const response = await axios.post(`${domain}/auth/login`, data);
    return response.data;
};

// Fetcher function for add product into cart
const addProductToCart = async (data: {
    product_id: string;
    quantity: number;
    size: string;
    color: string;
}) => {
    const response = await axios.post(`${domain}/cart/addProductToCart`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    console.log("addProductToCart", response.data);
    return response.data;
};

const getCartQuantity = async () => {
    const response = await axios.get(`${domain}/cart/quantity`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
};

const getCart = async () => {
    const response = await axios.get(`${domain}/cart`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
};

const increaseProductQuantity = async (data: { id: string }) => {
    const response = await axios.put(
        `${domain}/cart/increaseProductQuantity`,
        data,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return response.data;
};

const reduceProductQuantity = async (data: { id: string }) => {
    const response = await axios.put(
        `${domain}/cart/reduceProductQuantity`,
        data,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return response.data;
};

const removeProductFromCart = async (data: { id: string }) => {
    const response = await axios.delete(
        `${domain}/cart/removeProductFromCart`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            data: data,
        }
    );
    return response.data;
};

const clearCart = async () => {
    const response = await axios.delete(`${domain}/cart/clearCart`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
};

const getBrands = async () => {
    const response = await axios.get(`${domain}/brands`);
    return response.data;
};

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

export {
    getProductsAndReviews,
    getProducts,
    getCategories,
    getStyles,
    getProductDetails,
    getLatestProducts,
    login,
    addProductToCart,
    getCartQuantity,
    getCart,
    increaseProductQuantity,
    reduceProductQuantity,
    removeProductFromCart,
    clearCart,
    getBrands,
    getProductsByBrand,
    getProductsByFilters,
};
