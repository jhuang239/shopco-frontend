import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTag } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { clearCart } from "../../../utils/http";
import { queryClient } from "../../../utils/queryClient";
import { PageContext } from "../../context/pageContext";

type CheckoutProps = {
    subtotal: number;
    discount: number;
    deliveryFee: number;
};

const Checkout: React.FC<CheckoutProps> = ({ subtotal, discount, deliveryFee }) => {

    const [cartSubtotal, setCartSubtotal] = useState<number>(0);
    const [cartDiscount, setCartDiscount] = useState<number>(0);

    const pageCtx = useContext(PageContext);

    const checkOut = async () => {
        const data = await clearCart();
        return data;
    }

    const { mutate, isLoading, isError } = useMutation({
        mutationFn: checkOut,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            pageCtx.clearCartQuantity();
        }
    });

    const handleCheckout = () => {
        mutate();
    }

    useEffect(() => {
        setCartSubtotal(subtotal);
        setCartDiscount(parseFloat((subtotal * (discount / 100)).toFixed(2)));
    }, [subtotal, discount, deliveryFee]);

    return (
        <div className="border-1 border-gray-200 rounded-md flex flex-col gap-4 p-4">
            <h1 className="font-bold text-xl text-black capitalize">order summary</h1>
            <div className="flex justify-between">
                <span className="text-gray-600 text-lg">Subtotal</span>
                <span className="text-black font-bold text-lg">${cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600 text-lg">Discount{` (${discount}%)`}</span>
                <span className="text-black font-bold text-lg">${cartDiscount}</span>
            </div>
            <div className="flex justify-between  pb-2 border-b-1 border-gray-200">
                <span className="text-gray-600 text-lg">Delivery Fee</span>
                <span className="text-black font-bold text-lg">${deliveryFee}</span>
            </div>
            <div className="flex justify-between pt-2">
                <span className="text-black text-lg">Total</span>
                <span className="text-black font-bold text-lg">${cartSubtotal - cartDiscount + deliveryFee}</span>
            </div>
            <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-row gap-2 rounded-3xl p-2 w-2/3 bg-gray-200 border-1 border-gray-200 items-center">
                    <FontAwesomeIcon icon={faTag} className="text-gray-400" />
                    <input type="text" placeholder="Enter Promo Code" className="w-full outline-0" />
                </div>
                <button className="bg-black text-white rounded-3xl p-2 w-1/3 cursor-pointer">Apply</button>
            </div>
            <div className="flex justify-center items-center gap-4 bg-black rounded-3xl" onClick={handleCheckout}>
                <button disabled={isLoading || isError} className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white w-full p-3">Proceed to Checkout<FontAwesomeIcon icon={faArrowRight} className="text-white ml-3" /></button>
            </div>
        </div>
    )
}

export default Checkout;