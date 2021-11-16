import { RiTruckLine, RiLock2Line, RiHeadphoneLine } from "react-icons/ri"
import { MdRotateLeft, MdLockOutline, MdSync } from "react-icons/md"
import { useTranslation } from "react-i18next"

const Support = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-full mx-auto py-16 sm:py-10 lg:max-w-none">
                    <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-2 lg:gap-x-6">
                        <div className="group relative" data-aos="fade-up">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center flex flex-col trancking-wider">
                                <RiTruckLine className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-bold text-lg">Payment & Delivery</p>
                                <p className="pt-1 text-gray-500 text-base text-center">Free shipping for orders over $50</p>
                            </div>
                        </div>

                        <div className="group relative" data-aos="fade-up">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center flex flex-col trancking-wider">
                                <MdSync className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-bold text-lg">Return & Refund</p>
                                <p className="pt-1 text-gray-500 text-base text-center">Free 100% money back guarantee</p>
                            </div>
                        </div>

                        <div className="group relative" data-aos="fade-up">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center flex flex-col trancking-wider">
                                <RiLock2Line className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-bold text-lg">Secure Payment</p>
                                <p className="pt-1 text-gray-500 text-base text-center">100% secure payment</p>
                            </div>
                        </div>

                        <div className="group relative" data-aos="fade-up">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center flex flex-col trancking-wider">
                                <RiHeadphoneLine className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-bold text-lg">Quality Support</p>
                                <p className="pt-1 text-gray-500 text-base text-center">Alway online feedback 24/7</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support