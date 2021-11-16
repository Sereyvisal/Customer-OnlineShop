import { useTranslation } from "react-i18next"

const AboutUsBody = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-20 lg:max-w-none">
                    
                    <div className="flex flex-wrap justify-center items-center text-center" data-aos="zoom-in">
                        <p className="italic text-2xl sm:text-3xl md:text-3xl lg:text-4xl w-full sm:w-10/12 lg:w-9/12" style={{fontFamily: "'Cormorant Garamond', serif"}}>
                            At MOLLA, we believe we can create a better world by empowering individuality through the art of fashion.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center sm:text-center md:text-center lg:text-center mt-14 md:mt-20" data-aos="zoom-in">
                        <p className="uppercase text-3xl md-text-4xl lg:text-4xl font-medium mb-5 md:mb-8">Our Mission</p>

                        <p className="text-lg lg:text-xl w-11/12 mb-8">
                            MOLLA exists for the love of fashion. We believe in empowering individuality. Our mission is to be the global platform for luxury fashion, connecting creators, curators and consumers.
                        </p>

                        <img className="w-full" src="https://assets.vogue.com/photos/614a19641b4d3943c808401f/master/w_2560%2Cc_limit/00_story.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsBody;