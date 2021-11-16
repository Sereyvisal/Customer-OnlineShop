import { useEffect } from "react";

const ProductDescription = (prop) => {
    // useEffect(() => {
    //     console.log("description: ", prop.description);
    // }, [prop.description]);
    return (
        <div>
            <h1 className="flex justify-center text-2xl font-semibold text-gray-900 uppercase my-8">
                Product Description
            </h1>

            <div className="flex justify-center items-center text-xl font-normal text-center px-16">
                <div dangerouslySetInnerHTML={{__html: prop.description}}></div>
            </div>
        </div>
    )
}

export default ProductDescription