import Cover from 'components/home/Cover';
import Category from 'components/home/Category';
import Support from 'components/home/Support';
import Slideshow from 'components/home/Slideshow';
import NewArrival from 'components/home/NewArrival';
import PopularProduct from 'components/home/PopularProduct';
import QuickViewProduct from 'components/home/QuickViewProduct';
import Subscribe from 'components/home/Subscribe';

const HomePage = () => {
    document.title = "ONLINESHOP - Home";

    return (
        <div className="mt-16">
            <div className="bg-gray-0">
                <Slideshow />
            </div>

            {/* <div className="bg-gray-0">
                <Cover />
            </div> */}

            <div className="bg-gray-0">
                <Category />
            </div>

            <div className="bg-gray-0">
                <Support />
            </div>
            
            <div className="bg-gray-0">
                {/* <PopularProduct /> */}
            </div>

            <div className="bg-gray-0">
                <NewArrival />
            </div>

            <div className="bg-gray-0">
                <Subscribe />
            </div>
        </div>
    )
}

export default HomePage;
