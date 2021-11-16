import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useLocation } from "react-router";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
    const { t } = useTranslation();
    const currentLocation = useLocation(); 

    useEffect(() => {
        console.log("pages: ", props.pages);
    }, [props.pages])

    const getPath = (page) => {
        return "/" + page
    }

    const getName = (page) => {
        if (page == '') {
            return 'home'
        }
        else {
            return page
        }
    }
    
    return (
        //  className="mb-10"
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-3 lg:max-w-none">
                    <nav className="rounded font-sans w-full">
                        <ol className="list-reset flex text-grey-dark">
                            {/* <li><a href="#" className="font-bold">Home</a></li>
                            <li><span className="mx-2">/</span></li>
                            <li><a href="#" className="font-bold">Library</a></li>
                            <li><span className="mx-2">/</span></li>
                            <li>Data</li> */}

                            {
                                props.pages.map((p, index) => ( 
                                    <Link to={() => getPath(p)} key={index}>
                                        <li className={[`${getPath(p) == currentLocation.pathname ? "font-medium" : ""}`]}>
                                            {t(`${getName(p)}`)}
                                            <span className={[`${index == props.pages.length - 1 ? "hidden" : "mx-2"}`]}>/</span>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ol>
                    </nav>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Breadcrumb;