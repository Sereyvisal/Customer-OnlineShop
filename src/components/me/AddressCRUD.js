import { Formik } from "formik";
import { BsArrowLeft } from "react-icons/bs";
import countryList from "utils/countryList";
import stateList from "utils/stateList";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "redux/actions";
import { updateUserInfo } from "api/generalAPI";
import { meta } from "utils/enum";

const AddressCRUD = ({ title, setOpenForm, addressObj, resetAddressObj }) => {
    const { userInfo } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                country: addressObj.country,
                address: addressObj.address,
                city: addressObj.city,
                state: addressObj.state,
                zip: addressObj.zip,
                default: addressObj.default
            }}
            validate={values => {
                const errors = {};
                if (!values.country) {
                    errors.country = 'Required';
                }
                else if (!values.address) {
                    errors.address = 'Required';
                }
                else if (!values.city) {
                    errors.city = 'Required';
                }
                else if (!values.zip) {
                    errors.zip = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, actions) => {
                setTimeout(async () => {
                    console.log("value: ", values);
                    var updateData = userInfo;
                    
                    if (title == "Add Address") {
                        updateData.address.push(values);
                    }
                    else if (title == "Edit Address") {
                        updateData.address[addressObj.addressIndex] = values;
                    }

                    console.log("updateData: ", updateData);

                    await updateUserInfo(updateData)
                        .then((res) => {
                            if (res.meta == meta.OK) {
                                console.log(res);
                                dispatch(setUserInfo(res.data));
                                setOpenForm(false);
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
                    <div>
                        <div className="flex items-center uppercase font-medium text-lg">
                            <BsArrowLeft className="cursor-pointer mr-4" onClick={() => setOpenForm(false)} />
                            {title}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="address" className="text-gray-500">Address</label>
                        <input
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
                                className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                name="zip"
                                type="text"
                                required
                                onChange={handleChange}
                                value={values.zip}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="country" className="text-gray-500">Country / Region</label>
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
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="w-32 md:mt-4 border border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-500 rounded hover:text-white py-2 font-medium uppercase">Save</button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default AddressCRUD