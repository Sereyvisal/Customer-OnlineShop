import { useRef, useEffect, useState, Fragment } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import i18n from "i18next";
import Flag from 'react-flagkit';
import { getCompanyInfo } from "api/companyInfo";
import { listProduct } from "api/product";
import { getInventoryByProductId } from "api/inventory";
import { getCartByCustomer } from "api/cart";
import { meta } from "../utils/enum"
import serverConfig from "../utils/serverConfig";
import { useSelector, useDispatch } from "react-redux";
import { CgMenuLeftAlt } from "react-icons/cg";
import { MdClose, MdLanguage, MdSearch, MdShoppingCart, MdKeyboardArrowDown, MdPerson } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { setCompanyInfo, setProducts, setCart, setUserInfo, setToken, setOrders, setCategoryList } from "../redux/actions";
import { getUserId, removeUserId, removeToken } from "../utils/auth";
import { getUser } from "api/generalAPI";
import { getOrderByCustomer } from "api/order";
import { listCategory } from "api/category";

let navigation = [
    { name: 'home', to: '/' },
    { name: 'shop', to: '/shop' },
    // { name: 'services', to: '/services' },
    // { name: 'clients', to: '/clients' },
    // { name: 'projects', to: '/projects' },
    { name: 'aboutus', to: '/aboutus' },
    { name: 'contactus', to: '/contactus' },
];

const langues = [
    { name: "English", country: "US", lang: "en" },
    { name: "中文", country: "CN", lang: "zh" },
    { name: "ភាសារខ្មែរ", country: "KH", lang: "kh" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const MyNavbar = () => {
    const { t } = useTranslation();
    const cookies = new Cookies();
    const [drawer, setdrawer] = useState(true);
    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState(false)
    const location = useLocation();
    const history = useHistory();
    const wrapperRef = useRef(null);

    const { companyInfo, userInfo, products, cart, token, orders, categoryList } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!companyInfo) {
            getCompanyInfo().then(async res => {
                if (res.meta == meta.OK) {
                    dispatch(setCompanyInfo(res.data));
                }
            })
                .catch(err => {
                    console.log(err)
                });
        }

        if (!products) {
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

                    dispatch(setProducts(res.datas));
                }
            })
                .catch(err => {
                    console.log(err)
                });
        }

        if (!categoryList) {
            listCategory().then(async res => {
                if (res.meta == meta.OK) {
                    dispatch(setCategoryList(res.datas));
                }
            })
                .catch(err => {
                    console.log(err)
                });
        }

        if (token && !userInfo) {
            getUser(getUserId()).then(res => {
                if (res.meta == meta.OK) {
                    dispatch(setUserInfo(res.data));
                }
            })
                .catch(err => {
                    console.log(err)
                });
        }

        if (token) {
            if (!cart) {
                getCartByCustomer(getUserId()).then(async res => {
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
                    }
                })
                    .catch(err => {
                        console.log(err)
                    });
            }

            if (!orders) {
                getOrderByCustomer(getUserId()).then(async res => {
                    if (res.meta == meta.OK) {
                        dispatch(setOrders(res.datas));
                    }
                })
                .catch(err => {
                    console.log(err)
                });
            }
        }

        function handleLangMenu(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setMenu(false)
            }
        }

        document.addEventListener("mousedown", handleLangMenu);
        return () => {
            document.removeEventListener("mousedown", handleLangMenu);
        };

    }, [wrapperRef]);

    const handleChange = (value) => {
        i18n.changeLanguage(value);

        setMenu(false);

        const date = new Date();
        date.setDate(date.getDate() + 7);

        cookies.set('lang', value, { expires: date });
    };

    const handleLogout = () => {
        dispatch(setUserInfo(''));
        dispatch(setToken(''));
        removeToken();
        removeUserId();
        history.push(`/`);
        document.location.reload();
    }

    const handleMyAccount = () => {
        setMenu(!menu);
        history.push(`/me/profile`);
    }

    return (
        <div className="fixed h-16 z-30 w-full text-white bg-nav shadow-xl">
            <div className="h-full flex flex-col max-w-screen-xl lg:mx-auto lg:items-center lg:justify-between lg:flex-row lg:px-8">
                <div className="p-4 flex flex-row items-center justify-between">
                    <button aria-label="navigation bar toggle" className="lg:hidden focus:outline-none focus:shadow-outline" onClick={() => setdrawer(!drawer)}>
                        {drawer ? <CgMenuLeftAlt size="28" /> : <MdClose size="28" />}
                    </button>

                    {companyInfo && companyInfo.logo &&
                        <Link to="/" className="text-lg font-semibold tracking-widest uppercase rounded-lg">
                            {/* <img width="600" height="600" className="object-cover w-8 h-auto lg:hidden" src={logo_only} alt="logo" />
                            <img width="600" height="600" className="object-cover w-20 h-auto hidden lg:block" src={logo} alt="logo" /> */}

                            <img width="600" height="600" className="object-cover w-20 h-auto" src={serverConfig.file_url + companyInfo.logo} alt="logo" />
                        </Link>
                    }

                    <Link to="/shoppingcart" className="lg:hidden flex">
                        <MdShoppingCart className="lg:hidden h-6 w-6 text-white hover:text-gray-400" />

                        {/* <MdLanguage onClick={() => setMenu(!menu)} className="lg:hidden h-6 w-6 text-white hover:text-gray-400" /> */}
                    </Link>
                </div>

                {/* <div className={classNames(menu ? "block" : "hidden", "  lg:hidden absolute right-5 top-12 p-4 bg-white rounded ring-2 ring-black shadow-lg w-48")}>
                    {
                        langues.map((p, k) =>
                            <button key={k} className="flex justify-start items-center my-2 px-4 py-2 w-full text-md font-bold tracking-wider rounded-md hover:bg-gray-200 text-black" onClick={() => handleChange(p.lang)}>
                                <Flag country={p.country} className="mr-3" />
                                {p.name}
                            </button>
                        )
                    }
                </div> */}

                {/* <div className={classNames(menu ? "block" : "hidden", "  lg:hidden absolute right-5 top-12 p-4 bg-white rounded ring-2 ring-black shadow-lg w-48")}>
                    <MdPerson className="h-6 w-6" />
                </div> */}

                {/* Mobile Nav */}
                <div className={classNames(drawer ? "hidden" : "block", " bg-nav lg:hidden px-4 py-3 rounded-br-lg md:rounded-br-xl rounded-bl-lg md:rounded-bl-xl space-y-2 shadow-2xl")} >

                    {/* Search */}
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input type="text" placeholder={t('search')} className="px-3 py-2 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full pr-10" />

                        <button type="button" className="z-10 h-full leading-snug font-normal absolute text-center text-white absolute bg-yellow-500 rounded text-base flex items-center justify-center w-11 right-0">
                            <MdSearch className="self-center" />
                        </button>
                    </div>

                    {/* Languages */}
                    {/* <div className="relative self-center lg:flex-row" >
                        
                        <div onClick={() => setMenu(!menu)} class="flex flex-1 w-full px-3 py-2 bg-nav text-base font-bold text-gray-300">
                            Languages
                            <MdKeyboardArrowDown className="right-0 text-right" />
                        </div>

                        {
                            menu &&
                            <div className=" relative right-0 w-full mt-2 origin-top-right rounded-md md:w-48">
                                <div className="px-2 pb-2 bg-nav rounded-md">
                                    {
                                        langues.map((p, k) =>
                                            <button key={k} className="flex justify-start items-center my-2 px-4 py-2 w-full text-md font-bold tracking-wider rounded-md hover:bg-gray-200 text-gray-300" onClick={() => handleChange(p.lang)}>
                                                <Flag country={p.country} className="mr-3" />
                                                {p.name}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        }
                    </div> */}

                    {
                        navigation.map((p) => (
                            <Link onClick={() => setdrawer(true)} key={p.name} to={p.to} className={classNames(
                                p.to === location.pathname ? 'bg-yellow-500 text-white' : 'text-gray-300 hover:bg-yellow-500 hover:text-white',
                                'block px-3 py-2 rounded text-base font-bold'
                            )}>
                                {t(p.name)}
                            </Link>
                        ))
                    }

                    <hr className="text-gray-300" />

                    <div className="relative self-center lg:flex-row">
                        {!userInfo &&

                            <Link onClick={() => setdrawer(true)} to='/login' className={classNames(
                                location.pathname === '/login' ? 'bg-yellow-500 text-white' : 'text-gray-300 hover:bg-yellow-500 hover:text-white',
                                'block px-3 py-2 rounded text-base font-bold flex'
                            )}>
                                Login
                                <BiLogIn className="flex items-center text-xl mt-1 ml-1" />
                            </Link>
                        }

                        {userInfo &&
                            <div>
                                <button
                                    className="flex justify-start items-center my-1 px-4 py-2 w-full tracking-wider rounded-md text-gray-300 hover:bg-yellow-500 hover:text-white text-base font-bold"
                                    onClick={() => {
                                        setdrawer(true);
                                        handleMyAccount();
                                    }}
                                >
                                    My {companyInfo.name}
                                </button>

                                <button
                                    className="flex justify-start items-center my-1 px-4 py-2 w-full tracking-wider rounded-md text-gray-300 hover:bg-yellow-500 hover:text-white text-base font-bold"
                                    onClick={() => {
                                        setdrawer(true);
                                        handleLogout();
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        }
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden flex-col flex-grow pb-4 md:pb-0 lg:flex lg:justify-center lg:flex-row">
                    {
                        navigation.map((p, k) =>
                            <Link key={k} to={p.to} className={classNames(p.to === location.pathname ? 'border-b border-yellow-500' : 'duration-100 transition ease-in hover:border-b hover:border-yellow-500', 'border-b border-transparent px-4 py-2 mx-2 text-sm uppercase font-semibold md:mt-0 rounded-none')}>
                                {t(p.name)}
                            </Link>
                        )
                    }
                </nav >

                {/* Search */}
                {/* <div className="hidden lg:block relative self-center lg:flex-row">
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input type="text" placeholder={t('search')} className="px-3 py-2 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-60 pr-10" />

                        <button type="button" className="z-10 h-full leading-snug font-normal absolute text-center text-white absolute bg-yellow-500 rounded text-base flex items-center justify-center w-11 right-0">
                            <MdSearch className="self-center" />
                        </button>
                    </div>
                </div> */}

                <div className="hidden lg:block relative self-center lg:flex-row" >
                    <MdSearch onClick={() => setSearch(!search)} className="h-6 w-6 transition transform duration-500 ease-in-out hover:text-yellow-500 hover:scale-125 hover:shadow-lg" />
                </div>


                {/* Cart */}
                <Link to="/shoppingcart" className="hidden lg:block relative self-center lg:flex-row top-1" >
                    <span className="relative inline-block">
                        <MdShoppingCart className="h-6 w-6 mx-6 transition transform duration-500 ease-in-out hover:text-yellow-500 hover:scale-125 hover:shadow-lg" />

                        <span className="absolute -top-3 right-3 px-2 py-1 text-xs font-medium leading-none transform bg-yellow-500 rounded-full">
                            {cart && cart.products.length ? cart.products.length : '0'}
                        </span>
                    </span>
                </Link>

                {/* Language dropdown */}
                {/* <div className="hidden lg:block relative self-center lg:flex-row" >
                    <MdLanguage onClick={() => setMenu(!menu)} className="h-6 w-6 transition transform duration-500 ease-in-out hover:text-yellow-500 hover:scale-125 hover:shadow-lg" />

                    {
                        menu &&
                        <div className=" absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
                            <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                                {
                                    langues.map((p, k) =>
                                        <button key={k} className="flex justify-start items-center my-2 px-4 py-2 w-full text-md font-bold tracking-wider rounded-md hover:bg-gray-200 text-black" onClick={() => handleChange(p.lang)}>
                                            <Flag country={p.country} className="mr-3" />
                                            {p.name}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    }
                </div> */}

                <div className="hidden lg:block relative self-center lg:flex-row" >
                    {!userInfo &&
                        <Link to='/login'>
                            <MdPerson className="h-6 w-6 cursor-pointer" />
                        </Link>
                    }

                    {userInfo &&
                        // <div className="m-1 mr-2 w-10 h-10 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white">
                        //     <img src={userInfo.avatar ? serverConfig.file_url + userInfo.avatar : serverConfig.blank_profile_img} className="rounded-full cursor-pointer" />
                        // </div>

                        <div className="hidden lg:block relative self-center lg:flex-row" >
                            <div className="overflow-hidden m-1 mr-2 w-10 h-10 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white transition transform duration-500 ease-in-out">
                                <img
                                    src={userInfo.avatar ? serverConfig.file_url + userInfo.avatar : serverConfig.blank_profile_img}
                                    className="rounded-full cursor-pointer object-top object-cover"
                                    onClick={() => setMenu(!menu)}
                                />
                            </div>

                            {/* <MdLanguage onClick={() => setMenu(!menu)} className="h-6 w-6 transition transform duration-500 ease-in-out hover:text-yellow-500 hover:scale-125 hover:shadow-lg" /> */}

                            {
                                menu &&
                                <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
                                    <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                                        <button
                                            className="flex justify-start items-center my-1 px-4 py-2 w-full tracking-wider rounded-md hover:bg-gray-200 text-black"
                                            onClick={handleMyAccount}
                                        >
                                            My {companyInfo.name}
                                        </button>

                                        <button
                                            className="flex justify-start items-center my-1 px-4 py-2 w-full tracking-wider rounded-md hover:bg-gray-200 text-black"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                </div>
            </div >
        </div >
    )
}

export default MyNavbar;