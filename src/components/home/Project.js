import { useTranslation } from 'react-i18next';

const content = [
    { title: "project_content_title1", description: "project_content_description1", image: "https://cdn.dribbble.com/users/563897/screenshots/15725741/media/ecb36c93e66607e55651074905eb6a2f.png?compress=1&resize=1200x900" },
    { title: "project_content_title2", description: "project_content_description2", image: "https://cdn.dribbble.com/users/34642/screenshots/15651813/media/1c1143a9b0420ac1958a17b19869589a.png?compress=1&resize=1200x900" },
    { title: "project_content_title3", description: "project_content_description3", image: "https://cdn.dribbble.com/users/1615584/screenshots/15439231/media/6e9d78df70dcd18efd389bd17556f9e4.jpg?compress=1&resize=1200x900" },
    { title: "project_content_title4", description: "project_content_description4", image: "https://cdn.dribbble.com/users/6047818/screenshots/15695514/media/fec8c9d6a86c3d8124dd2031f6673756.png?compress=1&resize=1200x900" },
    { title: "project_content_title5", description: "project_content_description5", image: "https://cdn.dribbble.com/users/1615584/screenshots/15405230/media/6f2243624a306b6c6bb8d7cb0554c77c.jpg?compress=1&resize=1200x900" },
    { title: "project_content_title6", description: "project_content_description6", image: "https://cdn.dribbble.com/users/4678459/screenshots/15629660/media/a2cd99128c77ae59779987e100376e28.png?compress=1&resize=1200x900" },
    { title: "project_content_title7", description: "project_content_description7", image: "https://cdn.dribbble.com/users/5031351/screenshots/14139155/media/ce0fa5a9bc9399b29a75137e95a1e9d8.png?compress=1&resize=1200x900" },
    { title: "project_content_title8", description: "project_content_description8", image: "https://cdn.dribbble.com/users/1498088/screenshots/15723646/media/86471f7885966f5c074d964cb78cbb36.png?compress=1&resize=1200x900" },
    { title: "project_content_title9", description: "project_content_description9", image: "https://cdn.dribbble.com/users/1294892/screenshots/15864486/media/96af71f8f7aaa11bb744e6a1fe37b76e.png?compress=1&resize=1200x900" },
]

const OurProjects = () => {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto max-w-7xl py-16">
            <div className="px-4">
                <div className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold">{t("project_title")}</div>

                <div className="text-lg sm:text-xl md:text-2xl lg:text-xl font-bold text-gray-500 my-2">{t("project_subtitle")}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {
                    content.map((p, k) =>
                        <ProjectCard key={k} title={t(p.title)} description={t(p.description)} image={p.image} />
                    )
                }
            </div>
        </div>
    )
}

const ProjectCard = ({ title, description, image }) => {
    return (
        <div className="p-4 h-72 md:h-72 lg:h-80 transform transition duration-500 hover:scale-100 hover:rotate-0 hover:-translate-y-4 ease-in-out">
            <div className="group w-full h-full relative rounded-md">
                <img width="600" height="600" src={image} alt="photos" className="shadow-xl border-2 border-black border-opacity-20 group-hover:border-black object-center rounded-md w-full h-full object-cover transition duration-500 ease-in-out group-hover:shadow-2xl" />

                <div className=" bg-opacity-0 group-hover:bg-opacity-50 bg-black text-white duration-300 absolute inset-px z-10 flex flex-col p-6 justify-end items-start cursor-default rounded font-bold tracking-wider">
                    <div className="opacity-0 group-hover:opacity-100 text-xl md:text-2xl lg:text-2xl">{title}</div>

                    <div className="opacity-0 group-hover:opacity-100 text-md mt-4 md:mt-2 lg:mt-0">{description}</div>
                </div>
            </div >
        </div >
    )
}

export default OurProjects;