import { resetPwd } from "api/generalAPI";
import { Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { meta } from "utils/enum";
const bcrypt = require('bcryptjs');

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ChangePassword = () => {
    const { userInfo } = useSelector(state => state.userReducer);

    const [currentPassError, setCurrentPassError] = useState('');
    const [success, setSuccess] = useState(false);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                current_pass: '',
                new_pass: '',
                confirm_pass: '',
            }}
            validate={values => {
                const errors = {};
                if (!values.current_pass) {
                    errors.country = 'Required';
                }
                else if (!values.new_pass) {
                    errors.address = 'Required';
                }
                else if (!values.confirm_pass) {
                    errors.city = 'Required';
                }

                if (values.new_pass != values.confirm_pass) {
                    errors.confirm_pass = 'Password not match.';
                }
                return errors;
            }}
            onSubmit={(values, actions) => {
                setTimeout(async () => {
                    console.log("value: ", values, "  ", bcrypt.compare(values.current_pass, userInfo.password));
                    // !await validatePwd(this.currentPassword, this.obj.password)
                    if (!await bcrypt.compare(values.current_pass, userInfo.password)) {
                        setCurrentPassError("Invalid current password.");
                        return;
                    }

                    var updateData = {
                        _id: userInfo._id,
                        password: bcrypt.hashSync(values.new_pass, bcrypt.genSaltSync(10))
                    }

                    await resetPwd(updateData)
                        .then((res) => {
                            if (res.meta == meta.OK) {
                                setSuccess(true);
                                setCurrentPassError('');
                                console.log("success");
                                // this.$toast.success("Password Reset Successfully");
                                actions.resetForm({
                                    values: {
                                        current_pass: '',
                                        new_pass: '',
                                        confirm_pass: ''
                                    }
                                });
                            }
                            else {
                                console.log(res);
                                // this.$toast.error(`Error - ${res.meta}`);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$toast.error("Error");
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
                        <div className="rounded bg-white shadow p-6 h-full">
                            <div className="flex justify-between items-center pb-6">
                                <p className="uppercase font-medium text-lg">Change Password</p>
                            </div>
                            {
                                success && <p className="text-green-500 text-lg mb-4">Password Reset Successfully.</p>
                            }

                            <div className="space-y-2">
                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-gray-500">Current Password</label>
                                    <input
                                        className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                        name="current_pass"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        value={values.current_pass}
                                        autoComplete="off"
                                    />
                                </div>
                                {
                                    currentPassError != '' && <span className="text-red-600 ml-2">{currentPassError}</span>
                                }

                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-gray-500">New Password</label>
                                    <input
                                        className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                        name="new_pass"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        value={values.new_pass}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-gray-500">Confirm Password</label>
                                    <input
                                        className="border border-gray-400 appearance-none rounded w-full px-3 py-2 focus focus:border-yellow-500 focus:outline-none active:outline-none active:border-indigo-600"
                                        name="confirm_pass"
                                        type="text"
                                        required
                                        onChange={handleChange}
                                        value={values.confirm_pass}
                                        autoComplete="off"
                                    />
                                </div>
                                {
                                    errors.confirm_pass && <span className="text-red-600 ml-2">{errors.confirm_pass}</span>
                                }
                            </div>

                            <div className="flex justify-center mt-4">
                                <button type="submit" className="w-32 md:mt-4 border border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-500 rounded hover:text-white py-2 font-medium uppercase">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            )
            }
        </Formik >
    )
}

export default ChangePassword