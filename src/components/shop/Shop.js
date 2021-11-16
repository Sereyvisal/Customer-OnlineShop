import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react";
import ListProduct from "../shop/ListProduct";
import QuickViewProduct from "../home/QuickViewProduct";
import { getInventoryByProductId } from "../../api/inventory"
import { listProduct } from "../../api/product"
import { listCategory } from "../../api/category"
import { meta, sort_type } from "utils/enum"
import Pagination from "components/Pagination";
import { MdExpandLess } from "react-icons/md"
import Tree from "components/Tree";

import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css'
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const Shop = () => {
    const { t } = useTranslation();
    const param = useParams();
    const { products, categoryList } = useSelector(state => state.userReducer);

    const sortTypeList = Object.keys(sort_type);
    // Price Range Slider
    const { createSliderWithTooltip } = Slider;
    const Range = createSliderWithTooltip(Slider.Range);
    const bottomTip = { placement: 'bottom' };
    ///////////////

    // const [products, setProducts] = useState([]);
    // const [categoryList, setCategoryList] = useState([]);
    const [toggleState, setToggleState] = useState("0");
    const [visible, setVisible] = useState(false);
    const [viewIndex, setViewIndex] = useState(0);
    const [viewProduct, setViewProduct] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const [currentRecords, setCurrentRecords] = useState([]);
    const [sortType, setSortType] = useState(sort_type.Newest.id);
    const [showSubCategoryFilter, setShowSubCategoryFilter] = useState(true);
    const [showSubPriceFilter, setShowSubPriceFilter] = useState(true);
    const [filters, setFilters] = useState({ price: [0, 1000], category: (param.id) ? param.id : '0' });
    const [categoryfilter, setCategoryFilter] = useState('');

    useEffect(() => {
        // if (!categoryList.length) {
        //     listCategory().then(async res => {
        //         if (res.meta == meta.OK) {
        //             setCategoryList([{ name: "ALL", _id: "0", items: [] }, ...res.datas])
        //         }
        //     })
        //         .catch(err => {
        //             console.log(err)
        //         });
        // }

        if (products) {
            // Set Current Page Records
            var filterRecords = [];

            if (sortType == sort_type.Newest.id) {
                filterRecords = products.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));
            }
            else if (sortType == sort_type.LowPrice.id) {
                filterRecords = products.sort((a, b) => a.min_selling_price - b.min_selling_price);
            }
            else if (sortType == sort_type.HighPrice.id) {
                filterRecords = products.sort((a, b) => b.min_selling_price - a.min_selling_price);
            }

            if (filters.price.length) {
                filterRecords = products.filter(p => {
                    for (var item of p.product_items) {
                        if (item.selling_price >= filters.price[0] && item.selling_price <= filters.price[1]) {
                            return p;
                        }
                    }
                })
            }

            const indexOfLastRecord = currentPage * recordsPerPage;
            const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
            setCurrentRecords(filterRecords.slice(indexOfFirstRecord, indexOfLastRecord));
            var ttlPages = Math.ceil(filterRecords.length / recordsPerPage);
            setTotalPages(ttlPages);
        }
    }, [products, currentPage, sortType, filters])

    const toggleTab = (index) => {
        setToggleState(index);
    }

    const handleVisibleChange = (value) => {
        setVisible(value)
        // console.log("onVisibleChange: ", value);
    }

    const handleViewProduct = (value) => {
        setViewProduct(value);
        setVisible(true);
        // console.log("handleViewProduct: ", value);
    }

    const handleSort = (e) => {
        setSortType(e.target.value)
        // console.log(" sort: ", e.target.value);
    }

    const handleRange = (value) => {
        setFilters({ ...filters, price: value })
        // console.log("range: ", value);
    };

    const handleCategoryFilter = (value) => {
        setFilters({ ...filters, category: value })
    };

    const handleClearAllFilter = () => {
        setFilters({ category: '0', price: [0, 1000] });
        setSortType('0');
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto py-12 lg:max-w-none">
                <QuickViewProduct visible={visible} product={viewProduct} onVisibleChange={handleVisibleChange} />

                <div className="flex grid order-last lg:order-first lg:grid-cols-4 lg:gap-x-12">

                    <div className="text-gray-600 pt-8 lg:pt-0">
                        <div className="flex justify-between pt-2 pb-8">
                            <p className="text-base">Filters: </p>
                            <p className="text-yellow-500 cursor-pointer" onClick={handleClearAllFilter}>Clear All</p>
                        </div>

                        <hr />

                        <div>
                            <li className="font-semibold text-sm list-none block">
                                <div className="flex items-center justify-between py-3 cursor-pointer text-xl" onClick={() => setShowSubCategoryFilter(show => !show)}>
                                    <span>Category</span>
                                    <MdExpandLess className={showSubCategoryFilter ? 'transform rotate-180' : ''} />
                                </div>

                                <div className={showSubCategoryFilter ? "overflow-hidden mb-6" : "hidden"}>
                                    {categoryList && categoryList.length > 0 &&
                                        <Tree data={categoryList} setFilters={handleCategoryFilter} />
                                    }
                                </div>
                            </li>
                        </div>

                        <hr />

                        <div>
                            <li className="font-semibold text-sm list-none block">
                                <div className="flex items-center justify-between mb-2 py-3 cursor-pointer text-xl" onClick={() => setShowSubPriceFilter(show => !show)}>
                                    <span>Price</span>
                                    <MdExpandLess className={showSubPriceFilter ? 'transform rotate-180' : ''} />
                                </div>

                                <div className={showSubPriceFilter ? "" : "hidden"}>
                                    <p className="text-base font-normal">Price Range:
                                        <span className="pl-2 text-yellow-500">
                                            ${(filters.price[0]).toFixed(2)} - ${(filters.price[1]).toFixed(2)}
                                        </span>
                                    </p>

                                    <div className="px-2 pt-4">
                                        <Range min={0} max={1000} defaultValue={filters.price} tipFormatter={value => `$${value}`} allowCross={false} tipProps={bottomTip} onAfterChange={handleRange} />
                                    </div>
                                </div>
                            </li>
                        </div>
                    </div>

                    <div className="order-first lg:order-last lg:col-span-3">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-gray-700">
                                    Showing <span className="font-medium">{1 * currentPage}</span> to <span className="font-medium">{currentRecords.length * currentPage}</span> of{' '}
                                    <span className="font-medium">{currentRecords.length}</span> results
                                </p>
                            </div>

                            <div className="relative inline-block w-48 text-gray-700">
                                <select value={sortType} onChange={handleSort} className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border-2 rounded-lg appearance-none focus:outline-none focus:border-yellow-500 ">
                                    {
                                        sortTypeList.map((type, index) => (
                                            <option key={index} value={sort_type[type].id}>{sort_type[type].name}</option>
                                        ))
                                    }
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* {
                                categoryList && categoryList.map((category, index) => {
                                    
                                    return ( */}
                            <div className="block mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                <ListProduct products={currentRecords} onViewProduct={handleViewProduct} categoryList={categoryList} selectedCategory={filters.category} />
                            </div>
                            {/* )
                                })
                            } */}

                            <Pagination pages={totalPages} setCurrentPage={setCurrentPage}></Pagination>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Shop