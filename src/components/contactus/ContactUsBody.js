import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux";

const ContactUsBody = () => {
    const { t } = useTranslation();
    const { companyInfo } = useSelector(state => state.userReducer);

    return (
        <div>
            <div className="max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-full mx-auto py-16 lg:max-w-none">
                    <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-2 lg:gap-x-6">
                        <div className="group relative" data-aos="fade-down">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center text-center flex flex-col trancking-wider">
                                <FiMapPin className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-medium text-lg uppercase">{t('address')}</p>
                                <p className="pt-1 text-gray-500 text-base font-serif">{companyInfo.address}</p>
                            </div>
                        </div>

                        <div className="group relative" data-aos="fade-down">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center text-center flex flex-col trancking-wider">
                                <FiPhone className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-medium text-lg uppercase">{t('phone')}</p>
                                <p className="pt-1 text-gray-500 text-base font-serif lining-nums">{companyInfo.phone}</p>
                            </div>
                        </div>

                        <div className="group relative" data-aos="fade-down">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center text-center flex flex-col trancking-wider">
                                <FiMail className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-medium text-lg uppercase">{t('email')}</p>
                                <p className="pt-1 text-gray-500 text-base font-serif">{companyInfo.email}</p>
                            </div>
                        </div>

                        <div className="group relative" data-aos="fade-down">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center text-center flex flex-col trancking-wider">
                                <FiClock className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-medium text-lg uppercase">{t('open_hour')}</p>
                                <p className="pt-1 text-gray-500 text-base font-serif">{companyInfo.open_hour}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUsBody