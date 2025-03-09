import Cart_Product_Item from "./Cart_Product_Item";
import { CartItem } from "../../interfaces/cart_interface";

type CartProductListProps = {
    CartItems: CartItem[];
}

const Cart_Product_List: React.FC<CartProductListProps> = ({ CartItems }) => {
    return (
        <div className="md:max-h-[800px] max-h-[500px] overflow-y-auto no-scrollbar">
            {
                CartItems && CartItems.map((item: CartItem, index: number) => {
                    if (index === CartItems.length - 1) {
                        return <Cart_Product_Item key={index} CartItem={item} lastItem={true} />
                    } else {
                        return <Cart_Product_Item key={index} CartItem={item} />
                    }
                })
            }

        </div >
    )
}
export default Cart_Product_List;