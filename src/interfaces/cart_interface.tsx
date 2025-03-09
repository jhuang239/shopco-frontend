interface ProductImage {
    id: string;
    file_name: string;
    url: string;
}

interface Category {
    id: string;
    name: string;
}

interface Product {
    name: string;
    price: number;
    ProductImgs: ProductImage[];
    categories: Category[];
}

interface CartItem {
    id: string;
    user_id: string;
    product_id: string;
    quantity: number;
    color: string;
    size: string;
    createdAt: string;
    updatedAt: string;
    Product: Product;
}

export type { ProductImage, Product, CartItem };