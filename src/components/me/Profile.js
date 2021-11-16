import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import serverConfig from "utils/serverConfig";
import { status_type } from "utils/enum";
import { MdPendingActions, MdOutlineShoppingBag } from "react-icons/md";
import { useState } from "react";
import EditProfile from "./EditProfile";

function getPendingOrderQty(orders) {
    var count = 0;

    if (orders) {
        for (var order of orders) {
            if (order.status[0].type == status_type.Pending) {
                count++;
            }
        }
    }

    return count;
}

const Profile = () => {
    const { userInfo, orders } = useSelector(state => state.userReducer);
    const [edit, setEdit] = useState(false);

    const handleEdit = (value) => {
        setEdit(value);
    }

    return (
        <div>
            {!edit &&
                <div>
                    <div className="rounded bg-white shadow">
                        {userInfo &&
                            <div className="py-10">
                                <div className="flex justify-center">
                                    <img
                                        src={userInfo.avatar ? serverConfig.file_url + userInfo.avatar : serverConfig.blank_profile_img}
                                        // src="https://i.pinimg.com/736x/93/f0/77/93f07738dc10819d9a36aba74f405675.jpg"
                                        className="w-52 h-52 object-cover object-top rounded-full"
                                    />
                                </div>

                                <p className="text-center text-lg font-medium mt-4">
                                    {userInfo.firstname} {userInfo.lastname}
                                </p>

                                <p className="text-center text-lg text-gray-500">
                                    {userInfo.email}
                                </p>

                                <div className="flex justify-center">
                                    <div onClick={() => setEdit(true)} className="duration-200 transition ease-in w-32 flex justify-center items-center py-2 mt-4 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded text-sm text-yellow-500 cursor-pointer">
                                        <div className="flex items-center text-xs sm:text-xs md:text-sm uppercase font-medium">
                                            Edit Profile
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="mt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex justify-between rounded bg-white shadow p-6">
                                <span className="flex items-center uppercase text-lg font-medium">
                                    <MdOutlineShoppingBag className="text-2xl mr-2 text-blue-500" />
                                    Total Order Quantity:
                                </span>
                                <span className="uppercase text-lg font-medium">
                                    {orders ? orders.length : '0'}
                                </span>
                            </div>

                            <div className="flex justify-between rounded bg-white shadow p-6">
                                <span className="flex items-center uppercase text-lg font-medium">
                                    <MdPendingActions className="text-2xl mr-2 text-green-400" />
                                    Pending Order:
                                </span>

                                <span className="uppercase text-lg font-medium">{getPendingOrderQty(orders)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {edit &&
                <div className="rounded bg-white shadow p-6">
                    <EditProfile onGoBack={handleEdit} />
                </div>
            }
        </div>
    )
}
export default Profile