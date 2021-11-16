import ContactForm from 'components/contactus/ContactUsForm';
import Cover from "components/contactus/Cover"
import ContactUsBody from 'components/contactus/ContactUsBody';
import { useLocation } from 'react-router';
import Breadcrumb from 'components/Breadcrumb';

const ContactPage = () => {
    document.title = "ONLINESHOP - Contact Us";
    const location = useLocation();
    const pages = location.pathname.split('/');

    return (
        <main>
            <div>
                <Cover />
            </div>

            {/* <div>
                <Breadcrumb pages={pages} />
            </div> */}

            <div>
                <ContactUsBody />
            </div>

            {/* <div className="container mx-auto max-w-7xl px-4 md:px-0">
                <ContactInfo />
            </div> */}

            <div className="container mx-auto max-w-7xl px-4 md:px-0">
                <ContactForm />
            </div>
        </main >
    )
}

export default ContactPage;