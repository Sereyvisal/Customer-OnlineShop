import { FaAward, FaRegLifeRing, FaRegHeart } from "react-icons/fa"
import { useTranslation } from "react-i18next"

const Quality = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-16 sm:py-10 lg:max-w-none">
                    <div className="space-y-12 sm:space-y-0 sm:grid sm:grid-cols-3 lg:gap-x-6">
                        <div className="group relative" data-aos="fade-up">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center flex flex-col trancking-wider">
                                <FaAward className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-semibold text-lg">Design Quality</p>
                                {/* <p className="pt-1 text-gray-500 text-base">Free shipping for orders over $50</p> */}
                            </div>
                        </div>

                        <div className="group relative" data-aos="fade-up">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center flex flex-col trancking-wider">
                                <FaRegLifeRing className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-semibold text-lg">Professional Support</p>
                                {/* <p className="pt-1 text-gray-500 text-base">Free 100% money back guarantee</p> */}
                            </div>
                        </div>

                        <div className="group relative" data-aos="fade-up">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden justify-center items-center flex flex-col trancking-wider">
                                <FaRegHeart className="text-4xl text-yellow-500" />
                                <p className="pt-2 font-semibold text-lg">Made With Love</p>
                                {/* <p className="pt-1 text-gray-500 text-base">100% secure payment</p> */}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quality