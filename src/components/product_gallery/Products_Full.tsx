import {
    ProductsResponse,
    Product,
} from "../../interfaces/fetch_products_interface";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faSliders,
} from "@fortawesome/free-solid-svg-icons";
import GalleryItem from "./Gallery_item";
import { PageContext } from "../../context/pageContext";

type ProductsFullProps = {
    products: ProductsResponse;
    category: string;
};

const ProductsFull: React.FC<ProductsFullProps> = ({ products, category }) => {
    const pageCtx = useContext(PageContext);
    const [sort, setSort] = useState<boolean>(true);

    const toggleFilterSidebar = () => {
        pageCtx.setShowFilterSidebar();
    };

    const sortHandler = () => {
        if (sort === false) {
            setSort(true);
            if (products.items.length === 0) return;
            products.items.sort((a: Product, b: Product) => a.price - b.price);
        } else {
            setSort(false);
            if (products.items.length === 0) return;
            products.items.sort((a: Product, b: Product) => b.price - a.price);
        }
    };

    let productsList = null;

    if (products && products.items.length > 0) {
        productsList = (
            <div className="grid grid-cols-6 gap-4 justify-items-center">
                {products.items.map((item, index: number) => {
                    return (
                        <div
                            key={`new_arrival_${index}`}
                            className="md:col-span-2 col-span-3  xl:min-w-[280px] md:min-w-[225px] sm:min-w-[250px] min-w-[200px] w-1/4 flex-shrink-0 mx-auto"
                        >
                            <GalleryItem {...(item as Product)} />
                        </div>
                    );
                })}
            </div>
        );
    } else {
        productsList = (
            <div className="text-center w-full p-8">
                <h1 className="text-3xl font-header uppercase">Loading...</h1>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-row gap-4 md:justify-between items-center relative px-6">
                <div>
                    <h1 className="text-2xl font-bold capitalize">
                        {decodeURIComponent(category)}
                    </h1>
                </div>
                <div>
                    <span className="text-gray-600">Sort by:</span>
                    <span
                        className="text-gray-800 mx-2 cursor-pointer"
                        onClick={sortHandler}
                    >
                        Most Popular
                        {sort === true ? (
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className="ml-2"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faChevronUp}
                                className="ml-2"
                            />
                        )}
                    </span>
                </div>
                <div className="absolute right-2 cursor-pointer text-gray-600 hover:text-gray-800 sm:hidden block">
                    <FontAwesomeIcon
                        icon={faSliders}
                        onClick={toggleFilterSidebar}
                    />
                </div>
            </div>
            {productsList}
        </div>
    );
};

export default ProductsFull;
