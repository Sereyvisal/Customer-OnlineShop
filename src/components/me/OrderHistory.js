import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setOrders } from "redux/actions";
import { status_type, meta } from "utils/enum";
import serverConfig from "utils/serverConfig";
import { useHistory } from "react-router";
import { upsertCart } from "api/cart";
import { getInventoryByProductId } from "api/inventory";
import { getOrderByCustomer } from "api/order";
import { getUserId } from "utils/auth";

const tabs = ["All", "Pending", "Delivering", "Complete", "Cancel"];

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

function getTotalPrice(order) {
    var total = 0;

    if (order) {
        for (var p of order.products) {
            total += p.product_info.selling_price * p.order_qty;
        }
    }

    return '$' + (total).toFixed(2);
}

const OrderHistory = () => {
    const { userInfo } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const [orderList, setOrderList] = useState([]);
    const [toggleState, setToggleState] = useState(0);
    const [filterOrder, setFilterOrder] = useState([]);

    useEffect(() => {
        if (!orderList.length) {
            getOrderByCustomer(getUserId()).then(async res => {
                if (res.meta == meta.OK) {
                    // dispatch(setOrders(res.datas));
                    setOrderList(res.datas);
                    setFilterOrder(res.datas);
                }
            })
            .catch(err => {
                console.log(err)
            });
        }

        if (orderList.orderList && !filterOrder) {
            setFilterOrder(orderList);
        }
    }, [orderList, filterOrder]);

    const toggleTab = (index) => {
        setToggleState(index);

        if (index == 0) {
            setFilterOrder(orderList);
        }
        else if (index == 1) {
            var filter = orderList.filter(e => e.status[0].type == status_type.Pending);
            setFilterOrder(filter);
        }
        else if (index == 2) {
            var filter = orderList.filter(e => e.status[0].type == status_type.Deliver);
            setFilterOrder(filter);
        }
        else if (index == 3) {
            var filter = orderList.filter(e => e.status[0].type == status_type.Complete);
            setFilterOrder(filter);
        }
        else if (index == 4) {
            var filter = orderList.filter(e => e.status[0].type == status_type.Cancel);
            setFilterOrder(filter);
        }
    }

    const handleReorder = async (products) => {
        if (!userInfo) {
            history.push(`/login`);
        }
        else {
            for await (var p of products) {
                var upsertData = {
                    customer: userInfo._id,
                    product: { _id: p.product_info._id, cart_qty: p.order_qty}
                }

                var updated = {};

                await upsertCart(upsertData).then(async res => {
                    if (res.meta == meta.OK) {
                        for (var p of res.data.products) {
                            await getInventoryByProductId(p.product._id).then(inventory => {
                                if (inventory.meta == meta.OK) {
                                    p.inventory_id = inventory.data._id;
                                    p.product.stock_qty = inventory.data.qty;
                                }
                                else if (inventory.meta == meta.NOTEXIST) {
                                    p.product.stock_qty = 0;
                                }
                            })
                        }

                        updated = res.data;
                    }
                })
            }

            dispatch(setCart(updated));
            history.push(`/shoppingcart`);
        }
    }

    return (
        <div className="rounded bg-white shadow p-6">
            <p className="uppercase font-medium text-lg mb-4">Order History</p>

            {/* Tabs */}
            <div className="w-full mx-auto mt-4">
                <ul id="tabs" className="inline-flex pt-2 px-1 w-full justify-center">
                    {
                        tabs.map((tab, index) => (
                            <li
                                key={index}
                                className={[toggleState === index ? "duration-300 transition ease-in border-yellow-500" : "", "border-b-2 border-transparent px-3 xs:px-3 sm:px-4 md:px-6 text-gray-800 font-semibold py-2 uppercase cursor-pointer"].join(" ")}
                                onClick={() => toggleTab(index)}
                            >
                                {tab}
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/* <hr /> */}

            {/* Tab-content */}
            <div>
                {
                    tabs.map((tab, index) => (
                        <div key={index} className={toggleState === index ? "block mt-4" : "hidden"}>
                            <table className="w-full bg-white rounded text-center">
                                <tbody>
                                    <tr className="border">
                                        <th className="text-left text-sm p-3 px-5 w-36 border">Order Number</th>
                                        <th className="text-left text-sm p-3 px-5 border">Product</th>
                                        <th className="text-smp-3 px-5 w-32 border">Order Date</th>
                                        <th className="text-smp-3 px-5 w-28 border">Total</th>
                                        <th className="text-sm w-10 border"></th>
                                    </tr>
                                    {
                                        filterOrder && filterOrder.map((order, index) => (
                                            <tr className="border" key={index}>
                                                <td className="text-sm p-3 px-5 pl-0 border">{order.order_no}</td>
                                                <td className="text-sm p-0">
                                                    {
                                                        order.products.map((p, index) => (
                                                            <tr key={index} className="border-b w-full">
                                                                <td className="text-sm p-4 w-32">
                                                                    <img
                                                                        src={(p.product_info.image) ? serverConfig.file_url + p.product_info.image : serverConfig.blank_product_img}
                                                                        className="h-28 w-24 object-cover object-top rounded-md m-0"
                                                                    />
                                                                </td>
                                                                <td className="text-sm p-3 pl-2 pr-5 text-left">
                                                                    <p className="font-medium">{p.product_info.product_id.name}</p>
                                                                    <p>Product No: {p.product_info.product_id.product_no}</p>
                                                                    {/* <p>{getProductAttribute(p.product_info.attr)}</p> */}
                                                                    <span dangerouslySetInnerHTML={{ __html: getProductAttribute(p.product_info.attr) }}></span>
                                                                    <p>Quantity: {p.order_qty}</p>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </td>
                                                <td className="text-sm p-3 px-5 border">{moment(order.order_date).format('LL')}</td>
                                                <td className="text-sm p-3 px-5 border">{getTotalPrice(order)}</td>
                                                <td className="text-sm p-3 border">
                                                    <div onClick={() => handleReorder(order.products)} className="flex justify-center">
                                                        <div className="duration-200 transition ease-in w-20 flex justify-center items-center py-2 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded text-yellow-500 cursor-pointer">
                                                            <div className="flex items-center text-xs uppercase font-medium">
                                                                Reorder
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            {!filterOrder || (filterOrder && filterOrder.length == 0) &&
                                <div className="flex items-center justify-center pt-10 pb-12">
                                    Your order history is empty.
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OrderHistory