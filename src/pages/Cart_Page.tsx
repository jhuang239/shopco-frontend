import Page_Indicator from "../components/page_indicator/Indicator";
import Cart_Product_List from "../components/Cart/Cart_Product_List";
import Checkout from "../components/Cart/Checkout";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../utils/http";
import { CartItem } from "../interfaces/cart_interface";

const Cart_Page: React.FC = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        refetchOnMount: true,
        staleTime: 0,
        cacheTime: 0
    });

    const countSubtotal = () => {
        let subtotal = 0;
        if (data) {
            data.forEach((item: CartItem) => {
                subtotal += item.Product.price * item.quantity;
            });
        }
        return subtotal;
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-12 py-4 mt-4">
                <div className="flex gap-4">
                    {<Page_Indicator />}
                </div>
                <div className="py-4">
                    <h1 className="text-3xl font-header">your cart</h1>
                </div>
                {isLoading &&
                    <div className="text-center flex items-center justify-center w-full p-8 h-100">
                        <h1 className='text-3xl font-header uppercase'>Loading...</h1>
                    </div>}

                {isError && <div className="text-center flex items-center justify-center w-full p-8 h-100">
                    <h1 className='text-3xl font-header uppercase'>{error instanceof Error ? error.message : 'An error occurred'}</h1>
                </div>}

                {data && data.length >= 0 &&
                    <>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="md:col-span-1 col-span-2 flex flex-col border-1 border-gray-200 rounded-md">
                                <Cart_Product_List CartItems={data} />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <Checkout subtotal={countSubtotal()} deliveryFee={15} discount={20} />
                            </div>
                        </div>
                    </>
                }
                {data && data.message &&
                    <div className="text-center flex items-center justify-center w-full p-8 h-100">
                        <h1 className='text-3xl font-header uppercase'>{data.message}</h1>
                    </div>
                }
            </div>
        </div>
    );
}

export default Cart_Page;