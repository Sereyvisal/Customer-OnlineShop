import Banner from "assets/images/about_us/about-us-img.jpg"
import { useTranslation } from 'react-i18next';

const Cover = () => {
    const { t } = useTranslation();

    return (
        <div className="relative flex content-center items-center justify-center" style={{ height: "50vh" }}>
            {/* https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80 */}
            <div className="absolute top-0 w-full h-full bg-cover bg-top" style={{ backgroundImage: `url(https://img1.cgtrader.com/items/2513563/bf035ed086/boutique-girls-and-women-clothing-store-3d-model-max-obj-fbx.jpg)` }}>
                {/* <span className="w-full h-full absolute opacity-30 bg-cyan-900"></span> */}
            </div>

            <div className="relative container mx-auto max-w-7xl">
                <h1 className="text-center text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold uppercase">
                    {t("about_us")}
                </h1>
            </div>
        </div>
    )
}

export default Cover;