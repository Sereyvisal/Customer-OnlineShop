import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { MdAddShoppingCart, MdFavoriteBorder, MdRemoveShoppingCart } from "react-icons/md"
import { RiSearchEyeLine } from "react-icons/ri"
import { BsListCheck } from "react-icons/bs"
import serverConfig from "../../utils/serverConfig"
import { meta } from "../../utils/enum"
import { Link, useHistory  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "redux/actions";
import { upsertCart } from "../../api/cart";
import { getInventoryByProductId } from "../../api/inventory";

function getFilterCategory(data, id) {
    var temp = [];
    for (var p of data) {
        if (p._id == id) {
            temp = [p._id];

            if (p.items.length) {
                for (var item of p.items) {
                    temp.push(item._id);
                }
            }
            break;
        }

        if (p.items.length) {
            temp = getFilterCategory(p.items, id);
            if (temp.length) break;
        }
    }
    return temp;
}

function getPrice(product) {
    if (product.product_items.length == 1) {
        return '$' + (product.product_items[0].selling_price).toFixed(2);
    }
    else {
        product.product_items.sort((a,b) => a.selling_price-b.selling_price);
        return '$' + (product.product_items[0].selling_price).toFixed(2) 
            + " - " + 
            '$' + (product.product_items[product.product_items.length-1].selling_price).toFixed(2);
    }
    
    ;
}

const ListProduct = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const { userInfo } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [filterProducts, setFilterProducts] = useState([]);
    // const [filterCategories, setFilterCategories] = useState([]);
    // const [isShow, setIsShow] = useState(0);
    // const [visible, setVisible] = useState(false);
    // const [viewIndex, setViewIndex] = useState(0);
    // const products = listproduct;

    // const quickView = (index) => {
    //     setViewIndex(index);
    //     setVisible(true);
    //     console.log("quickView: ", visible, viewIndex)
    // }

    const handleProductDetail = (id) => {
        history.push(`/product/${id}`);
    }

    useEffect(() => {
        if (props.selectedCategory == "0") {
            setFilterProducts(props.products);
        }
        else {
            var filter = [];
            var filterCategories = getFilterCategory(props.categoryList, props.selectedCategory);

            if (filterCategories) {
                for (var p of props.products) {
                    for (var category of filterCategories) {
                        if (p.category._id == category) {
                            filter.push(p);
                        }
                    }
                }
            }
            setFilterProducts(filter);
        }
    }, [props]);

    const handleAddToCart = (selectedProduct) => {
        if (!userInfo) {
            history.push(`/login`);
        }
        else {
            const upsertData = {
                customer: userInfo._id,
                product: { _id: selectedProduct._id, cart_qty: 1 }
            }

            console.log("upsertData: ", upsertData);

            upsertCart(upsertData).then(async res => {
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

                    dispatch(setCart(res.data));
                    console.log(res.message);
                }
            })
        }
    };

    return (
        <>
        {
            filterProducts && filterProducts.map((product, index) => (
                <div key={product._id} className="group" 
                    // onMouseEnter={() => setIsShow(product.id)}
                    // onMouseLeave={() => setIsShow(0)}
                >
                    <div className="border w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden h-96 lg:h-80 lg:aspect-none">
                        <img
                            src={serverConfig.file_url + product.image[0]}
                            className="w-full h-full object-center object-cover lg:w-full lg:h-full cursor-pointer"
                            onClick={() => handleProductDetail(product._id)}
                        />

                        {/* <div className={isShow === product.id ? "flex flex-stretch absolute group-hover:opacity-100 duration-700 rounded-md py-3 -mt-11 bg-yellow-500 w-full justify-center text-sm text-white uppercase font-medium transition ease-in duration-500" : "hidden"}>
                            <MdAddShoppingCart className="text-lg mr-2" />{t('add_cart')}
                        </div> */}

                        {
                            product.product_items.length == 1 ?
                                product.product_items[0].stock_qty <= 0 ?
                                    // Out of stock
                                    <div 
                                        // onClick={() => handleAddToCart(product.product_items[0])}
                                        className="flex flex-stretch opacity-0 group-hover:opacity-90 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white duration-500 rounded-md py-3 -mt-11 justify-center items-center w-full text-center text-sm uppercase font-medium cursor-pointer"
                                    >   
                                        <MdRemoveShoppingCart className="text-lg mr-2" />Out of stock
                                    </div>
                                    :
                                    // Add to cart Button
                                    <div 
                                        onClick={() => handleAddToCart(product.product_items[0])}
                                        className="flex flex-stretch opacity-0 group-hover:opacity-90 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white duration-500 rounded-md py-3 -mt-11 justify-center items-center w-full text-center text-sm uppercase font-medium cursor-pointer"
                                    >   
                                        <MdAddShoppingCart className="text-lg mr-2" />{t('add_cart')}
                                    </div>
                                :
                                // Select options Button
                                <div 
                                    onClick={() => handleProductDetail(product._id)}
                                    className="flex flex-stretch opacity-0 group-hover:opacity-90 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white duration-500 rounded-md py-3 -mt-11 justify-center items-center w-full text-center text-sm uppercase font-medium cursor-pointer"
                                >   
                                    <BsListCheck className="text-lg mr-2" />Select Options
                                </div>
                        }  
                        

                    </div>
                    
                    {/* Wishlist Button */}
                    {/* <div className="flex justify-end mr-3">
                        <div className="flex flex-stretch absolute opacity-0 group-hover:opacity-95 duration-500 rounded-full py-3 -mt-60 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white justify-center items-center w-10 text-center text-sm uppercase font-medium cursor-pointer">   
                            <MdFavoriteBorder className="text-base" />
                        </div>
                    </div> */}

                    {/* QuickView Button */}
                    <div className="flex justify-end mr-3" onClick={() => props.onViewProduct(product)}>
                        <div className="flex flex-stretch absolute opacity-0 group-hover:opacity-95 duration-500 rounded-full border border-yellow-500 py-3 -mt-72 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white justify-center items-center w-10 text-center text-sm uppercase font-medium cursor-pointer">   
                            <RiSearchEyeLine className="text-base" />
                        </div>
                    </div>

                    {/* <div className="flex justify-end mr-3">
                        <div className="flex flex-stretch absolute opacity-0 group-hover:opacity-95 duration-500 rounded-full py-3 -mt-72 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white justify-center items-center w-10 hover:transition hover:duration-300 hover:linear-left text-center text-sm uppercase font-medium">   
                            {t('add_wishlist')}
                            <MdFavoriteBorder className="text-base text-right justify-end" />
                        </div>
                    </div> */}

                    <div className="mt-4 flex justify-center text-center">
                        <div>
                            <h3 className="text-sm text-gray-500">{product.category.name}</h3>
                            <h3 className="text-base text-balck font-medium cursor-pointer" onClick={() => handleProductDetail(product._id)}>
                                {/* <a href={product.href}>
                                    <span aria-hidden="true" className="absolute inset-0" /> */}
                                    {product.name}
                                {/* </a> */}
                            </h3>

                            <h3 className="text-lg text-balck font-medium text-yellow-500 mt-2">
                                {(getPrice(product))}
                            </h3>
                        </div>
                    </div>

                </div>
            ))
        }
        </>
    )
}

export default ListProduct