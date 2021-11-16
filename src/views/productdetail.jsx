import CarouselSwiper from "components/shop/CarouselSwiper";
import ProductDetail from "components/shop/ProductDetail";
import ZoomImage from "components/shop/ZoomImage";

const ProductDetailPage = () => {
    document.title = "ONLINESHOP - Product Detail";

    return (
        <div className="mt-16">
            {/* <ZoomImage /> */}
            {/* <CarouselSwiper /> */}
            <div>
                <ProductDetail />
            </div>
        </div>
    )
}

export default ProductDetailPage;