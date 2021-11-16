import { Formik } from "formik";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { meta } from "utils/enum";
import serverConfig from "utils/serverConfig";
import { uploadFile, deleteFile } from "api/generalAPI";
import { updateUserInfo } from "api/generalAPI";
import { setUserInfo } from "redux/actions";

const EditProfile = ({ onGoBack }) => {
    const inputFileRef = useRef();
    const { userInfo } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const old_avatar = userInfo.avatar;

    const [file, setFile] = useState();
    const [avatar, setAvatar] = useState(userInfo.avatar ? serverConfig.file_url + userInfo.avatar : serverConfig.blank_profile_img);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setAvatar(URL.createObjectURL(e.target.files[0]))
        console.log(e.target.files);
    }

    const handleUploadClick = () => {
        inputFileRef.current.click();
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                email: userInfo.email,
                gender: userInfo.gender,
                birthday: moment(userInfo.birthday).format("YYYY-MM-DD"),
                phone_number: userInfo.phone_number
            }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                }
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, actions) => {
                setTimeout(async () => {
                    var updateData = userInfo;
                    updateData.firstname = values.firstname;
                    updateData.lastname = values.lastname;
                    updateData.email = values.email;
                    updateData.gender = values.gender;
                    updateData.phone_number = values.phone_number;
                    updateData.birthday = values.birthday;

                    if (file != undefined && file != "") {
                        const fileImageForm = new FormData();
                        fileImageForm.append("file", file);

                        await uploadFile(fileImageForm)
                            .then((res) => {
                                // console.log("md5: ", res.file.md5);
                                updateData.avatar = res.file.md5;

                                // delete old image
                                if (old_avatar != null && old_avatar != '') {
                                    deleteFile(old_avatar)
                                        .then((res) => {
                                            console.log("deleted file");
                                        })
                                        .catch(console.log);
                                }

                            })
                            .catch(console.log);
                    }

                    // console.log("values: ", updateData);

                    await updateUserInfo(updateData)
                        .then((res) => {
                            if (res.meta == meta.OK) {
                                console.log(res);
                                dispatch(setUserInfo(res.data));
                                // window.location.reload();
                                onGoBack(false);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }, 400);
            }}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <BsArrowLeft className="cursor-pointer" onClick={() => onGoBack(false)} />

                    <div className="flex justify-center">
                        <img
                            // src={userInfo.avatar ? serverConfig.file_url + userInfo.avatar : serverConfig.blank_profile_img}
                            // src="https://i.pinimg.com/736x/93/f0/77/93f07738dc10819d9a36aba74f405675.jpg"
                            src={avatar}
                            className="w-52 h-52 object-cover object-top rounded-full"
                        />

                        <input type='file' className="hidden" ref={inputFileRef} onChange={onFileChange} />
                    </div>

                    <div className="flex justify-center pt-0 pb-3">
                        <button onClick={handleUploadClick} type="button" className="w-56 border border-yellow-500 bg-white text-yellow-500 text-sm rounded py-2 font-medium uppercase">Change Profile Photo</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                        <div>
                            <input
                                placeholder='First name'
                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                name="firstname"
                                type="text"
                                required
                                onChange={handleChange}
                                value={values.firstname}
                            />
                        </div>

                        <div>
                            <input
                                placeholder='Last name'
                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                name="lastname"
                                type="text"
                                required
                                onChange={handleChange}
                                value={values.lastname}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                        <div>
                            <input
                                placeholder='Email'
                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                name="email"
                                type="text"
                                required
                                onChange={handleChange}
                                value={values.email}
                            />
                        </div>

                        <div>
                            <input
                                placeholder='Phone'
                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                name="phone_number"
                                type="text"
                                required
                                onChange={handleChange}
                                value={values.phone_number}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                        <div>
                            <input
                                type="date"
                                name="birthday"
                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                required
                                onChange={handleChange}
                                value={values.birthday}
                            />

                        </div>

                        <div className="relative inline-block w-full text-gray-700">
                            <select
                                placeholder='Gender'
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                            >
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>

                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="w-32 md:mt-4 border border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-500 rounded hover:text-white py-2 font-medium uppercase">Save</button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default EditProfile