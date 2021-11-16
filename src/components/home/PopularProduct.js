import { useState } from "react";
import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md"
import { RiSearchEyeLine } from "react-icons/ri"
import { BsListCheck } from "react-icons/bs"
import { MdExpandMore } from "react-icons/md"

import QuickViewProduct from "./QuickViewProduct";
import ListProduct from "./ListProduct";
import { useTranslation } from "react-i18next"

const products = [
    {
        id: 1,
        name: 'Men Short Sleeves Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1631187701774-bd156f8683cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjMwMDExOA&ixlib=rb-1.2.1&q=80&w=1080',
        imageAlt: "Front of men's Men Short Sleeves Polo Shirt in black.",
        price: '$35.00',
        rating: 3.9,
        reviewCount: 117,
        specification: {
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
        }
    },
    {
        id: 2,
        name: 'Men Short Sleeves Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1594938384824-022767a58e11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        imageAlt: "Front of men's Men Short Sleeves Polo Shirt in black.",
        price: '$35.00',
        rating: 3.9,
        reviewCount: 117,
        specification: {
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
        }
    },
    {
        id: 3,
        name: 'Men Short Sleeves Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1594938384824-022767a58e11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        imageAlt: "Front of men's Men Short Sleeves Polo Shirt in black.",
        price: '$35.00',
        rating: 3.9,
        reviewCount: 117,
        specification: {
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
        }
    },
    {
        id: 4,
        name: 'Men Short Sleeves Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1594938384824-022767a58e11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        imageAlt: "Front of men's Men Short Sleeves Polo Shirt in black.",
        price: '$35.00',
        rating: 3.9,
        reviewCount: 117,
        specification: {
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
        }
    },
    {
        id: 5,
        name: 'Men Short Sleeves Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1594938384824-022767a58e11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        imageAlt: "Front of men's Men Short Sleeves Polo Shirt in black.",
        price: '$35.00',
        rating: 3.9,
        reviewCount: 117,
        specification: {
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
        }
    },
]

const products2 = [
    {
        id: 1,
        name: 'Men Short Sleeves Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1620274549078-11bf5291cb9a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
        imageAlt: "Front of men's Men Short Sleeves Polo Shirt in black.",
        price: '$40.00',
        rating: 3.9,
        reviewCount: 117,
        specification: {
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
        }
    },
    {
        id: 2,
        name: 'Men Short Sleeves Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1620274549078-11bf5291cb9a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
        imageAlt: "Front of men's Men Short Sleeves Polo Shirt in black.",
        price: '$40.00',
        rating: 3.9,
        reviewCount: 117,
        specification: {
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
        }
    },
    {
        id: 3,
        name: 'Men Short Sleeves Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1620274549078-11bf5291cb9a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
        imageAlt: "Front of men's Men Short Sleeves Polo Shirt in black.",
        price: '$40.00',
        rating: 3.9,
        reviewCount: 117,
        specification: {
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
        }
    },
    {
        id: 4,
        name: 'Men Short Sleeves Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1620274549078-11bf5291cb9a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
        imageAlt: "Front of men's Men Short Sleeves Polo Shirt in black.",
        price: '$40.00',
        rating: 3.9,
        reviewCount: 117,
        specification: {
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
        }
    },
    {
        id: 5,
        name: 'Men Short Sleeves Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1620274549078-11bf5291cb9a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
        imageAlt: "Front of men's Men Short Sleeves Polo Shirt in black.",
        price: '$40.00',
        rating: 3.9,
        reviewCount: 117,
        specification: {
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
        }
    },
]

const PopularProduct = () => {
    const { t } = useTranslation();

    const [toggleState, setToggleState] = useState(1);
    const [isShow, setIsShow] = useState(0);
    const [visible, setVisible] = useState(false);
    const [viewIndex, setViewIndex] = useState(0);
    const [viewProduct, setViewProduct] = useState({
        id: '',
        name: '',
        href: '',
        imageSrc: '',
        imageAlt: '',
        price: '',
        rating: 0,
        reviewCount: 0,
        specification: {
            colors: [
                { name: '', class: '', selectedClass: '' },
            ],
            sizes: [
                { name: '', inStock: false },
            ],
        }
    });

    const toggleTab = (index) => {
        setToggleState(index);
    }

    const onHover = (index) => {
        setIsShow(index);
    }

    const handleVisibleChange = (value) => {
        setVisible(value)
        console.log("onVisibleChange: ", value);
    }

    const handleIndexChange = (value) => {
        setViewIndex(value)
        setVisible(true)
        console.log("quickView: ", visible, viewIndex)
    }

    const handleViewProduct = (value) => {
        setViewProduct(value);
        setVisible(true);
        console.log("handleViewProduct: ", value);
    }

    const quickView = (index) => {
        setViewIndex(index);
        setVisible(true);
        console.log("quickView: ", visible, viewIndex)
    }

    return (
        <div className="bg-gray-50">
            
            {/* Quickview Product */}
                {/* {viewProduct != undefined ? 
                    <QuickViewProduct visible={visible} product={viewProduct} onVisibleChange={handleVisibleChange} />
                    : ""
                } */}
                <QuickViewProduct visible={visible} product={viewProduct} onVisibleChange={handleVisibleChange} />

            

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-12 lg:max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase text-center">
                        {t('popular_product')}
                    </h2>

                    {/* Tabs */}
                    <div className="w-full mx-auto mt-4">
                        <ul id="tabs" className="inline-flex pt-2 px-1 w-full justify-center">
                            <li 
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
                            </li>
                        </ul>
                    </div>

                    {/* Fade-up transition */}
                    {/* <div class="h-12 w-80 bg-black rounded-lg transform hover:-translate-y-10 transition-transform duration-500 ease-in-out"></div>
                    <div class="h-12 w-80 bg-gray-300 rounded-lg transform hover:-translate-y-12 transition-transform duration-500 ease-in-out"></div>
                    <div class="h-12 w-80 bg-gray-300 rounded-lg transform hover:scale-x-150 hover transition-transform duration-500 ease-in-out"></div> */}


                    {/* Tab-content */}
                    <div>

                        <div className={toggleState === 1 ? "block mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" : "hidden"}>
                            <ListProduct products={products} onViewProduct={handleViewProduct} />
                        </div>

                        <div className={toggleState === 2 ? "block mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" : "hidden"}>
                            <ListProduct products={products2} onViewProduct={handleViewProduct} />
                        </div>

                        <div className={toggleState === 3 ? "block mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" : "hidden"}>
                            <ListProduct products={products} onViewProduct={handleViewProduct} />
                        </div>

                        <div className={toggleState === 4 ? "block mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" : "hidden"}>
                            <ListProduct products={products} onViewProduct={handleViewProduct} />
                        </div>
                    </div>

                    <div className="duration-200 transition ease-in mx-auto sm:mx-auto w-48 flex justify-center items-center h-auto my-8 py-3 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded-full text-sm text-yellow-500 cursor-pointer">
                        <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">{t("show_more")}</div>
                        <MdExpandMore className="ml-4 text-lg" />
                    </div>

                </div>
                <hr/>
            </div>
        </div>
    )
}

export default PopularProduct