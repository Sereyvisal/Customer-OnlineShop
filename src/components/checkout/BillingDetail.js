import { Formik } from 'formik';
import countryList from 'utils/countryList';
import stateList from 'utils/stateList';

const BillingDetail = () => {
    return (
        <div className="mr-4">
            <h4 className="font-bold mb-3">Billing Detail</h4>

            <Formik
                initialValues={{ firstname: '', lastname: '', email: '', phone: '', country: 'Cambodia', address: '', city: '', state: '', zip: '' }}
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

                        // register(values).then(res => {
                        //     if (res.meta == meta.OK) {
                        //         console.log("register: ", res);
                        //         actions.resetForm({
                        //             values: {
                        //                 firstname: '',
                        //                 lastname: '',
                        //                 email: '',
                        //                 password: '',
                        //                 con_password: '',
                        //                 gender: '',
                        //                 birthday: '',
                        //                 phone_number: ''
                        //             }
                        //         });
                        //         setTimeout(() => {
                        //             history.push(`/login`);
                        //         }, 1000);
                        //     }
                        // })
                        // .catch(err => {
                        //     console.log(err)
                        // });
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
                    <form className="space-y-3 mt-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                            <div className="space-y-2">
                                <label htmlFor="firstname" className="text-gray-500">First Name</label>
                                <input
                                    // placeholder='First name'
                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                    name="firstname"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.firstname}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="lastname" className="text-gray-500">Last Name</label>
                                <input
                                    // placeholder='Last name'
                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                    name="lastname"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.lastname}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="country" className="text-gray-500">Country / Region</label>
                            {/* <input
                                // placeholder='First name'
                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                name="country"
                                type="text"
                                required
                                onChange={handleChange}
                                value={values.country}
                            /> */}

                            <div className="relative inline-block w-full text-gray-700">
                                <select
                                    name="country"
                                    value={values.country}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                >
                                    {countryList.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>

                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="address" className="text-gray-500">Address</label>
                            <input
                                // placeholder='First name'
                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                name="address"
                                type="text"
                                required
                                onChange={handleChange}
                                value={values.address}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                            <div className="space-y-2">
                                <label htmlFor="city" className="text-gray-500">City</label>
                                <input
                                    // placeholder='First name'
                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                    name="city"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.city}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="state" className="text-gray-500">State</label>
                                {/* <input
                                    // placeholder='First name'
                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                    name="state"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.state}
                                /> */}

                                <div className="relative inline-block w-full text-gray-700">
                                    <select
                                        name="state"
                                        value={values.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                    >
                                        {stateList.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>

                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-4">
                            <div className="space-y-2">
                                <label htmlFor="zip" className="text-gray-500">Zip Code</label>
                                <input
                                    // placeholder='First name'
                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                    name="zip"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    value={values.zip}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-gray-500">Phone</label>
                                <input
                                    // placeholder='First name'
                                    className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                    name="phone"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.phone}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-gray-500">Email</label>
                            <input
                                // placeholder='First name'
                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                name="email"
                                type="text"
                                onChange={handleChange}
                                value={values.email}
                            />
                        </div>

                        {/* <button type="submit" className="w-full md:mt-5 text-center bg-yellow-500 rounded-full text-white py-2 font-medium uppercase">Register</button> */}
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default BillingDetail;