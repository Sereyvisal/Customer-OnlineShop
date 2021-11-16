import { useEffect, useState } from "react"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { Link, useHistory } from "react-router-dom";
import { Formik } from 'formik';
import { register } from '../api/generalAPI'
import { meta } from "../utils/enum"

const Register = () => {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="h-screen bg-gray-100 relative flex flex-col mt-10 space-y-5 md:space-y-10 justify-center items-center">
            <div className="bg-white shadow-none md:shadow-lg rounded p-6 pt-5 md:p-7 w-96 sm:w-3/4 lg:w-2/3 xl:w-1/2" >
                <h1 className="text-3xl font-bold leading-normal uppercase">Register</h1>

                <Formik
                    initialValues={{ firstname: '', lastname: '', email: '', password: '', con_password: '', gender: '', birthday: '', phone_number: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        }
                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }

                        if (values.password && values.con_password) {
                            if (values.password != values.con_password) {
                                errors.password = "Password not match"
                            }
                        }

                        return errors;
                    }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            console.log("values: ", values);

                            register(values).then(res => {
                                if (res.meta == meta.OK) {
                                    console.log("register: ", res);
                                    actions.resetForm({
                                        values: {
                                            firstname: '',
                                            lastname: '',
                                            email: '',
                                            password: '',
                                            con_password: '',
                                            gender: '',
                                            birthday: '',
                                            phone_number: ''
                                        }
                                    });
                                    setTimeout(() => {
                                        history.push(`/login`);
                                    }, 1000);
                                }
                            })
                                .catch(err => {
                                    console.log(err)
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
                        <form className="space-y-5 mt-5 md:mt-10" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                                <div>
                                    <input
                                        placeholder='First name'
                                        className="border border-gray-400 appearance-none rounded w-full px-3 py-3 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
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
                                        className="border border-gray-400 appearance-none rounded w-full px-3 py-3 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
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
                                        className="border border-gray-400 appearance-none rounded w-full px-3 py-3 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
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
                                        className="border border-gray-400 appearance-none rounded w-full px-3 py-3 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
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
                                        className="border border-gray-400 appearance-none rounded w-full p-3 focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                        required
                                        onChange={handleChange}
                                        value={values.birthday}
                                    />

                                </div>

                                <div>
                                    {/* <input
                                        placeholder='Gender'
                                        className="border border-gray-400 appearance-none rounded w-full px-3 py-3 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                        name="gender"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        value={values.gender}
                                    /> */}

                                    <div className="relative inline-block w-full text-gray-700">
                                        <select
                                            placeholder='Gender'
                                            name="gender"
                                            value={values.gender}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="border border-gray-400 appearance-none rounded w-full px-3 py-3 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                        >
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>

                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                                <div className="relative flex w-full flex-wrap items-stretch md:mb-3">
                                    <input
                                        type={(showPassword) ? 'text' : 'password'}
                                        name="password"
                                        placeholder='Password'
                                        className="px-3 py-3 placeholder-gray-400 relative bg-white bg-white rounded border border-gray-400 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600 w-full pr-10"
                                        required
                                        onChange={handleChange}
                                        value={values.password}
                                    />

                                    <button
                                        type="button"
                                        className="z-10 h-full leading-snug font-normal absolute text-center text-yellow-500 absolute rounded text-base flex items-center justify-center w-11 right-0"
                                    >
                                        {(showPassword) ?
                                            <BsEyeSlash className="self-center text-xl" onClick={() => setShowPassword(show => show = !show)} required />
                                            :
                                            <BsEye className="self-center text-xl" onClick={() => setShowPassword(show => show = !show)} />
                                        }
                                    </button>
                                </div>

                                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <input
                                        type={(showConfirm) ? 'text' : 'password'}
                                        name="con_password"
                                        placeholder='Confirm password'
                                        className="px-3 py-3 placeholder-gray-400 relative bg-white bg-white rounded border border-gray-400 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600 w-full pr-10"
                                        required
                                        onChange={handleChange}
                                        value={values.con_password}
                                    />

                                    <button
                                        type="button"
                                        className="z-10 h-full leading-snug font-normal absolute text-center text-yellow-500 absolute rounded text-base flex items-center justify-center w-11 right-0"
                                    >
                                        {(showConfirm) ?
                                            <BsEyeSlash className="self-center text-xl" onClick={() => setShowConfirm(show => show = !show)} />
                                            :
                                            <BsEye className="self-center text-xl" onClick={() => setShowConfirm(show => show = !show)} />
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                                <div className="hidden md:block">

                                </div>

                                <div className="pl-2 -mt-8">
                                    <span className="text-red-600 text-sm transition duration-300 ease-in-out">{errors.password}</span>
                                </div>
                            </div>

                            <button type="submit" className="w-full md:mt-5 text-center bg-yellow-500 rounded-full text-white py-3 font-medium uppercase">Register</button>
                        </form>
                    )}
                </Formik>
            </div>
            <p>Have an existing account?<Link to="/login" className="text-yellow-500 font-bold hover:underline hover:p-5 p-2 rounded-full" href="#">Login</Link></p>
        </div>
    )
}

export default Register