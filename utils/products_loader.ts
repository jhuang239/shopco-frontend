import axios from "axios";


type Product = {
    id: number;
    name: string;
    price: number;
}

const productLoader = async (productType: string, numOfItem?: number) => {
    let url = import.meta.env.VITE_API_URL;

    if (productType === "all") {
        url += "/products";
    } else {

    }

    return null;

}

export default productLoader;