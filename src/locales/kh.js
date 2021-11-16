import kh_aboutus from "./aboutus/kh_aboutus";
import kh_clients from "./clients/kh_clients";
import kh_contactus from "./contactus/kh_contactus";
import kh_home from "./home/kh_home";
import kh_projects from "./projects/kh_projects";
import kh_services from "./services/kh_services";

const kh_lang = {
    translation: {
        ...kh_home,
        ...kh_clients,
        ...kh_aboutus,
        ...kh_projects,
        ...kh_contactus,
        ...kh_services,

        //Navigation
        home: "",
        services: "",
        clients: "",
        projects: "",
        aboutus: "",
        contactus: "",
        //End Navigation

        //Footer
        findus: "",
        company: "",
        specialize_in: "",
        inquiry: "",
        //End Footer
        explore_more: "",
        error_message: "",
        back_home: "",
        search: "ស្វែងរក"
    }
};

export default kh_lang;