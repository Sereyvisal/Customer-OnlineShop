import Navbar from "components/Navbar";
import Footer from 'components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import ScrollToTop from "components/Scroll2Top";
import AOS from "aos"
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import { Store } from "./redux/store";

//Pages
import Home from "views/home";
import ProductDetailPage from "views/productdetail"
import AboutPage from "views/aboutus";
import ContactPage from "views/contactus";
import CartPage from "views/cart";
import CheckOutPage from "views/checkout";
import ErrorPage from "views/404";
import ShopPage from "views/shop";
import LoginPage from "views/login";
import RegisterPage from "views/register"
import ThankYouPage from "views/thankyou";

import { MdArrowUpward } from "react-icons/md";
import MePage from "views/me";

function App() {
  const [scroll, setscroll] = useState(false)

  useEffect(() => {
    AOS.init({
      delay: 0,
      duration: 1000,
      once: true,
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        setscroll(true);
      }
      else {
        setscroll(false);
      }
    });
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <Provider store={Store}>
      <Router>
        <div className="flex flex-col min-h-screen overflow-hidden">
          < Navbar />

          <Fragment>
            <ScrollToTop />

            {scroll && <button className="rounded-full active:bg-gray-300 hover:bg-gray-400 z-10 w-12 h-12 fixed m-4 md:m-8 bottom-0 right-0 text-xl flex justify-center" onClick={handleScroll}><MdArrowUpward className="self-center" /></button>}

            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/me" component={MePage} /> */}
              <Route exact path="/me/profile" component={MePage} />
              <Route exact path="/me/orders" component={MePage} />
              <Route exact path="/me/address" component={MePage} />
              <Route exact path="/me/security" component={MePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/shop" component={ShopPage} />
              <Route exact path="/shop/:id" component={ShopPage} />
              <Route exact path="/product/:id" component={ProductDetailPage} />
              <Route exact path="/aboutus" component={AboutPage} />
              <Route exact path="/contactus" component={ContactPage} />
              <Route exact path="/shoppingcart" component={CartPage} />
              <Route exact path="/checkout" component={CheckOutPage} />
              <Route exact path="/thankyou" component={ThankYouPage} />
              <Route path='*' exact={true} component={ErrorPage} />
            </Switch>
          </Fragment>

          <Footer />
        </div >
      </Router>
    </Provider>
  );
}

export default App;