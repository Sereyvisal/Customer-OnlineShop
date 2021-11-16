import { Link } from 'react-router-dom';
import art from "assets/images/404_art.svg";
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
    document.title = "ONLINESHOP - 404 Error";
    const { t } = useTranslation();

    return (
        <div className="container mx-auto max-w-7xl mt-16 px-4 md:px-0" style={{ height: "70vh" }}>
            <div className="flex flex-col h-full justify-center space-y-6">
                <img width="600" height="600" src={art} alt="404_art" className="w-56 md:w-96 self-center justify-self-center" />

                <div className="grid grid-cols-1 self-center justify-self-center">
                    <div className="text-xl md:text-3xl font-bold text-center mb-4">
                        {t("error_message")}
                    </div>

                    <Link to="/" className="mt-4 mx-auto rounded border-2 border-red-600 hover:bg-red-600 hover:text-white font-semibold py-3 px-4">
                        {t("back_home")}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;
