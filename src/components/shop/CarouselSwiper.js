import Carousel from 'react-elastic-carousel'

const CarouselSwiper = () => {
    return (
        <div>
            <Carousel itemsToShow={6} pagination={false}>
              <div className="flex border border-white items-center justify-center w-80 h-80 bg-black text-white">1</div>
              <div className="flex border border-white items-center justify-center w-80 h-80 bg-black text-white">2</div>
              <div className="flex border border-white items-center justify-center w-80 h-80 bg-black text-white">3</div>
              <div className="flex border border-white items-center justify-center w-80 h-80 bg-black text-white">4</div>
              <div className="flex border border-white items-center justify-center w-80 h-80 bg-black text-white">5</div>
              <div className="flex border border-white items-center justify-center w-80 h-80 bg-black text-white">6</div>
            </Carousel>
        </div>
    )
  }
  
  export default CarouselSwiper