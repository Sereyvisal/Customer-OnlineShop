import zh_aboutus from "./aboutus/zh_aboutus";
import zh_clients from "./clients/zh_clients";
import zh_contactus from "./contactus/zh_contactus";
import zh_home from "./home/zh_home";
import zh_projects from "./projects/zh_projects";
import zh_services from "./services/zh_services";

const zhHans_lang = {
    translation: {
        ...zh_home,
        ...zh_clients,
        ...zh_aboutus,
        ...zh_projects,
        ...zh_contactus,
        ...zh_services,

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
        search: "搜索"
    }
};

export default zhHans_lang;