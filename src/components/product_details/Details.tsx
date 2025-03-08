import { Product } from "../../interfaces/fetch_products_interface";
import RenderStars from "../stars/Render_Stars";
import Color from "./Color";
import Size from "./Size";
import Add_To_Cart from "./Add_To_Cart";

interface DetailsProps {
    product: Product;
}

const Details: React.FC<DetailsProps> = ({ product }) => {
    return (
        <div className="flex flex-col justify-between gap-2 md:ml-4 lg:max-h-[500px] h-full">
            <div className="flex flex-col gap-2">
                <h1 className="font-header text-4xl">{product.name}</h1>
                <div className="flex items-center my-2">
                    <div className="flex space-x-1">
                        <RenderStars rating={Number(product.averageRating)} />
                    </div>
                    <span className="ml-4 text-xl font-bold text-gray-600">
                        {Number(product.averageRating).toFixed(1) || 0} / 5.0
                    </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">${product.price}</h2>
                <p className="text-sm text-gray-600 text-justify line-clamp-4">
                    {product.description}
                </p>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
                <Color />
                <Size />
                <Add_To_Cart />
            </div>
        </div>
    );
};

export default Details;
