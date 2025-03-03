interface ProductImage {
    id: string;
    file_name: string;
    url: string;
}

interface Category {
    id: string;
    name: string;
}

interface Style {
    id: string;
    name: string;
}

interface Brand {
    id: string;
    name: string;
}

interface Sale {
    // Since the Sales array is empty in your example,
    // we'll leave this as a generic object for now
    [key: string]: unknown;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category_ids: string[];
    brand_id: string;
    style_ids: string[];
    createdAt: string;
    updatedAt: string;
    averageRating: string;
    categories: Category[];
    styles: Style[];
    Brand: Brand;
    ProductImgs: ProductImage[];
    Sales: Sale[];

    // The following fields weren't in your examples but might exist in other products
    discountPrice?: number;
    isOnSale?: boolean;
    colors?: string[];
    sizes?: string[];
    weight?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
    material?: string;
    warrantyInfo?: string;
    isAvailable?: boolean;
    featuredImage?: string;
    tags?: string[];
}

// For the response format with pagination
interface ProductsResponse {
    items: Product[];
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
}

export type {
    Product,
    ProductsResponse
}