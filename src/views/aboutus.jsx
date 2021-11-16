import AboutUsBody from "components/aboutus/AboutUsBody";
import Cover from "components/aboutus/Cover"
import Quality from "components/aboutus/Quality";

const AboutPage = () => {
    document.title = "ONLINESHOP - About Us";

    return (
        <main>
            <div>
                <Cover />
            </div>

            <div>
                <AboutUsBody />
            </div>

            <div>
                <Quality />
            </div>
        </main>
    )
}

export default AboutPage;