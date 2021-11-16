// import Banner from "assets/images/contact_us/contact-us-img.jpg";
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

///// Banner Link
// https://images.unsplash.com/photo-1523950704592-ee4866469b4c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1517&q=80
// https://images.unsplash.com/photo-1614432254115-7e756705e910?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80
// https://d-themes.com/react/molla/demo-12/images/home/sliders/slide-1.jpg


const Cover = () => {
    const { t } = useTranslation();

    return (
        <section>
            <div className="relative flex items-center" style={{ minHeight: "94vh" }} >
                <div className="absolute top-0 w-full h-full bg-top bg-cover" style={{ backgroundImage: `url(https://d-themes.com/react/molla/demo-12/images/home/sliders/slide-1.jpg` }}>
                    {/* <span className="w-full h-full absolute opacity-60 bg-cyan-900"></span> */}
                </div>

                <div className="container relative mx-auto max-w-7xl text-center text-white" data-aos="fade-up">
                    <h3 className="text-xs sm:text-xs md:text-lg font-medium uppercase">
                        seasonal picks
                    </h3>

                    <h1 className="text-3xl sm:text-3xl md:text-6xl my-4 font-bold uppercase">
                        Get all the good stuff
                    </h1>

                    <Link to="/services" className="duration-200 transition ease-in mx-auto sm:mx-auto w-3/6 md:w-1/2 lg:w-52 flex justify-center items-center h-auto my-8 py-3 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 rounded text-sm text-white">
                        <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">{t("explore_more")}</div>
                        <FaArrowRight className="mx-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Cover
