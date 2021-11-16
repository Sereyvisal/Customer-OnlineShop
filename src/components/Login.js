import { useState } from "react"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { Link, useHistory } from "react-router-dom";
import { Formik } from 'formik';
import { login } from '../api/generalAPI'
import { meta } from "../utils/enum"
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, setToken } from "../redux/actions";
import { setLocalToken, setUserId } from "../utils/auth";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [invalid, setInvalid] = useState(false);

    return (
        <div className="h-screen bg-gray-100 relative flex flex-col space-y-10 justify-center items-center">
            <div className="bg-white shadow-none md:shadow-lg rounded p-7 w-96 md:w-1/2 lg:w-1/3 2xl:w-1/4" >
                <h1 className="text-3xl font-bold leading-normal uppercase">Log In</h1>
                <span className="text-red-600 transition duration-300 ease-in-out">{invalid ? 'Incorrect email or password.' : ' '}</span>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            console.log("values: ", values);
                            
                            login(values).then(res => {
                                if (res.meta == meta.OK) {
                                    setLocalToken(res.data.token);
                                    setUserId(res.data._id);

                                    dispatch(setToken(res.data.token));
                                    dispatch(setUserInfo(res.data));
                                    
                                    history.push(`/`);
                                    window.location.reload();
                                }
                                else {
                                    setInvalid(true);
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            });

                            actions.resetForm({
                                values: {
                                    email: '', 
                                    password: ''
                                }
                            });
                        }, 400);
                    }}
                >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
                            <div className="w-full">
                                <input 
                                    placeholder='Email' 
                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-3 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600" 
                                    name="email" 
                                    type="email" 
                                    value={values.email}
                                    required
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                <input 
                                    type={(showPassword) ? 'text' : 'password'} 
                                    name="password" 
                                    placeholder='Password' 
                                    className="px-3 py-3 placeholder-gray-400 relative bg-white bg-white rounded border border-gray-400 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600 w-full pr-10" 
                                    value={values.password}
                                    required 
                                    onChange={handleChange}
                                />

                                <button type="button" className="z-10 h-full leading-snug font-normal absolute text-center text-yellow-500 absolute rounded text-base flex items-center justify-center w-11 right-0">
                                    {(showPassword) ?
                                        <BsEyeSlash className="self-center text-xl" onClick={() => setShowPassword(show => show = !show)} />
                                        :
                                        <BsEye className="self-center text-xl" onClick={() => setShowPassword(show => show = !show)} />
                                    }
                                </button>
                            </div>

                            <div className="-m-2">
                                <a className="font-bold text-yellow-500 hover:underline hover:p-5 p-2 rounded-full" href="#">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-center bg-yellow-500 rounded-full text-white py-3 font-medium uppercase">Login</button>
                    </form>
                    )}
                </Formik>
            </div>
            <p>Don't have an account?<Link to="/register" className="text-yellow-500 font-bold hover:underline hover:p-5 p-2 rounded-full" href="#">Register</Link></p>
        </div>
    )
}

export default Login