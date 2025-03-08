import { useQuery } from '@tanstack/react-query';
import { getProductDetails } from "../../utils/http";
import { useLocation } from "react-router-dom";
import { isUUID4 } from '../../utils/isUUID4';
import Page_Indicator from "../components/page_indicator/Indicator";
import Image_Gallery from "../components/product_details/Image_Gallery";
import Details from "../components/product_details/Details";
import Tabs from '../components/product_details/Tabs';
import ReviewList from '../components/product_details/Review_List';
import Suggested_Products from '../components/product_details/Suggested_Product';

const Product_Detail_Page: React.FC = () => {

    const location = useLocation();
    const id = location.pathname.split("/").find((path) => isUUID4(path)) || '';


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductDetails(id)
    });


    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-12 py-4 mt-4">
                {isLoading &&
                    <div className="text-center flex items-center justify-center w-full p-8 h-100">
                        <h1 className='text-3xl font-header uppercase'>Loading...</h1>
                    </div>
                }
                {isError && <div className="text-center flex items-center justify-center w-full p-8 h-100">
                    <h1 className='text-3xl font-header uppercase'>{error instanceof Error ? error.message : 'An error occurred'}</h1>
                </div>}
                {data &&
                    <>
                        <div className="flex gap-4">
                            {<Page_Indicator productTitle={data.name} />}
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="md:col-span-1 col-span-2">
                                <Image_Gallery images={data.ProductImgs} />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <Details product={data} />
                            </div>
                        </div>
                        <Tabs />
                        <ReviewList reviews={data.Reviews} />
                        <Suggested_Products />
                    </>
                }
            </div>
        </div>
    )
}

export default Product_Detail_Page;