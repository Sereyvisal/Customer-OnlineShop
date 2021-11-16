import en_aboutus from "./aboutus/en_aboutus";
import en_clients from "./clients/en_clients";
import en_contactus from "./contactus/en_contactus";
import en_home from "./home/en_home";
import en_projects from "./projects/en_projects";
import en_services from "./services/en_services";

console.log()

const en_lang = {
    translation: {
        ...en_home,
        ...en_clients,
        ...en_aboutus,
        ...en_projects,
        ...en_contactus,
        ...en_services,

        //Navigation
        home: "Home",
        shop: "Shop",
        services: "Services",
        clients: "Clients",
        projects: "Projects",
        aboutus: "About Us",
        contactus: "Contact Us",
        shoppingcart: "Shopping Cart",
        checkout: "Check Out",
        //End Navigation

        //Footer
        findus: "Find us at",
        company: "Company",
        specialize_in: "We specialize in",
        inquiry: "Work Inquiries",
        //End Footer
        explore_more: "Explore More",
        error_message: "The page you are looking for does not exist",
        back_home: "Go back Home",
        search: "Search",
        collections: "Collections",
        new_arrival: "New Arrivals",
        men: "Men",
        women: "Women",
        children: "Children",
        all: "All",
        popular_product: "Popular Products",
        add_cart: "Add to cart",
        add_wishlist: "Add to wishlist",
        select_options: "Select Options",
        follow_us_on: "Follow us on",
        subscribe_newsletter: "SUBSCRIBE TO OUR NEWSLETTER",
        subscribe_desc: "Sign up now for 10% discount on first order.",
        subscribe: "Subscribe",
        enter_email: "Enter your email address",
        show_more: "Show More",
        about_us: "About Us",
        contact_us: "Contact Us",
        contact_us_desc: "Keep in touch with us",
        address: "Address",
        phone: "Phone",
        email: "E-mail",
        open_hour: "Opening Hours",
        get_in_touch: "Get in touch",
        firstname: "First Name",
        lastname: "Last Name",
        message: "Message",
        submit: "Submit",
        coupon: "Coupon"
    }
};

export default en_lang;