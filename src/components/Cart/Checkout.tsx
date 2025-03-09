import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTag } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

type CheckoutProps = {
    subtotal: number;
    discount: number;
    deliveryFee: number;
};

const Checkout: React.FC<CheckoutProps> = ({ subtotal, discount, deliveryFee }) => {

    const [cartSubtotal, setCartSubtotal] = useState<number>(0);
    const [cartDiscount, setCartDiscount] = useState<number>(0);

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
                <button className="bg-black text-white rounded-3xl p-2 w-1/3">Apply</button>
            </div>
            <div className="flex flex-row justify-center items-center gap-4 w-full bg-black rounded-3xl p-3">
                <button className=" text-white">Proceed to checkout</button>
                <FontAwesomeIcon icon={faArrowRight} className="text-white" />
            </div>
        </div>
    )
}

export default Checkout;