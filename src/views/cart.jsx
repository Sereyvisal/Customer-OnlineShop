import Breadcrumb from "components/Breadcrumb";
import CartInfo from "components/cart/CartInfo";
import Cover from "components/cart/Cover"
import { useLocation } from 'react-router-dom';

const CartPage = () => {
    document.title = "ONLINESHOP - Shopping Cart";
    const location = useLocation();
    const pages = location.pathname.split('/');

    return (
        <div>
            <div>
                <Cover />
            </div>

            <div>
                <Breadcrumb pages={pages} />
            </div>

            <div>
                <CartInfo />
            </div>

            {/* <Card isFull={true}>
                <div>page content</div>
            </Card> */}
        </div>
    )
}

export default CartPage;