import { useTranslation } from 'react-i18next';
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { Link, useHistory } from "react-router-dom"
import serverConfig from 'utils/serverConfig';
import { useSelector, useDispatch } from "react-redux";
import { setCart, setUserInfo, setToken } from "redux/actions";
import { deleteCart, updateCartQty } from "../../api/cart"
import { getInventoryByProductId } from '../../api/inventory';
import { upsertOrder } from 'api/order';
import BillingDetail from './BillingDetail';
import { useState } from 'react';
import { Formik } from 'formik';
import { login } from 'api/generalAPI';
import { meta } from "utils/enum"
import { setLocalToken, setUserId, setOrderDetail } from "utils/auth";
import countryList from 'utils/countryList';
import stateList from 'utils/stateList';

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
            total += p.product.selling_price * p.cart_qty;
        }
    }

    return '$' + (total).toFixed(2);
}

function getDefaultAddress(addressList) {
    var defaultAddr = {
        country: '',
        city: '',
        zip: '',
        address: '',
        state: ''
    };

    if (addressList) {
        for (var e of addressList) {
            if (e.default) {
                defaultAddr = e;
                break;
            }
        }
    }

    return defaultAddr;
}

const CheckOutInfo = () => {
    const { t } = useTranslation();
    const { cart, userInfo } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const defaultAddress = getDefaultAddress(userInfo.address);

    const [showCoupon, setShowCoupon] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [invalid, setInvalid] = useState(false);

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
        <Formik
            enableReinitialize={true}
            initialValues={
                {
                    firstname: userInfo.firstname,
                    lastname: userInfo.lastname,
                    email: userInfo.email,
                    phone: userInfo.phone_number,
                    country: defaultAddress.country ? defaultAddress.country : 'Cambodia',
                    address: defaultAddress.address ? defaultAddress.address : '',
                    city: defaultAddress.city ? defaultAddress.city : '',
                    state: defaultAddress.state ? defaultAddress.state : '',
                    zip: defaultAddress.zip ? defaultAddress.zip : ''
                }
            }
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                }
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }

                if (values.password && values.con_password) {
                    if (values.password != values.con_password) {
                        errors.password = "Password not match"
                    }
                }

                return errors;
            }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    console.log("values: ", values);
                    var tempProducts = [];

                    for (var p of cart.products) {
                        tempProducts.push({ _id: p.inventory_id, order_qty: p.cart_qty });
                    }

                    var upsertData = {
                        customer: userInfo._id,
                        delivery_address: values.address + ', ' + values.city + ', ' + ((values.state) ? values.state + ', ' : '') + values.zip + ', ' + values.country,
                        delivery_fee: 0,
                        order_date: '',
                        order_no: '',
                        products: tempProducts,
                        remark: '',
                        status: '',
                        tax: 0
                    };

                    console.log("upsertOrder: ", upsertData);

                    upsertOrder(upsertData).then(async res => {
                        if (res.meta == meta.OK) {
                            console.log("upsertOrder: ", res);
                            
                            setOrderDetail(JSON.stringify(res.data));
                            
                            await deleteCart(cart._id).then(res => {
                                if (res.meta == meta.OK) {
                                    dispatch(setCart(''));
                                }
                            })

                            // actions.resetForm({
                            //     values: {
                            //         firstname: '',
                            //         lastname: '',
                            //         email: '',
                            //         phone: '',
                            //         country: 'Cambodia',
                            //         address: '',
                            //         city: '',
                            //         state: '',
                            //         zip: ''
                            //     }
                            // });

                            history.push(`/thankyou`);
                            // setTimeout(() => {
                            //     history.push(`/thankyou`);
                            // }, 1000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
                }, 400);
            }}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className="mt-10 mb-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-2xl mx-auto py-0 lg:max-w-none">
                                <div className="space-y-4 my-6">
                                    {/* <div className="border-dashed border border-gray-300 p-3 rounded text-gray-500">
                            <div>
                                Already have an account?
                                <span onClick={() => setShowLogin(!showLogin)} className="text-yellow-500 ml-2 cursor-pointer">Login</span>

                                {
                                    showLogin &&
                                    <div className="w-full origin-top-right rounded-md ml-0">
                                        <div className="px-0 pt-6 pb-2 bg-white rounded-md dark-mode:bg-gray-800">
                                            Please log into your account.

                                            <Formik
                                                initialValues={{ email: '', password: '' }}
                                                validate={values => {
                                                    const errors = {};
                                                    if (!values.email) {
                                                        errors.email = 'Required';
                                                    } else if (
                                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                                    ) {
                                                        errors.email = 'Invalid email address';
                                                    }
                                                    return errors;
                                                }}
                                                onSubmit={(values, actions) => {
                                                    setTimeout(() => {
                                                        console.log("values: ", values);

                                                        login(values).then(res => {
                                                            if (res.meta == meta.OK) {
                                                                setLocalToken(res.data.token);
                                                                setUserId(res.data._id);

                                                                dispatch(setToken(res.data.token));
                                                                dispatch(setUserInfo(res.data));

                                                                history.push(`/`);
                                                                window.location.reload();
                                                            }
                                                            else {
                                                                setInvalid(true);
                                                            }
                                                        })
                                                            .catch(err => {
                                                                console.log(err)
                                                            });

                                                        actions.resetForm({
                                                            values: {
                                                                email: '',
                                                                password: ''
                                                            }
                                                        });
                                                    }, 400);
                                                }}
                                            >
                                                {({
                                                    values,
                                                    handleChange,
                                                    handleBlur,
                                                    handleSubmit,
                                                }) => (
                                                    <form className="space-y-5 mt-4" onSubmit={handleSubmit}>
                                                        <div className="w-full">
                                                            <input
                                                                placeholder='Email'
                                                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                                name="email"
                                                                type="email"
                                                                value={values.email}
                                                                required
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                                            <input
                                                                type={(showPassword) ? 'text' : 'password'}
                                                                name="password"
                                                                placeholder='Password'
                                                                className="px-3 py-2 placeholder-gray-400 relative bg-white bg-white rounded border border-gray-400 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600 w-full pr-10"
                                                                value={values.password}
                                                                required
                                                                onChange={handleChange}
                                                            />

                                                            <button type="button" className="z-10 h-full leading-snug font-normal absolute text-center text-yellow-500 absolute rounded text-base flex items-center justify-center w-11 right-0">
                                                                {(showPassword) ?
                                                                    <BsEyeSlash className="self-center text-xl" onClick={() => setShowPassword(show => show = !show)} />
                                                                    :
                                                                    <BsEye className="self-center text-xl" onClick={() => setShowPassword(show => show = !show)} />
                                                                }
                                                            </button>
                                                        </div>

                                                        <div className="-m-2">
                                                            <a className="text-yellow-500 hover:underline hover:p-5 p-2" href="#">Forgot password?</a>
                                                        </div>
                                                        <button type="submit" className="w-40 rounded border border-yellow-500 text-center bg-white hover:bg-yellow-500 hover:text-white text-yellow-500 text-sm py-2 font-medium uppercase transition duration-200 ease-in-out">Login</button>
                                                    </form>
                                                )}
                                            </Formik>

                                        </div>
                                    </div>
                                }
                            </div>
                        </div> */}

                                    {/* <div className="border-dashed border border-gray-300 p-3 rounded text-gray-500">
                                        <div>
                                            Have a coupon?
                                            <span onClick={() => setShowCoupon(!showCoupon)} className="text-yellow-500 ml-2 cursor-pointer">Coupon</span>

                                            {
                                                showCoupon &&
                                                <div className="w-full origin-top-right rounded-md ml-0">
                                                    <div className="px-0 pt-6 pb-2 bg-white rounded-md dark-mode:bg-gray-800">
                                                        If you have a coupon code, please apply it below.
                                                        <div className="flex flex-stretch mt-4">
                                                            <div>
                                                                <input autoComplete="off" placeholder={t('coupon')} className="border border-gray-400 appearance-none rounded w-96 px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600" id="email" type="text" />
                                                            </div>
                                                            <div className="duration-200 transition ease-in w-36 flex justify-center items-center py-2 ml-4 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded text-sm text-yellow-500 cursor-pointer">
                                                                <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">Apply</div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div> */}
                                </div>

                                <div className="lg:grid lg:grid-cols-4 lg:gap-4">
                                    <div className="lg:col-span-3 mr-4 space-y-3">
                                        {/* <BillingDetail /> */}

                                        <h4 className="font-bold mb-3">Billing Detail</h4>


                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                                            <div className="space-y-2">
                                                <label htmlFor="firstname" className="text-gray-500">First Name</label>
                                                <input
                                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                    name="firstname"
                                                    type="text"
                                                    required
                                                    onChange={handleChange}
                                                    // onBlur={handleBlur}
                                                    value={values.firstname}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="lastname" className="text-gray-500">Last Name</label>
                                                <input
                                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                    name="lastname"
                                                    type="text"
                                                    required
                                                    onChange={handleChange}
                                                    value={values.lastname}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="country" className="text-gray-500">Country / Region</label>
                                            {/* <input
                                                // placeholder='First name'
                                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                name="country"
                                                type="text"
                                                required
                                                onChange={handleChange}
                                                value={values.country}
                                            /> */}

                                            <div className="relative inline-block w-full text-gray-700">
                                                <select
                                                    name="country"
                                                    value={values.country}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    required
                                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                >
                                                    {countryList.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>

                                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="address" className="text-gray-500">Address</label>
                                            <input
                                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                name="address"
                                                type="text"
                                                required
                                                onChange={handleChange}
                                                value={values.address}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                                            <div className="space-y-2">
                                                <label htmlFor="city" className="text-gray-500">City</label>
                                                <input
                                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                    name="city"
                                                    type="text"
                                                    required
                                                    onChange={handleChange}
                                                    value={values.city}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="state" className="text-gray-500">State</label>
                                                {/* <input
                                                    // placeholder='First name'
                                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                    name="state"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.state}
                                                /> */}

                                                <div className="relative inline-block w-full text-gray-700">
                                                    <select
                                                        name="state"
                                                        value={values.state}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                    >
                                                        {stateList.map((option, index) => (
                                                            <option key={index} value={option}>{option}</option>
                                                        ))}
                                                    </select>

                                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                                            <div className="space-y-2">
                                                <label htmlFor="zip" className="text-gray-500">Zip Code</label>
                                                <input
                                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                    name="zip"
                                                    type="text"
                                                    required
                                                    onChange={handleChange}
                                                    value={values.zip}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="phone" className="text-gray-500">Phone</label>
                                                <input
                                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                    name="phone"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.phone}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-gray-500">Email</label>
                                            <input
                                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                                name="email"
                                                type="text"
                                                onChange={handleChange}
                                                value={values.email}
                                            />
                                        </div>



                                    </div>

                                    <div className="lg:col-span-1 border py-3 px-6 bg-gray-50 rounded mt-10 lg:mt-0">
                                        <h4 className="font-bold mb-3">Your Order</h4>
                                        <hr className="border-b-1 border-gray-400" />

                                        <table className="w-full mb-4 text-gray-700">
                                            <tbody>
                                                <tr className="border-b">
                                                    <th className="text-left py-3 font-medium text-black">Product</th>
                                                    <th className="w-10"></th>
                                                    <th className="text-right py-3 font-medium text-black">Subtotal</th>
                                                </tr>

                                                {cart && cart.products.map((p, index) => (
                                                    <tr className="border-b" key={index}>
                                                        <td className="text-left py-3">
                                                            <p className="font-medium">{p.product.product_id.name}</p>
                                                            {/* <p>{getProductAttribute(p.product.attr)}</p> */}
                                                            <span dangerouslySetInnerHTML={{ __html: getProductAttribute(p.product.attr) }}></span>
                                                        </td>
                                                        <td className="text-center font-medium">x{p.cart_qty}</td>
                                                        <td className="text-right py-3">${(p.product.selling_price * p.cart_qty).toFixed(2)}</td>
                                                    </tr>
                                                ))
                                                }
                                            </tbody>
                                        </table>

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

                                        <button type="submit" className="duration-200 transition ease-in mx-auto sm:mx-auto w-full flex justify-center items-center h-auto mt-8 py-3 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded text-sm text-yellow-500 cursor-pointer">
                                            <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">
                                                Place Order
                                            </div>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default CheckOutInfo;