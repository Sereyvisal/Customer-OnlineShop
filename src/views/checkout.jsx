import Breadcrumb from "components/Breadcrumb";
import CheckOutInfo from "components/checkout/CheckOutInfo";
import Cover from "components/checkout/Cover"
import { useLocation } from 'react-router-dom';

const CheckOutPage = () => {
    document.title = "ONLINESHOP - Check Out";
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
                <CheckOutInfo />
            </div>
        </div>
    )
}

export default CheckOutPage;