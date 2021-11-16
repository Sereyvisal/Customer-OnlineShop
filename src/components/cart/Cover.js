import { useTranslation } from 'react-i18next';

const Cover = () => {
    const { t } = useTranslation();

    return (
        <section>
            <div className="relative flex items-center justify-center h-40 sm:h-44 md:h-52 lg:h-60"  >
                <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80)` }}>
                    {/* <span className="w-full h-full absolute opacity-20 bg-black"></span> */}
                </div>

                <div className="container relative mx-auto mt-16 max-w-7xl text-center text-white">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
                        {t("shoppingcart")}
                    </h1>

                    {/* <h4 className="text-xl lg:text-2xl font-light my-4">
                        {t("contact_us_desc")}
                    </h4> */}
                </div>
            </div>
        </section>
    )
}

export default Cover
