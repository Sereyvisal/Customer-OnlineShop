import { useEffect, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import Resizer from "react-image-file-resizer";

const ZoomImg = (props) => {
    const [image, setImage] = useState(''); 
    const [largeImg, setLargeImg] = useState('');

    useEffect(() => {
        // console.log("image: ", props.image);

        if (props.image) {
            // Converting "image source" (url) to "Base64"
            let url = props.image;
            const toDataURL = url => fetch(url)
                .then(response => response.blob())
                .then(blob => new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result)
                    reader.onerror = reject
                    reader.readAsDataURL(blob)
                }))

            // Converting "Base64" to javascript "File Object
            function dataURLtoFile(dataurl, filename) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: "image/jpeg" }); //type: mime
            }

            // Calling both function
            toDataURL(url)
                .then(dataUrl => {
                    // console.log('Here is Base64 Url', dataUrl)
                    var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                    // console.log("Here is JavaScript File Object", fileData);
                    // resizeImage(fileData, 600, 600, 600, 600, 'image');
                    // resizeImage(fileData, 2000, 2000, 1000, 1000, 'largeImage');

                    try {
                        Resizer.imageFileResizer(
                            fileData,
                            2000,
                            2000,
                            "JPEG",
                            100,
                            0,
                            (uri) => {
                                setLargeImg(uri);
                            },
                            "base64",
                            1000,
                            1000
                        );
                    } catch (err) {
                        console.log(err);
                    }

                    try {
                        Resizer.imageFileResizer(
                            fileData,
                            600,
                            600,
                            "JPEG",
                            100,
                            0,
                            (uri) => {
                                setImage(uri);
                            },
                            "base64",
                            600,
                            600
                        );
                    } catch (err) {
                        console.log(err);
                    }
                })
        }
    }, [props]);

    // const resizeImage = (file, maxWidth, maxHeight, minWidth, minHeight, type) => {
    //     try {
    //         Resizer.imageFileResizer(
    //             file,
    //             maxWidth,
    //             maxHeight,
    //             "JPEG",
    //             100,
    //             0,
    //             (uri) => {
    //                 if (type == 'image') {
    //                     setImage(uri);
    //                 }
    //                 else if (type == 'largeImage') {
    //                     setLargeImg(uri);
    //                 }
    //             },
    //             "base64",
    //             minWidth,
    //             minHeight
    //         );
    //     } 
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <div>
            {largeImg &&
                <InnerImageZoom
                    src={image}
                    zoomSrc={largeImg}
                    zoomType="hover"
                    zoomPreload={true}
                    fadeDuration={300}
                />
            }
        </div>
    )
}

export default ZoomImg