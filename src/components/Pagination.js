import { useState, useEffect } from 'react';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Pagination = ({ pages, setCurrentPage }) => {

    //Set number of pages
    const numberOfPages = []
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i)
    }

    // Current active button number
    const [currentButton, setCurrentButton] = useState(1)

    // Array of buttons what we see on the page
    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

    useEffect(() => {
        let tempNumberOfPages = [...arrOfCurrButtons]

        let dotsInitial = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'

        if (numberOfPages.length < 6) {
            tempNumberOfPages = numberOfPages
        }

        else if (currentButton >= 1 && currentButton <= 3) {
            tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
        }

        else if (currentButton === 4) {
            const sliced = numberOfPages.slice(0, 5)
            tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
        }

        else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {               // from 5 to 8 -> (10 - 2)
            const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5] 
            const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
            tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) // [1, '...', 4, 5, 6, '...', 10]
        }

        else if (currentButton > numberOfPages.length - 3) {                 // > 7
            const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4) 
            tempNumberOfPages = ([1, dotsLeft, ...sliced])
        }

        else if (currentButton === dotsInitial) {
            // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3 
            // arrOfCurrButtons[3] = 4 + 1 = 5
            // or 
            // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
            // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
            setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
        }
        else if (currentButton === dotsRight) {
            setCurrentButton(arrOfCurrButtons[3] + 2)
        }

        else if (currentButton === dotsLeft) {
            setCurrentButton(arrOfCurrButtons[3] - 2)
        }

        setArrOfCurrButtons(tempNumberOfPages)
        setCurrentPage(currentButton)
    }, [currentButton, pages])


    return (
        <div className="flex justify-center mt-10">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                    href="#"
                    className={classNames(`${currentButton === 1 ? 'opacity-20' : ''}`, ' relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50')}
                    onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
                >
                    <span className="sr-only">Previous</span>
                    <MdNavigateBefore className="h-5 w-5" aria-hidden="true" />
                </a>

                {arrOfCurrButtons.map(((item, index) => {
                    return <a
                        href="#"
                        key={index}
                        className={`${currentButton === item ? 'z-10 border-yellow-500 text-yellow-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'}`}
                        style={{backgroundColor: currentButton == item ? '#f2e6d9' : ''}}
                        onClick={() => setCurrentButton(item)}
                    >
                        {item}
                    </a>
                }))}

                <a
                    href="#"
                    className={classNames(`${currentButton === numberOfPages.length ? 'opacity-20' : ''}`, ' relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50')}
                    onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
                >
                    <span className="sr-only">Next</span>
                    <MdNavigateNext className="h-5 w-5" aria-hidden="true" />
                </a>
            </nav>
        </div>
    );
}

export default Pagination
