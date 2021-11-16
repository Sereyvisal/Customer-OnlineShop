import { useTranslation } from "react-i18next"
import { useHistory } from "react-router";

const animateStyle = ['fade-right', 'fade-down', 'fade-up']

const collections = [
    {
        name: 'Men Fashion',
        description: 'Work from home accessories',
        // imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
        // imageSrc: 'https://images.unsplash.com/photo-1582015752624-e8b1c75e3711?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
        // imageSrc: 'https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=695&q=80',
        // imageSrc: 'https://images.unsplash.com/photo-1619533394727-57d522857f89?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        imageSrc: 'https://images.unsplash.com/photo-1630667208073-82d53b1db540?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
        // imageSrc: 'https://images.unsplash.com/photo-1619198511074-680af0a21527?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
        href: '#',
    },
    {
        name: 'Women Fashion',
        description: 'Journals and note-taking',
        // imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
        // imageSrc: 'https://images.unsplash.com/photo-1617922499521-6f1b3efe6b10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        imageSrc: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
        // imageSrc: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
        href: '#',
    },
    {
        name: 'Children Fashion',
        description: 'Daily commute essentials',
        // imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
        imageSrc: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=926&q=80',
        href: '#',
    },
]

const Category = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const handleShopNow = () => {
        history.push(`/shop`);
    }

    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-20 lg:max-w-none">
                    <h2 className="text-2xl font-extrabold text-gray-900 uppercase">{t('collections')}</h2>

                    <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-6">
                        {collections.map((c, index) => (
                            <div 
                                key={index} 
                                className={[`${index == 0 ? "row-span-2" : ""}`, "group relative"].join(" ")} 
                                data-aos={animateStyle[index]}
                                onClick={handleShopNow}
                            >
                                <div className={[`${index == 0 ? "h-80 sm:h-80 lg:h-full" : "h-80 sm:h-80 lg:h-96"}`, "relative w-full bg-white rounded-lg overflow-hidden "].join(" ")}> {/* group-hover:opacity-75 */}
                                    {/* <img src={c.imageSrc} alt={c.imageAlt} className="w-full h-full object-center object-cover" />

                                    <div className="opacity-0 hover:opacity-20 hover:bg-black duration-500 absolute inset-0 z-10 flex justify-center items-center text-6xl text-white font-semibold hover:text-opacity-100">

                                    </div>

                                    <div className="opacity-0 hover:opacity-100 hover:bg-transparent duration-500 absolute inset-0 z-10 flex justify-center items-center text-6xl text-white font-semibold hover:text-opacity-100">
                                        Fashion
                                    </div> */}

                                    <img src={c.imageSrc} alt="photo" className="shadow-xl object-center rounded-md w-full h-full object-cover transition duration-500 ease-in-out group-hover:shadow-2xl" />

                                    <div className="bg-opacity-0 group-hover:bg-opacity-25 bg-black text-white duration-500 absolute inset-px z-10 flex flex-col p-6 justify-center items-center rounded font-bold trancking-wider">
                                        <div className="opacity-0 group-hover:opacity-100 duration-700 text-xl md:text-2xl lg:text-2xl uppercase">
                                            {c.name}
                                        </div>

                                        <div className="w-full text-center py-4 opacity-0 group-hover:opacity-100 duration-700">
                                            <button className="py-2 px-4 bg-transparent border border-yellow-500 rounded uppercase text-sm font-medium transform transition ease-in-out duration-300 hover:bg-yellow-500 hover:text-white active:bg-yellow-600">
                                                {t("Shop now")}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category