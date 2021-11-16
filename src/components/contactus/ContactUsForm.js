import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';
import { useState } from 'react';

const ContactForm = () => {
    const { t } = useTranslation();
    const { today, setToday } = useState();

    const handleSubmit = (e) => {
        emailjs.sendForm(`service_utougyh`, "template_loxy5ka", e.target, "user_ajRe7CAQcpSugunYu0rmF")
            .then((result) => {
                alert("Message Sent, We will get back to you shortly", result.text);

                e.target.reset();
            })
            .catch(error => {
                alert("An error occurred, Please try again");
                console.log(error.text)
            });
    }

    return (
        <div data-aos="fade-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-full mx-auto lg:max-w-none">
                    <h1 className="font-bold text-2xl lg:text-3xl text-center uppercase">
                        {t("get_in_touch")}
                    </h1>

                    <p className="text-center text-lg md:text-xl text-gray-500 mt-2">
                        Use the form below to get in touch with us
                    </p>

                    <form onSubmit={handleSubmit} className="my-6">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* <div className="grid grid-cols-1 px-0 py-2 md:p-4">
                                <label htmlFor="email" className="my-2 text-md font-medium tracking-wider">
                                    {t("form_label1")}
                                </label>

                                <input type="email" name="email" className="w-full p-4 border-2 border-gray-200 font-medium rounded focus:border-yellow-500 focus:outline-none" placeholder={t("form_placeHolder1")} required />
                            </div> */}

                            <div className="grid grid-cols-1 px-0 py-2 md:p-4">
                                <label htmlFor="firstname" className="my-2 text-md font-medium tracking-wider">
                                    {t("firstname")}
                                </label>

                                <input type="text" name="firstname" className="w-full p-4 border-2 border-gray-200 font-medium rounded focus:border-yellow-500 focus:outline-none" placeholder={t("firstname")} required />
                            </div>

                            <div className="grid grid-cols-1 px-0 py-2 md:p-4">
                                <label htmlFor="lastname" className="my-2 text-md font-medium tracking-wider">
                                    {t("lastname")}
                                </label>

                                <input type="text" name="lastname" className="w-full p-4 border-2 border-gray-200 font-medium rounded focus:border-yellow-500 focus:outline-none" placeholder={t("lastname")} required />
                            </div>

                            {/* <div className="grid grid-cols-1 px-0 py-2 md:p-4">
                                <label htmlFor="date" className="my-2 text-md font-medium tracking-wider">
                                    {t("form_label3")}
                                </label>

                                <input type="date" name="date" className="w-full p-4 border-2 border-gray-200 font-medium rounded focus:border-yellow-500 focus:outline-none" required />
                            </div> */}

                            <div className="grid grid-cols-1 px-0 py-2 md:p-4">
                                <label htmlFor="email" className="my-2 text-md font-medium tracking-wider">
                                    {t("email")}
                                </label>

                                <input type="email" name="email" className="w-full p-4 border-2 border-gray-200 font-medium rounded focus:border-yellow-500 focus:outline-none" placeholder={t("email")} required />
                            </div>

                            <div className="grid grid-cols-1 px-0 py-2 md:p-4">
                                <label htmlFor="phone" className="my-2 text-md font-medium tracking-wider">
                                    {t("phone")}
                                </label>

                                <input type="number" name="phone" className="w-full p-4 border-2 border-gray-200 font-medium rounded focus:border-yellow-500 focus:outline-none" placeholder={t("phone")} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 px-0 py-2 md:p-4">
                            <label htmlFor="message" className="my-2 text-md font-medium tracking-wider">
                                {t("message")}
                            </label>

                            <textarea type="type" name="message" className="w-full h-56 p-4 border-2 border-gray-200 font-medium rounded focus:border-yellow-500 focus:outline-none" placeholder={t("message")} style={{ resize: "none" }} required></textarea>
                        </div>

                        <div className="w-full text-center py-4">
                            <button type="submit" className="py-3 px-6 lg:py-4 lg:px-8 bg-white border-2 border-yellow-500 rounded uppercase font-bold transform transition ease-in-out duration-300 hover:bg-yellow-500 hover:text-white active:bg-yellow-500">
                                {t("submit")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactForm;
