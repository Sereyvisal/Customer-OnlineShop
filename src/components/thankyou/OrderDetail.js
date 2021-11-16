import { getOrderDetail } from "utils/auth"
import { useState } from "react";
import serverConfig from "utils/serverConfig";

function getProductAttribute(item) {
    var attr = "";
    var keyNames = Object.keys(item);

    for (var j = 0; j < keyNames.length; j++) {
        var key = Object.keys(item)[j];
        var value = item[key];

        attr += `<p>${key}: ${value}</p>`;
        // if (j != keyNames.length - 1) {
        //     attr += ", ";
        // }
    }

    return attr;
}

function getTotalPrice(products) {
    var total = 0;

    if (products) {
        for (var p of products) {
            total += p.product_info.selling_price * p.order_qty;
        }
    }

    return '$' + (total).toFixed(2);
}

const OrderDetail = () => {
    const [orderData, setOrderData] = useState(JSON.parse(getOrderDetail()));

    return (
        <div className="mt-10">
            <h1 className="uppercase text-xl font-medium mb-4">Order Details</h1>

            <table className="w-full mb-4 text-gray-700">
                <tbody>
                    <tr className="border">
                        <th colSpan="2" className="text-left p-3 font-medium text-black">Product</th>
                        <th className="w-20 font-medium text-black">Quantity</th>
                        <th className="text-right p-3 font-medium text-black">Subtotal</th>
                    </tr>

                    {orderData && orderData.products.map((p, index) => (
                        <tr className="border" key={index}>
                            <td className="p-3 w-40">
                                <img src={(p.product_info.image) ? serverConfig.file_url + p.product_info.image : serverConfig.blank_product_img} alt="" className="h-36 w-32 object-cover object-top rounded-md" />
                            </td>
                            <td className="text-left p-3">
                                <p className="font-medium">{p.product_info.product_id.name}</p>
                                <span dangerouslySetInnerHTML={{ __html: getProductAttribute(p.product_info.attr) }}></span>
                            </td>
                            <td className="text-center font-medium">x{p.order_qty}</td>
                            <td className="text-right p-3">${(p.product_info.selling_price * p.order_qty).toFixed(2)}</td>
                        </tr>
                    ))
                    }

                    <tr className="border">
                        <td className="text-left p-3 font-medium">Subtotal:</td>
                        <td></td>
                        <td></td>
                        <td className="text-right p-3 font-medium">{getTotalPrice(orderData.products)}</td>
                    </tr>

                    <tr className="border text-black">
                        <td className="text-left p-3 font-medium">Total:</td>
                        <td></td>
                        <td></td>
                        <td className="text-right p-3 font-medium">{getTotalPrice(orderData.products)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetail