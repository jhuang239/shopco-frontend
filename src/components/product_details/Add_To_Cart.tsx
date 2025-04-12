import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { PageContext } from "../../context/pageContext";
import { addProductToCart } from "../../../utils/http";

type AddToCartProps = {
    productId: string;
    color: string;
    size: string;
};

const Add_To_Cart: React.FC<AddToCartProps> = ({ productId, color, size }) => {
    const pageCtx = useContext(PageContext);

    const [quantity, setQuantity] = useState<number>(1);

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setQuantity(1);
            return;
        } else if (Number(e.target.value) < 1) {
            setQuantity(1);
            return;
        } else {
            setQuantity(Number(e.target.value));
        }
    };

    const handleAdd = () => {
        setQuantity(quantity + 1);
    };

    const handleSubtract = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        if (pageCtx.isLogged && pageCtx.token) {
            const data = await addProductToCart({
                product_id: productId,
                quantity,
                size,
                color,
            });
            pageCtx.setCartQuantity(data.id, "add");
        } else {
            pageCtx.setShowLoginModal();
        }
    };

    return (
        <div className="grid grid-cols-3 gap-4 w-full border-t-2 border-gray-200 pt-4">
            <div className="flex flex-row justify-between col-span-1 w-full rounded-4xl bg-gray-200">
                <button
                    onClick={handleSubtract}
                    className="w-10 h-10 cursor-pointer hover:bg-gray-300 rounded-l-4xl px-2"
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleChangeQuantity}
                    className="w-10 h-10 text-center"
                />
                <button
                    onClick={handleAdd}
                    className="w-10 h-10 cursor-pointer hover:bg-gray-300 rounded-r-4xl px-2"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className="col-span-2">
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-black text-white rounded-4xl py-2 hover:bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity < 1 || !color || !size}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Add_To_Cart;
