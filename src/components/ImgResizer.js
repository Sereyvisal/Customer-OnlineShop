// import React, { Component } from "react";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

const ImgResizer = () => {
    const [largeImg, setLargeImg] = useState('');

    const fileChangedHandler = (event) => {
        var fileInput = false;
        if (event.target.files[0]) {
            console.log(typeof event.target.files[0], event.target.files[0]);
            fileInput = true;
        }
        // if (fileInput) {
        //     try {
        //         Resizer.imageFileResizer(
        //             event.target.files[0],
        //             2000,
        //             2000,
        //             "JPEG",
        //             100,
        //             0,
        //             (uri) => {
        //                 setLargeImg(uri);
        //             },
        //             "base64",
        //             1000,
        //             1000
        //         );
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        var converted = null;

        // if (props.image) {
            // Converting "image source" (url) to "Base64"
            let url = event.target.files[0];
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
                return new File([u8arr], filename, { type: 'image/jpeg' });
            }

            // Calling both function
            toDataURL(url)
                .then(dataUrl => {
                    // console.log('Here is Base64 Url', dataUrl)
                    var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                    // console.log("Here is JavaScript File Object", fileData)
                    converted = fileData;

                    // if (fileData) {
                    try {
                        Resizer.imageFileResizer(
                            fileData,
                            1000,
                            1000,
                            "JPEG",
                            100,
                            0,
                            (uri) => {
                                setLargeImg(uri);
                            },
                            "base64",
                            2000,
                            2000
                        );
                    } catch (err) {
                        console.log(err);
                    }
                // }
                })

        // }
    }

    return (
        <div className="mt-20">
            <input type="file" onChange={fileChangedHandler} />
            <img src={largeImg} alt="" />
        </div>
    );
}

export default ImgResizer;