import { useTranslation } from "react-i18next"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

const Subscribe = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-50" data-aos="fade-down">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-20 lg:max-w-none">
                    <div className="block grid grid-cols-1 lg:grid-cols-2 border rounded-2xl overflow-hidden border-yellow-500">
                        <div className="flex flex-col py-20 lg:py-20 items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-full border-r border-yellow-500">
                            <p className="font-bold text-2xl uppercase">{t('follow_us_on')}</p>

                            <div className="flex justify-end mr-3 mt-6">
                                
                                <div className="flex flex-stretch duration-500 rounded-full w-11 h-11 mx-2 bg-blue-500 text-white border border-transparent hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 justify-center items-center text-center">   
                                    <FaFacebookF className="text-base" />
                                </div>

                                <div className="flex flex-stretch duration-500 rounded-full w-11 h-11 mx-2 bg-pink-600 text-white border border-transparent hover:bg-white hover:text-pink-600 hover:border hover:border-pink-600 justify-center items-center text-center">   
                                    <FaInstagram className="text-base" />
                                </div>

                                <div className="flex flex-stretch duration-500 rounded-full w-11 h-11 mx-2 bg-blue-400 text-white border border-transparent hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 justify-center items-center text-center">   
                                    <FaTwitter className="text-base" />
                                </div>

                                <div className="flex flex-stretch duration-500 rounded-full w-11 h-11 mx-2 bg-red-600 text-white border border-transparent hover:bg-white hover:text-red-600 hover:border hover:border-red-600 justify-center items-center text-center">   
                                    <FaYoutube className="text-base" />
                                </div>
                                
                            </div>

                        </div>

                        <div className="flex flex-col py-10 lg:py-20 items-center justify-center bg-white w-full ">
                            <p className="font-bold text-lg py-3">{t('subscribe_newsletter')}</p>
                            <p className="px-8">{t("subscribe_desc")}</p>

                            <div className="w-80 md:w-96 lg:w-96 mt-6">
                                <input placeholder={t('enter_email')} className="border border-gray-400 appearance-none rounded w-full px-3 py-3 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600" id="email" type="text" />                        
                            </div>

                            <div className="duration-200 transition ease-in mx-auto sm:mx-auto w-52 flex justify-center items-center h-auto mt-6 py-3 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded text-sm text-yellow-500 cursor-pointer">
                                <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">{t("subscribe")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe