import { useTranslation } from 'react-i18next';
import { BsArrowRight } from "react-icons/bs"
import { Link } from "react-router-dom"
import serverConfig from 'utils/serverConfig';
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "redux/actions";
import { meta } from "utils/enum"
import { updateCartQty } from "../../api/cart"
import { getInventoryByProductId } from '../../api/inventory';

function getEachTotal(data) {
    var total = 0;

    if (data) {
        total = data.product.selling_price * data.cart_qty;    
    }

    return '$' + (total).toFixed(2);
}

function getTotalPrice(products) {
    var total = 0;

    if (products) {
        for (var p of products) {
            total += p.product.selling_price * p.cart_qty;
        }
    }

    return '$' + (total).toFixed(2);
}

function getProductAttribute(item) {
    var attr = "";
    var keyNames = Object.keys(item);

    for (var j = 0; j < keyNames.length; j++) {
        var key = Object.keys(item)[j];
        var value = item[key];

        attr += `<p>${key}: ${value}</p>`;
        // if (j == keyNames.length - 1) {
        //     attr += "\n ";
        // }
    }

    return attr;
}

const CartInfo = () => {
    const { t } = useTranslation();
    const { cart, userInfo } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const handleCartQty = (data) => {
        // pro.cart_qty = qty;

        // const upsertData = {
        //     customer: userInfo._id,
        //     products: data
        // }

        data.customer = userInfo._id;

        console.log("upsertData: ", data);

        updateCartQty(data).then(async res => {
            if (res.meta == meta.OK) {
                console.log("updatecartqty: ", res);
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

                dispatch(setCart(res.data));
                console.log(res.message);
            }
        })
    }

    return (
        <div className="my-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-0 lg:max-w-none">
                    <div className="lg:grid lg:grid-cols-4 lg:gap-4">
                        <div className="lg:col-span-3">
                            <table className="w-full text-md bg-white rounded mb-4 text-center">
                                <tbody>
                                    <tr className="border-b">
                                        <th colSpan="2" className="text-left p-3 px-5">Product</th>
                                        <th className="p-3 px-5 w-28">Price</th>
                                        <th className="p-3 px-5 w-32">Quantity</th>
                                        <th className="p-3 px-5 w-28">Total</th>
                                        <th className="w-10"></th>
                                    </tr>
                                    {
                                        cart && cart.products.map((p, index) => (
                                            <tr className="border-b" key={index}>
                                                <td className="p-3 px-5 w-48">
                                                    <img src={(p.product.image) ? serverConfig.file_url + p.product.image : serverConfig.blank_product_img} alt="" className="h-36 w-32 object-cover object-top rounded-md" />
                                                </td>
                                                <td className="text-left p-3 px-5 pl-0">
                                                    <p className="font-medium">{p.product.product_id.name}</p>
                                                    <p>Product No: {p.product.product_id.product_no}</p>
                                                    {/* <p>{getProductAttribute(p.product.attr)}</p> */}
                                                    <span dangerouslySetInnerHTML={{ __html: getProductAttribute(p.product.attr) }}></span>
                                                </td>
                                                <td className="p-3 px-5">${(p.product.selling_price).toFixed(2)}</td>
                                                <td className="p-3 px-5 w-32">
                                                    <div className="flex flex-row h-10 w-24 rounded-lg relative border mt-1 px-2">
                                                        <button
                                                            className=" text-gray-600 hover:text-gray-700 h-full w-20 rounded-l cursor-pointer outline-none"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                p.cart_qty = (p.cart_qty <= 1) ? p.cart_qty : p.cart_qty - 1;
                                                                handleCartQty(cart);
                                                            }
                                                            }
                                                        >
                                                            <span className="m-auto text-2xl font-thin">−</span>
                                                        </button>

                                                        <div className="flex items-center justify-center text-center w-full">
                                                            <p className="px-2">{p.cart_qty}</p>
                                                        </div>

                                                        <button
                                                            className="text-gray-600 hover:text-gray-700 h-full w-20 rounded-r cursor-pointer"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                p.cart_qty = (p.cart_qty >= p.product.stock_qty) ? p.cart_qty : p.cart_qty + 1;
                                                                handleCartQty(cart);
                                                            }
                                                            }
                                                        >
                                                            <span className="m-auto text-2xl font-thin">+</span>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="p-3 px-5">{getEachTotal(p)}</td>
                                                <td className="p-3 px-1 text-xl text-gray-400">
                                                    <span
                                                        className="text-xl cursor-pointer hover:text-black"
                                                        onClick={() => {
                                                            var tempProducts = [];

                                                            for (var item of cart.products) {
                                                                if (item.product._id != p.product._id) {
                                                                    tempProducts.push(item);
                                                                }
                                                            }

                                                            cart.products = tempProducts;
                                                            handleCartQty(cart);
                                                        }
                                                        }
                                                    >
                                                        x
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            {!cart && cart.length == 0 &&
                                <div className="flex items-center justify-center border-b pt-10 pb-12">
                                    Your cart is currently empty.
                                </div>
                            }

                            {/* <div className="flex flex-stretch mt-6">
                                <div>
                                    <input autoComplete="off" placeholder={t('coupon')} className="border border-gray-400 appearance-none rounded w-96 px-3 py-3 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600" id="email" type="text" />
                                </div>
                                <div className="duration-200 transition ease-in w-40 flex justify-center items-center py-2 ml-4 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded text-sm text-yellow-500 cursor-pointer">
                                    <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">Apply</div>
                                </div>
                            </div> */}

                            <Link to="/shop" className="duration-200 transition ease-in w-52 flex justify-center items-center py-3 mt-6 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded text-sm text-yellow-500 cursor-pointer">
                                <div className="flex items-center text-xs sm:text-xs md:text-sm uppercase font-medium">
                                    Continue Shopping
                                    <BsArrowRight className="ml-2 text-base" />
                                </div>
                            </Link>
                        </div>

                        <div className="lg:col-span-1 border py-3 px-6 bg-gray-50 rounded h-56 mt-6 lg-mt-0">
                            <h4 className="font-bold mb-3">Cart Total</h4>
                            <hr className="border-b-1 border-gray-400" />

                            <div className="flex justify-between my-4 font-medium">
                                <span>Subtotal </span>
                                <span>{getTotalPrice(cart.products)}</span>
                            </div>

                            {/* <div className="flex justify-between my-4 font-semibold text-gray-500">
                                <span>Shipping </span>
                                <span>$5.00</span>
                            </div>
                            <hr />

                            <div className="flex justify-between my-4 font-semibold text-gray-500">
                                <span>Tax </span>
                                <span>$5.00</span>
                            </div>
                            <hr /> */}

                            <div className="flex justify-between my-4 font-bold">
                                <span>Order Total </span>
                                <span>{getTotalPrice(cart.products)}</span>
                            </div>

                            <Link to="/checkout" className="duration-200 transition ease-in mx-auto sm:mx-auto w-full flex justify-center items-center h-auto mt-8 py-3 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded text-sm text-yellow-500 cursor-pointer">
                                <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">
                                    Check out
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartInfo;