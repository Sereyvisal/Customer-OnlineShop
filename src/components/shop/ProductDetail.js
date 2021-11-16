import { useTranslation } from "react-i18next"
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getProduct } from "../../api/product"
import { getInventoryByProductId } from "../../api/inventory"
import { upsertCart } from "../../api/cart"
import { meta } from "utils/enum"
import ReactImageZoom from 'react-image-zoom';
import Zoom from 'react-img-zoom'

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';

import serverConfig from "utils/serverConfig";
import { MdAddShoppingCart, MdFavoriteBorder, MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { BsArrowsFullscreen } from "react-icons/bs"
import Carousel, { consts } from 'react-elastic-carousel'
import ZoomImg from "./ZoomImg";

import { LightBox } from 'react-lightbox-pack';
import "react-lightbox-pack/dist/index.css";
import MayLike from "./MayLike";
import ProductDescription from "./ProductDescription";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "redux/actions";
import toast, { Toaster } from 'react-hot-toast';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? <MdNavigateBefore className="text-3xl text-gray-500" /> : <MdNavigateNext className="text-3xl text-gray-500" />
    return (
        <button onClick={onClick} disabled={isEdge}>
            {pointer}
        </button>
    )
}

const ProductDetail = () => {
    const { t } = useTranslation();
    const param = useParams();
    const history = useHistory();
    const { userInfo } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [showRender, setShowRender] = useState(false);
    const [product, setProduct] = useState();
    const [selectedProduct, setSelectedProduct] = useState({selling_price: 0, stock_qty: 0});
    const [imageList, setImageList] = useState([]);
    const [currentImg, setCurrentImg] = useState('');
    const [selectedAttribute, setSelectedAttribute] = useState({});
    const [price, setPrice] = useState('$' + (0).toFixed(2));
    const [stockQty, setStockQty] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [sIndex, setSIndex] = useState(0);
    const [cartQty, setCartQty] = useState(1);

    useEffect(() => {
        // console.log("id: ", param);
        // console.log("selectedAttribute: ", selectedAttribute);

        if (!product) {
            getProduct(param.id).then(async res => {
                if (res.meta == meta.OK) {
                    var imgList = [];

                    for (var i = 0; i < res.data.product_items.length; i++) {
                        await getInventoryByProductId(res.data.product_items[i]._id).then(inventory => {
                            if (inventory.meta == meta.OK) {
                                res.data.product_items[i].stock_qty = inventory.data.qty;
                            }
                            else if (inventory.meta == meta.NOTEXIST) {
                                res.data.product_items[i].stock_qty = 0;
                            }
                        })

                        imgList.push({ id: i, image: serverConfig.file_url + res.data.product_items[i].image[0] });
                    }

                    // setCurrentImg(res.data.image[0]);
                    setProduct(res.data)
                    setImageList(imgList);
                }
            })
                .catch(err => {
                    console.log(err)
                });
        }
        else if (product) {
            product.attr_type.map((parent, index) => {
                selectedAttribute[parent] = product.attr_value[index][0]
            })

            setAttributeInfo();
        }

        setTimeout(function () {
            setShowRender(true);
        }.bind(this), 1000)
    }, [product])

    const setSelected = (parent, child) => {
        selectedAttribute[parent] = child;
        setSelectedAttribute({ ...selectedAttribute });
        setAttributeInfo();
    }

    const setAttributeInfo = () => {
        if (product) {
            for (var p of product.product_items) {
                var attr_keys = Object.keys(p.attr);
                var match = true;

                for (var key of attr_keys) {
                    if (selectedAttribute[key] != p.attr[key]) {
                        match = false;
                        break;
                    }
                }

                if (match) {
                    // setPrice('$' + (p.selling_price).toFixed(2));
                    // setStockQty(p.stock_qty);
                    setSelectedProduct(p);
                    setCurrentImg(serverConfig.file_url + p.image[0])
                    break;
                }
            }
        }
    }

    const changeCurrentImg = (image) => {
        setCurrentImg(image);
    }

    const lightBoxHandler = (state) => {
        setToggle(state);
        imageList.forEach((img, index) => {
            if (img.image == currentImg) {
                setSIndex(index);
            }
        })

    };

    const handleAddToCart = () => {
        if (!userInfo) {
            history.push(`/login`);
        }
        else {
            selectedProduct.cart_qty = cartQty;

            const upsertData = {
                customer: userInfo._id,
                product: selectedProduct
            }

            // console.log("upsertData: ", upsertData);

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
                    // console.log(res.message);
                }
            })
        }
    };

    return (
        <div className={classNames((!currentImg) ? 'hidden' : '', " max-w-7xl mx-auto px-4 sm:px-6 lg:px-8")}>
            <div className="max-w-2xl mx-auto py-12 lg:max-w-none">
                {/* Loading */}
                <div className={classNames((showRender) ? 'hidden' : '', " w-full h-full mb-20")}>
                    <div className="animate-pulse grid grid-cols-2 gap-x-12">
                        <div className="rounded bg-gray-300 h-full w-full"></div>
                        <div className="flex-1 space-y-4 pb-40">
                            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-10 bg-gray-300 rounded w-32"></div>
                            <div className="h-10 bg-gray-300 rounded w-36"></div>
                            <div className="h-6 bg-gray-300 rounded w-20"></div>
                            <div className="space-x-4">
                                <div className="h-10 bg-gray-300 rounded w-32 inline-block"></div>
                                <div className="h-10 bg-gray-300 rounded w-32 inline-block"></div>
                                <div className="h-10 bg-gray-300 rounded w-32 inline-block"></div>
                                <div className="h-10 bg-gray-300 rounded w-32 inline-block"></div>
                            </div>
                            <div className="h-6 bg-gray-300 rounded w-20"></div>
                            <div className="space-x-4">
                                <div className="h-10 bg-gray-300 rounded w-32 inline-block"></div>
                                <div className="h-10 bg-gray-300 rounded w-32 inline-block"></div>
                                <div className="h-10 bg-gray-300 rounded w-32 inline-block"></div>
                                <div className="h-10 bg-gray-300 rounded w-32 inline-block"></div>
                            </div>
                            <div className="space-x-4">
                                <div className="h-10 bg-gray-300 rounded w-32 inline-block"></div>
                                <div className="h-10 bg-gray-300 rounded w-32 inline-block"></div>
                            </div>
                            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>

                <div className={(!showRender) ? 'hidden' : ''}>
                    {product &&
                        <div>
                            <LightBox
                                state={toggle}
                                event={lightBoxHandler}
                                data={imageList}
                                imageWidth="60vw"
                                imageHeight="70vh"
                                thumbnailHeight={50}
                                thumbnailWidth={50}
                                setImageIndex={setSIndex}
                                imageIndex={sIndex}
                            />

                            <div className="grid grid-cols-2 gap-x-12 mb-6">
                                <div>
                                    <div className="group">
                                        <div className="cursor-move bg-gray-100 rounded-lg overflow-hidden">
                                            {currentImg != '' &&
                                                // <ReactImageZoom width={600} height={600} zoomPosition={`original`} img={currentImg} />

                                                // <Zoom
                                                //     img={currentImg}
                                                //     zoomScale={2}
                                                //     height={600}
                                                //     width={600}
                                                //     transitionTime={1}
                                                // />
                                                <div>
                                                    {/* <SRLWrapper> */}
                                                    <ZoomImg image={currentImg} />
                                                    {/* </SRLWrapper> */}
                                                </div>

                                                // <InnerImageZoom src="/path/to/image.jpg" zoomSrc="/path/to/zoom-image.jpg" />
                                            }
                                        </div>

                                        <div className="flex justify-end mr-2">
                                            <div className="flex flex-stretch absolute -mt-14 opacity-0 group-hover:opacity-95 duration-500 py-3 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white justify-center items-center w-11 text-center uppercase cursor-pointer">
                                                <BsArrowsFullscreen className="text-base" onClick={() => lightBoxHandler(true)} />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mt-6">
                                        <Carousel itemsToShow={4} pagination={false} itemPosition={consts.START} renderArrow={myArrow} itemPadding={[0, 5, 0, 0]} >
                                            {
                                                imageList && imageList.map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={img.image}
                                                        className="w-44 h-44 object-center object-cover cursor-pointer"
                                                        onClick={() => setCurrentImg(img.image)}
                                                    />
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                </div>

                                <div className="h-80">
                                    <p className="text-3xl py-2">
                                        {product.name}
                                    </p>


                                    <p className="text-3xl font-medium text-yellow-500 py-2">
                                        ${(selectedProduct.selling_price).toFixed(2)}
                                    </p>

                                    <p className="text-xl py-2">
                                        Stock: 
                                        {(selectedProduct.stock_qty > 0) && <span className="ml-2">{selectedProduct.stock_qty}</span>}
                                        {(selectedProduct.stock_qty <= 0) && <span className="ml-2 text-red-600">Out of stock</span>}
                                    </p>

                                    <form>
                                        {product.attr_type.length > 0 && product.attr_type.map((parent, index) => (
                                            <div className="mt-4" key={index}>
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-base font-medium">{parent}</h4>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    {
                                                        product.attr_value[index].map((child, i) => (
                                                            <div
                                                                key={i}
                                                                onClick={() => setSelected(parent, child)}
                                                                className={
                                                                    classNames(
                                                                        product.product_items[index].stock_qty > 0
                                                                            ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                                            : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                                                        child === selectedAttribute[parent] && product.product_items[index].stock_qty > 0 ? 'ring-2 ring-yellow-500' : '',
                                                                        'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                                                    )
                                                                }
                                                            >
                                                                {child}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                        }

                                        <div className="flex mt-6">
                                            <span className="flex items-center mr-4 text-xl">Quantity: </span>

                                            <div className="flex flex-row h-12 w-32 rounded-lg relative border border-yellow-500 shadow-sm mt-1 px-2">
                                                <button 
                                                    className=" text-gray-600 hover:text-gray-700 h-full w-20 rounded-l cursor-pointer outline-none"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCartQty(value => (value <= 1) ? value : value - 1)}
                                                    }
                                                >
                                                    <span className="m-auto text-2xl text-yellow-500">−</span>
                                                </button>

                                                <div className="flex items-center justify-center text-center w-full">
                                                    <p className="px-2 text-lg font-medium">{cartQty}</p>
                                                </div>
                                                
                                                <button 
                                                    className="text-gray-600 hover:text-gray-700 h-full w-20 rounded-r cursor-pointer"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCartQty(value => (value >= selectedProduct.stock_qty) ? value : value + 1)}
                                                    }
                                                >
                                                    <span className="m-auto text-2xl text-yellow-500">+</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div
                                            onClick={handleAddToCart}
                                            className={classNames((selectedProduct.stock_qty <= 0) ? "pointer-events-none bg-gray-50 text-gray-200 cursor-not-allowed" : "cursor-pointer text-white hover:bg-yellow-500 hover:bg-opacity-95 bg-yellow-500 border-transparent", 
                                                "mt-10 w-full border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 uppercase"
                                            )}
                                        >
                                            <MdAddShoppingCart className="text-lg mr-2"/>{t('add_cart')}
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <hr />

                            <ProductDescription description={product.description} />

                            <hr className="mt-10"/>

                            <MayLike />
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default ProductDetail