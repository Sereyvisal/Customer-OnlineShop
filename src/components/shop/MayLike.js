import { useEffect, useState } from "react"
import { listProduct } from "api/product";
import { getInventoryByProductId } from "../../api/inventory"
import { meta } from "utils/enum"
import ListProduct from "components/shop/ListProduct";
import QuickViewProduct from "components/home/QuickViewProduct";
import Carousel, { consts } from 'react-elastic-carousel'
import { useTranslation } from "react-i18next"
import { MdAddShoppingCart, MdFavoriteBorder, MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { RiSearchEyeLine } from "react-icons/ri"
import { BsListCheck } from "react-icons/bs"
import serverConfig from "../../utils/serverConfig"
import { Link, useHistory  } from "react-router-dom";

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

const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? <MdNavigateBefore className="text-3xl text-gray-500" /> : <MdNavigateNext className="text-3xl text-gray-500" />
    return (
        <button onClick={onClick} disabled={isEdge}>
            {pointer}
        </button>
    )
}

const MayLike = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [viewProduct, setViewProduct] = useState();

    useEffect(() => {
        listProduct().then(async res => {
            if (res.meta == meta.OK) {
                for (var data of res.datas) {
                    for (var p of data.product_items) {
                        await getInventoryByProductId(p._id).then(inventory => {
                            if (inventory.meta == meta.OK) {
                                p.inventory_id = inventory.data._id;
                                p.stock_qty = inventory.data.qty;
                            }
                            else if (inventory.meta == meta.NOTEXIST) {
                                p.stock_qty = 0;
                            }
                        })
                    }
                }

                setProducts(res.datas);
            }
        })
        .catch(err => {
            console.log(err)
        });
    }, []);

    const handleProductDetail = (id) => {
        history.push(`/product/${id}`);
        window.location.reload(true)
    }

    const handleVisibleChange = (value) => {
        setVisible(value)
    }

    const handleViewProduct = (value) => {
        setViewProduct(value);
        setVisible(true);
    }

    return (
        <div>
            <h1 className="flex justify-center text-2xl font-semibold text-gray-900 uppercase my-8">
                You may also like
            </h1>

            <QuickViewProduct visible={visible} product={viewProduct} onVisibleChange={handleVisibleChange} />

            { products &&
                <div>
                    <Carousel itemsToShow={4} pagination={false} itemPosition={consts.START } renderArrow={myArrow} itemPadding={[0, 20]} >
                    {
                        products.map((product, index) => (
                            <div key={product._id} className="group" 
                            >
                                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden h-80 lg:h-80 lg:aspect-none">
                                    <img
                                        src={serverConfig.file_url + product.image[0]}
                                        className="w-full h-full object-center object-cover lg:w-full lg:h-full cursor-pointer"
                                        onClick={() => handleProductDetail(product._id)}
                                    />
            
                                    {
                                        product.product_items.length == 1 ?
                                            // Add to cart Button
                                            <div className="flex flex-stretch opacity-0 group-hover:opacity-90 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white duration-500 rounded-md py-3 -mt-11 justify-center items-center w-full text-center text-sm uppercase font-medium cursor-pointer">   
                                                <MdAddShoppingCart className="text-lg mr-2" />{t('add_cart')}
                                            </div>
                                            :
                                            // Select options Button
                                            <div className="flex flex-stretch opacity-0 group-hover:opacity-90 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white duration-500 rounded-md py-3 -mt-11 justify-center items-center w-full text-center text-sm uppercase font-medium cursor-pointer">   
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
                                <div className="flex justify-end mr-3" onClick={() => handleViewProduct(product)}>
                                    <div className="flex flex-stretch absolute opacity-0 group-hover:opacity-95 duration-500 rounded-full border border-yellow-500 py-3 -mt-72 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white justify-center items-center w-10 text-center text-sm uppercase font-medium cursor-pointer">   
                                        <RiSearchEyeLine className="text-base" />
                                    </div>
                                </div>
            
                                <div className="mt-4 flex justify-center text-center">
                                    <div>
                                        <h3 className="text-sm text-gray-500">{product.category.name}</h3>
                                        <h3 className="text-base text-balck font-medium cursor-pointer" onClick={() => handleProductDetail(product._id)}>
                                            {product.name}
                                        </h3>
            
                                        <h3 className="text-lg text-balck font-medium text-yellow-500 mt-2">
                                            {(getPrice(product))}
                                        </h3>
                                    </div>
                                </div>
            
                            </div>
                        ))
                    }
                    </Carousel>
                </div>
            }
        </div>
    )
}

export default MayLike