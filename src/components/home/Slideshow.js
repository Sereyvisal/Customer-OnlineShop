import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { Fragment } from "react";

const Covers = [
    {
        title: 'Seasonal Picks',
        desc: 'GET ALL THE GOOD STUFF',
        imageUrl: 'https://d-themes.com/react/molla/demo-12/images/home/sliders/slide-1.jpg',
    },
    {
        title: 'Seasonal Picks',
        desc: 'Men fashions',
        imageUrl: 'https://images.unsplash.com/photo-1489370603040-dc6c28a1d37a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80',
    },
    {
        title: 'Seasonal Picks',
        desc: 'Children Fashion',
        imageUrl: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80'
    },
]

// const IndicatorWrapper = styled.div`
//   display: flex;
//   flex-wrap: nowrap;
//   position: absolute;
//   bottom: 15px;
//   right: 15px;
// `;

const Dot = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: white;
    opacity: ${(props) => (props.isActive ? 1 : 0.5)};
    margin: 5px;
    transition: 750ms all ease-in-out;
`;

const NavigatorStyle = `
    w-10 
    h-10 
    ml-2 
    md:ml-10 
    absolute 
    cursor-pointer 
    font-bold 
    text-gray-600 
    hover:text-white rounded-full hover:bg-black hover:bg-opacity-20 leading-tight text-center z-20 inset-y-0 left-0 my-auto flex justify-center content-center

    `

const Indicator = ({ currentSlide, amountSlides, nextSlide }) => {
    return (
        <div className="flex w-full absolute justify-center items-center bottom-4">
            {Array(amountSlides)
                .fill(1)
                .map((_, i) => (
                    <Dot
                        key={i}
                        isActive={currentSlide === i}
                        onClick={() => nextSlide(i)}
                    />
                ))}
        </div>
    );
};

const Navigator = ({ currentSlide, amountSlides, nextSlide, previousSlide }) => {
    return (
        <div>
            {Array(amountSlides)
                .fill(1)
                .map((_, i) => (
                    <Fragment key={i}>
                        <div className="w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer font-bold text-gray-600 hover:text-white rounded-full hover:bg-black hover:bg-opacity-20 leading-tight text-center z-20 inset-y-0 left-0 my-auto flex justify-center content-center"
                            onClick={() => previousSlide()}
                        >
                            <MdNavigateBefore className="text-4xl self-center" />
                        </div>

                        <div className="w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer font-bold text-gray-600 hover:text-white rounded-full hover:bg-black hover:bg-opacity-20 leading-tight text-center z-20 inset-y-0 right-0 my-auto flex justify-center content-center"
                            onClick={() => nextSlide()}
                        >
                            <MdNavigateNext className="text-4xl self-center" />
                        </div>
                    </Fragment>
                ))}
        </div>
    );
};

const Wrapper = {
    height: '100vh',
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'hidden',
    position: 'relative',
    height: '94vh',
    alignItems: 'center',
};

// const Slide = styled.div`
//   height: 100%;
//   width: 100vw;
//   flex-shrink: 0;
//   background-position: center;
//   background-size: cover;
//   transition: 750ms all ease-in-out;
// `;

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Gradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Slideshow = ({
    autoPlay = true,
    autoPlayTime = 7000,
    children,
    ...props
}) => {
    const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);

    function nextSlide(slideIndex = currentSlide + 1) {
        const newSlideIndex = slideIndex >= Covers.length ? 0 : slideIndex;
        
        setCurrentSlide(newSlideIndex);
    }

    function previousSlide(slideIndex = currentSlide - 1) {
        const newSlideIndex = slideIndex < 0 ? Covers.length-1 : slideIndex;
        
        setCurrentSlide(newSlideIndex);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, autoPlayTime);

        return () => clearTimeout(timer);
    }, [currentSlide]);

    return (
        // Wrapper
        <div style={Wrapper}>
            {Covers.map((cover, index) => (
                //Slider
                <Fragment key={index}>
                    <div className="items-center justify-center w-full h-full flex flex-shrink-0 duration-700 transition-all ease-in-out bg-top bg-cover"
                        
                        style={{
                            backgroundImage: `url(${cover.imageUrl})`,
                            marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
                        }}
                    >

                        {/* info */}
                        <div className="container absolute z-10 max-w-full self-center" data-aos="fade-up">
                            <div className="mx-auto max-w-7xl text-center text-white">
                                <h3 className="text-xs sm:text-xs md:text-lg font-medium uppercase">
                                    {cover.title}
                                </h3>

                                <h1 className="text-3xl sm:text-3xl md:text-6xl my-4 font-bold uppercase">
                                    {cover.desc}
                                </h1>

                                <Link to="/services" className="duration-200 transition ease-in mx-auto sm:mx-auto w-3/6 md:w-1/2 lg:w-52 flex justify-center items-center h-auto my-8 py-3 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 rounded text-sm text-white">
                                    <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">{t("explore_more")}</div>
                                    <FaArrowRight className="mx-4" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </Fragment>
            ))}
            
            {/* Navigator */}
            <Navigator
                currentSlide={currentSlide}
                amountSlides={Covers.length}
                nextSlide={nextSlide}
                previousSlide={previousSlide}
            />
            
            {/* Indicator */}
            <Indicator
                currentSlide={currentSlide}
                amountSlides={Covers.length}
                nextSlide={nextSlide}
            />


            {/* ChildrenWrapper */}
            {/* <ChildrenWrapper>
                <div className="container flex flex-col items-center mx-auto max-w-7xl text-center text-white">
                    <h3 className="text-xs sm:text-xs md:text-lg font-medium uppercase">
                        {cover.title}
                    </h3>

                    <h1 className="text-3xl sm:text-3xl md:text-6xl my-4 font-bold uppercase">
                        {cover.desc}
                    </h1>

                    <Link to="/services" className="duration-200 transition ease-in mx-auto sm:mx-auto w-3/6 md:w-1/2 lg:w-52 flex justify-center items-center h-auto my-8 py-3 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 rounded text-sm text-white">
                        <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">{t("explore_more")}</div>
                        <FaArrowRight className="mx-4" />
                    </Link>
                </div>
            </ChildrenWrapper> */}
        </div>


        // relative flex flex-nowrap overflow-x-hidden
        // <section className="flex flex-nowrap overflow-x-hidden">
        //     {Covers.map((cover, index) => (
        //         <div className="relative items-center" style={{ minHeight: "94vh" }} >
        //             <div className="absolute w-full h-full flex-shrink-0 duration-700 transition-all ease-in-out bg-top bg-cover" style={{ backgroundImage: `url(${cover.imageUrl})` }}>
        //                 {/* <span className="w-full h-full absolute opacity-60 bg-cyan-900"></span> */}
        //             </div>

        //             {/* <div className="container relative mx-auto max-w-7xl text-center text-white" data-aos="fade-up">
        //                 <h3 className="text-xs sm:text-xs md:text-lg font-medium uppercase">
        //                     seasonal picks
        //                 </h3>

        //                 <h1 className="text-3xl sm:text-3xl md:text-6xl my-4 font-bold uppercase">
        //                     Get all the good stuff
        //                 </h1>

        //                 <Link to="/services" className="duration-200 transition ease-in mx-auto sm:mx-auto w-3/6 md:w-1/2 lg:w-52 flex justify-center items-center h-auto my-8 py-3 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 rounded text-sm text-white">
        //                     <div className="text-xs sm:text-xs md:text-sm uppercase font-medium">{t("explore_more")}</div>
        //                     <FaArrowRight className="mx-4" />
        //                 </Link>
        //             </div> */}
        //         </div>
        //     ))}

        //     <Indicator
        //         currentSlide={currentSlide}
        //         amountSlides={Covers.length}
        //         nextSlide={nextSlide}
        //     />
        // </section>
    );
};

export default Slideshow;
