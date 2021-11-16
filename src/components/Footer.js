import { FaEnvelope, FaFacebookSquare, FaMapMarkerAlt, FaPhone, FaInstagram, FaTwitter,FaYoutube } from 'react-icons/fa';
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { listCategory } from "api/category";
import { meta } from "../utils/enum"
import serverConfig from "../utils/serverConfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Footer = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const { companyInfo, categoryList } = useSelector(state => state.userReducer);

    // const [categoryList, setCategoryList] = useState();

    // useEffect(() => {
    //     if (!categoryList) {
    //         listCategory().then(async res => {
    //             if (res.meta == meta.OK) {
    //                 setCategoryList(res.datas);
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         });
    //     }
    // }, [categoryList]);

    const handleCategory = (id) => {
        history.push(`/shop/${id}`);
        window.location.reload(true);
    }

    return (
        <footer className="bg-nav pt-8 text-white"> {/* bg-gray-900 */}
            <div className="container md:mx-auto max-w-7xl mx-auto px-6 lg:p-6 xl:p-0">
                <div className="grid lg:grid-cols-4 md:grid-cols-2">
                    <div>
                        {companyInfo && companyInfo.logo &&
                            // 'https://d-themes.com/react/molla/demo-12/images/logo.png'
                            <img width="600" height="600" className="object-cover w-28 h-auto mb-4" src={serverConfig.file_url + companyInfo.logo} alt="logo" />
                        }

                        <div className="mt-2"> Online Shopping Mall </div>

                        <div className="flex flex-row mt-4">
                            <FaFacebookSquare size="24" className="mr-4 hover:shadow-lg transform transition duration-300 hover:scale-125 rounded-sm hover:text-blue-500" />
                            <FaInstagram size="24" className="mr-4 hover:shadow-lg transform transition duration-300 hover:scale-125 rounded-sm hover:text-pink-600" />
                            <FaTwitter size="24" className="mr-4 hover:shadow-lg transform transition duration-300 hover:scale-125 rounded-sm hover:text-blue-400" />
                            <FaYoutube size="24" className="mr-4 hover:shadow-lg transform transition duration-300 hover:scale-125 rounded-sm hover:text-red-600" />
                        </div>
                    </div>

                    <div className="md:mt-0 lg:mt-0 mt-8 ">
                        <div className="mb-8 font-bold">Category</div>

                        {
                            categoryList && categoryList.map((category, index) =>
                                <div className="my-3" key={index}>
                                    <span className="hover:text-yellow-500 font-medium cursor-pointer" onClick={() => handleCategory(category._id)}>{category.name}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className="md:mt-8 lg:mt-0 mt-8 md:pr-20">
                        <div className="mb-8 font-bold"> About us </div>

                        <span>
                            At MOLLA, we believe we can create a better world by empowering individuality through the art of fashion.
                        </span>
                    </div>

                    <div className="md:mt-8 lg:mt-0 mt-8">
                        <div className="mb-8 font-bold"> Contact </div>
                        {companyInfo && 
                            <div>
                                <div className="flex flex-auto items-baseline space-y-0 space-x-4">
                                    <div><FaPhone /></div>
                                    <div>{companyInfo.phone}</div>
                                </div>

                                <div className="flex flex-auto items-baseline space-y-2 space-x-4">
                                    <div><FaEnvelope /></div>
                                    <div>{companyInfo.email}</div>
                                </div>

                                <div className="flex flex-auto items-baseline space-y-2 space-x-4">
                                    <div><FaMapMarkerAlt /></div>
                                    <div>{companyInfo.address}</div>
                                </div>

                            </div>
                        }
                    </div>
                </div>

                <div className="h-px bg-gray-500 mt-3"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 py-2 md:py-8 font-semibold tracking-wide">
                    <div className="justify-self-center mt-4 md:m-0 md:justify-self-start">Copyright &#169; {companyInfo && <span>{companyInfo.name}</span>} ONLINESHOP {new Date().toISOString().substring(0, 4)}</div>
                    <div className="justify-self-center mb-4 md:m-0 md:justify-self-end">All right reserved.</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;