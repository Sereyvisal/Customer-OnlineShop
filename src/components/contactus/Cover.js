import Banner from "assets/images/contact_us/contact-us-img.jpg";
import { useTranslation } from 'react-i18next';

const Cover = () => {
    const { t } = useTranslation();

    return (
        <section>
            <div className="relative flex items-center" style={{ minHeight: "50vh" }} >
                <div className="absolute top-0 w-full h-full bg-top bg-cover" style={{ backgroundImage: `url(https://wallpaper.dog/large/10907568.jpg)` }}>
                    <span className="w-full h-full absolute opacity-20 bg-black"></span>
                </div>

                <div className="container relative mx-auto max-w-7xl text-center text-white">
                    <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold uppercase">
                        {t("contact_us")}
                    </h1>

                    <h4 className="text-xl lg:text-2xl font-light my-4">
                        {t("contact_us_desc")}
                    </h4>
                </div>
            </div>
        </section>
    )
}

export default Cover
