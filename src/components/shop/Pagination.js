import { useEffect } from "react";
import { useState } from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"

const Pagination = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(9);
    const [numPage, setNumPage] = useState(0);
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        setNumPage(Math.ceil(props.datas.length / recordPerPage));
    }, [props.datas])

    const changePage = (page) => {
        if (page < 1) page = 1;
        if (page > numPage) page = numPage;

        var filter = [];

        for (var i = (page -1) * recordPerPage; i < (page * recordPerPage); i++) {
            filter.push(props.datas[i]);
        }

        setFilterData(filter);
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage--);
            changePage(currentPage);
        }
    }

    const nextPage = () => {
        if (currentPage < numPage) {
            setCurrentPage(currentPage++);
            changePage(currentPage);
        }
    }

    return (
        <div className="flex justify-center mt-10">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                    <span className="sr-only">Previous</span>
                    <MdNavigateBefore className="h-5 w-5" aria-hidden="true" />
                </a>
                {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                    1
                </a>
                <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                    2
                </a>
                <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                >
                    3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                </span>
                <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                >
                    8
                </a>
                <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                    9
                </a>
                <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                    10
                </a>
                <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                    <span className="sr-only">Next</span>
                    <MdNavigateNext className="h-5 w-5" aria-hidden="true" />
                </a>
            </nav>
        </div>
    )
}

export default Pagination