import axios from "axios";

type Product = {
    id: number;
    name: string;
    price: number;
}

const productLoader: (numOfItem: number, type: string) => Promise<Product[]> = async () => {
    const domain = import.meta.env.VITE_DOMAIN;

    return [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 }
    ];
}

export default productLoader;