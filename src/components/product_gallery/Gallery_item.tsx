import { Product } from "../../interfaces/fetch_products_interface";
import { Link } from "react-router-dom";
import FullStar from "../stars/Full_Star";
import HalfStar from "../stars/Half_Star";
import ZeroStar from "../stars/Zero_star";

const GalleryItem: React.FC<Product> = (product) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 min-h-[370px]">
            <Link
                to={`/Shop/${product.categories[0].name}/${product.id}`}
                state={{ categoryId: product.categories[0].id }}
            >
                <img
                    src={product.ProductImgs[0].url}
                    alt={product.ProductImgs[0].file_name}
                    className="w-full object-cover"
                />
            </Link>
            <div className="p-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <div className="flex items-center my-2">
                    {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        const rating = Number(product.averageRating) || 0;

                        // Full star
                        if (starValue <= rating) {
                            return (
                                <FullStar
                                    w={5}
                                    h={5}
                                    key={`p-${index}`}
                                    index={index}
                                />
                            );
                        }
                        // Half star
                        else if (starValue - 0.5 <= rating) {
                            return (
                                <HalfStar
                                    w={5}
                                    h={5}
                                    key={`p-${index}`}
                                    index={index}
                                />
                            );
                        }
                        // Empty star
                        else {
                            return (
                                <ZeroStar
                                    w={5}
                                    h={5}
                                    key={`p-${index}`}
                                    index={index}
                                />
                            );
                        }
                    })}
                    <span className="ml-1 text-sm text-gray-600">
                        {Number(product.averageRating).toFixed(1) || 0} / 5.0
                    </span>
                </div>
                <span className="text-lg font-bold">${product.price}</span>
            </div>
        </div>
    );
};

export default GalleryItem;
