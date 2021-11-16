import { useEffect, useState } from "react";
import ListProduct from "./ListProduct";
import QuickViewProduct from "./QuickViewProduct";
import { MdExpandMore } from "react-icons/md"
import { useTranslation } from "react-i18next"
import { getInventoryByProductId } from "../../api/inventory"
import { listProduct } from "../../api/product"
import { listCategory } from "../../api/category"
import { meta } from "utils/enum"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const NewArrival = () => {
    const { t } = useTranslation();
    const { products } = useSelector(state => state.userReducer);
    const history = useHistory();

    // const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [toggleState, setToggleState] = useState("0");
    const [visible, setVisible] = useState(false);
    const [viewIndex, setViewIndex] = useState(0);
    const [viewProduct, setViewProduct] = useState();

    useEffect(() => {
        if (!categoryList.length) {
            listCategory().then(async res => {
                if (res.meta == meta.OK) {
                    setCategoryList([{ name: "ALL", _id: "0", items: [] }, ...res.datas])
                }
            })
            .catch(err => {
                console.log(err)
            });
        }

        // if (products.length < 4) {
        //     setShowProducts(products);
        // }
        // else if (products.length >= 4 && products.length < 8) {
        //     setShowProducts(products.slice(0, 4));
        // }
        // else if (products.length >= 8) {
        //     setShowProducts(products.slice(0, 8));
        // }
    }, [products])

    const toggleTab = (index) => {
        setToggleState(index);
    }

    const handleVisibleChange = (value) => {
        setVisible(value)
        console.log("onVisibleChange: ", value);
    }

    const handleViewProduct = (value) => {
        setViewProduct(value);
        setVisible(true);
        console.log("handleViewProduct: ", value);
    }

    const handleShowMore = () => {
        history.push(`/shop`);
    }

    return (
        <div className="bg-gray-50">
            
            {/* Quickview Product */}
            <QuickViewProduct visible={visible} product={viewProduct} onVisibleChange={handleVisibleChange} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-12 lg:max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase text-center">
                        {t('new_arrival')}
                    </h2>

                    {/* Tabs */}
                    <div className="w-full mx-auto mt-4">
                        <ul id="tabs" className="inline-flex pt-2 px-1 w-full justify-center">
                        {
                            categoryList && categoryList.length > 0 && categoryList.map((category, index) => (
                                <li 
                                    key={index}
                                    className={[toggleState === category._id ? "duration-300 transition ease-in border-yellow-500" : "", "border-b-2 border-transparent px-3 xs:px-3 sm:px-4 md:px-6 text-gray-800 font-semibold py-2 uppercase cursor-pointer"].join(" ")}
                                    onClick={() => toggleTab(category._id)}
                                >
                                    {category.name}
                                </li>
                            ))
                        }
                            {/* <li 
                                className={[toggleState === 1 ? "duration-300 transition ease-in border-yellow-500" : "", "border-b-2 border-transparent px-3 xs:px-3 sm:px-4 md:px-6 text-gray-800 font-semibold py-2 uppercase cursor-pointer"].join(" ")}
                                onClick={() => toggleTab(1)}
                            >
                                {t('all')}
                            </li>
                            <li 
                                className={[toggleState === 2 ? "duration-300 transition ease-in border-yellow-500" : "", "border-b-2 border-transparent px-3 xs:px-3 sm:px-4 md:px-6 text-gray-800 font-semibold py-2 uppercase cursor-pointer"].join(" ")}
                                onClick={() => toggleTab(2)}
                            >
                                {t('men')}
                            </li>
                            <li 
                                className={[toggleState === 3 ? "duration-300 transition ease-in border-yellow-500" : "", "border-b-2 border-transparent px-3 xs:px-3 sm:px-4 md:px-6 text-gray-800 font-semibold py-2 uppercase cursor-pointer"].join(" ")}
                                onClick={() => toggleTab(3)}
                            >
                                {t('women')}
                            </li>
                            <li 
                                className={[toggleState === 4 ? "duration-300 transition ease-in border-yellow-500" : "", "border-b-2 border-transparent px-3 xs:px-3 sm:px-4 md:px-6 text-gray-800 font-semibold py-2 uppercase cursor-pointer"].join(" ")}
                                onClick={() => toggleTab(4)}
                            >
                                {t('children')}
                            </li> */}
                        </ul>
                    </div>

                    {/* Tab-content */}
                    <div>
                    {
                        categoryList && categoryList.length > 0 && categoryList.map((category, index) => (    
                            <div key={index} className={toggleState === category._id ? "block mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" : "hidden"}>
                                <ListProduct products={products} onViewProduct={handleViewProduct} categoryList={categoryList} selectedCategory={category._id} />
                            </div>
                        ))
                    }    

                        {/* <div className={toggleState === 1 ? "block mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" : "hidden"}>
                            <ListProduct products={products} onViewProduct={handleViewProduct} />
                        </div>

                        <div className={toggleState === 2 ? "block mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" : "hidden"}>
                            <ListProduct products={products} onViewProduct={handleViewProduct} />
                        </div>

                        <div className={toggleState === 3 ? "block mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" : "hidden"}>
                            <ListProduct products={products} onViewProduct={handleViewProduct} />
                        </div>

                        <div className={toggleState === 4? "block mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" : "hidden"}>
                            <ListProduct products={products} onViewProduct={handleViewProduct} />
                        </div> */}
                    </div>

                    <div
                        onClick={handleShowMore}
                        className="duration-200 transition ease-in mx-auto sm:mx-auto w-48 flex justify-center items-center h-auto my-8 py-3 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded-full text-sm text-yellow-500 cursor-pointer"
                    >
                        <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">{t("show_more")}</div>
                        <MdExpandMore className="ml-4 text-lg" />
                    </div>

                </div>
                <hr />
            </div>
        </div>
    )
}

export default NewArrival