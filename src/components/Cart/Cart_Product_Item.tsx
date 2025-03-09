import { CartItem } from "../../interfaces/cart_interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { increaseProductQuantity, reduceProductQuantity, removeProductFromCart } from "../../../utils/http";
import { queryClient } from "../../../utils/queryClient";
import { PageContext } from "../../context/pageContext";

type CartProductItemProps = {
    CartItem: CartItem;
    lastItem?: boolean;
}

const Cart_Product_Item: React.FC<CartProductItemProps> = ({ CartItem, lastItem }) => {

    const pageCtx = useContext(PageContext);

    const [quantity, setQuantity] = useState<number>(CartItem.quantity);

    const modifyCart = async (type: string) => {
        if (type === "add") {
            const data = await increaseProductQuantity({ id: CartItem.id });
            return { type, data };
        } else if (type === "subtract") {
            const data = await reduceProductQuantity({ id: CartItem.id });
            return { type, data };
        } else {
            const data = await removeProductFromCart({ id: CartItem.id });
            pageCtx.setCartQuantity(CartItem.product_id, "remove");
            return { type, data };
        }
    }

    const { mutate, isLoading } = useMutation({
        mutationFn: modifyCart,
        // Show optimistic updates instantly
        onMutate: async (type) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["cart"] });

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData(["cart"]);

            // Optimistically update local state
            if (type === "add") {
                setQuantity(prev => prev + 1);
            } else if (type === "subtract" && quantity > 1) {
                setQuantity(prev => prev - 1);
            }

            // Return a context object with the snapshotted value
            return { previousCart };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, variables, context) => {
            console.error("Error modifying cart:", err);

            // Roll back to the previous cart query data
            if (context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart);
            }

            // Reset quantity to match CartItem from props
            setQuantity(CartItem.quantity);
        },
        // Always refetch after error or success
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
    });

    const handleAdd = () => {
        mutate("add");
    };

    const handleSubtract = () => {
        if (quantity > 1) {
            mutate("subtract");
        }
    };

    const handleDelete = () => {
        mutate("delete");
    }

    // Sync quantity with prop changes (when query refreshes)
    useEffect(() => {
        setQuantity(CartItem.quantity);
    }, [CartItem.quantity]);

    return (
        <div className="px-4">
            <div className={`${lastItem ? '' : 'border-b-1'} border-gray-200 grid grid-cols-5 gap-4 py-4`}>
                <Link to={`/Shop/${CartItem.Product.categories[0].name}/${CartItem.product_id}`}>
                    <div className="col-span-1">
                        <img src={CartItem.Product.ProductImgs[0].url} alt="product" className="w-full object-cover rounded-xl" />
                    </div>
                </Link>
                <div className="col-span-4 flex flex-col gap-1">
                    <div className="flex flex-row items-center justify-between">
                        <h4 className="text-md font-bold">{CartItem.Product.name}</h4>
                        <button onClick={handleDelete} className="text-red-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                    <div className="text-sm text-gray-600">Size: {CartItem.size}</div>
                    <div className="text-sm text-gray-600">Color: {CartItem.color}</div>
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-lg font-bold">${CartItem.Product.price}</div>
                        <div className="flex flex-row justify-between col-span-1 rounded-4xl bg-gray-200">
                            <button
                                onClick={handleSubtract}
                                className="w-10 h-10 cursor-pointer hover:bg-gray-300 rounded-l-4xl px-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading || quantity <= 1}
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <input
                                disabled={true}
                                type="number"
                                value={quantity}
                                className="w-10 h-10 text-center"
                            />
                            <button
                                onClick={handleAdd}
                                className="w-10 h-10 cursor-pointer hover:bg-gray-300 rounded-r-4xl px-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart_Product_Item;