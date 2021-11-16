import Lottie from "lottie-react";
import success from "assets/success.json"
import OrderDetail from "./OrderDetail";
import moment from "moment";
import { getOrderDetail } from "utils/auth"
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

function getTotalPrice(products) {
    var total = 0;

    if (products) {
        for (var p of products) {
            total += p.product_info.selling_price * p.order_qty;
        }
    }

    return '$' + (total).toFixed(2);
}

const ThankYou = () => {
    const [orderData, setOrderData] = useState(JSON.parse(getOrderDetail()));

    return (
        <div className="my-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-0 lg:max-w-none">
                    <div className="flex justify-center pt-10 pb-6">
                        <Lottie animationData={success} loop={false} className="w-28 h-28" />
                    </div>

                    <div className="text-center text-xl">Thank you. Your order has been received.</div>

                    <div className="grid sm:grid-cols-3 gap-4 mt-10">
                        <div className="text-center border-dashed border-b pb-4 sm:border-b-0 sm:pb-0 sm:border-r border-gray-400">
                            <p className="uppercase md:text-lg">Order Number:</p>
                            <p className="font-medium text-lg md:text-xl">{orderData.order_no}</p>
                        </div>

                        <div className="text-center border-dashed border-b pb-4 sm:border-b-0 sm:pb-0 sm:border-r border-gray-400">
                            <p className="uppercase md:text-lg">Date:</p>
                            <p className="font-medium text-lg md:text-xl">{moment(orderData.order_date).format('LL')}</p>
                        </div>

                        <div className="text-center">
                            <p className="uppercase md:text-lg">Total:</p>
                            <p className="font-medium text-lg md:text-xl">{getTotalPrice(orderData.products)}</p>
                        </div>
                    </div>

                    <OrderDetail />

                    <div className="flex justify-center">
                        <Link to="/shop" className="duration-200 transition ease-in w-52 flex justify-center items-center py-3 mt-6 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded text-sm text-yellow-500 cursor-pointer">
                            <div className="flex items-center text-xs sm:text-xs md:text-sm uppercase font-medium">
                                Continue Shopping
                                <BsArrowRight className="ml-2 text-base" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThankYou