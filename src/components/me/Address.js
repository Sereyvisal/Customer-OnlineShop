import { useSelector, useDispatch } from "react-redux";
import { MdPlace, MdEdit, MdDelete, MdOutlineTaskAlt, MdAdd } from "react-icons/md";
import { useState } from "react";
import AddressCRUD from "./AddressCRUD";
import { setUserInfo } from "redux/actions";
import { meta } from "utils/enum";
import { updateUserInfo } from "api/generalAPI";
import ConfirmDialog from "components/ConfirmDialog";

const newObj = {
    country: 'Cambodia',
    address: '',
    city: '',
    state: '',
    zip: '',
    default: false,
    addressIndex: null
};

const Address = () => {
    const { userInfo } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [openForm, setOpenForm] = useState(false);
    const [action, setAction] = useState('');
    const [addressObj, setAddressObj] = useState(newObj);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState();

    const handleOpenForm = (action, address, index) => {
        address.addressIndex = index;

        setAddressObj(address);
        setAction(action);
        setOpenForm(true);
    }

    const resetAddressObj = () => {
        setAddressObj(newObj);
    }

    const handleUpdateAddress = (index, isDelete) => {
        var updateData = userInfo;

        if (!isDelete) {
            for (var p of updateData.address) {
                if (p.default) {
                    p.default = false;
                    break;
                }
            }

            updateData.address[index].default = true;
        }
        else {
            updateData.address.splice(index, 1);
        }

        updateUserInfo(updateData)
            .then((res) => {
                if (res.meta == meta.OK) {
                    dispatch(setUserInfo(res.data));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleConfirmDialog = (value) => {
        if (value == true) {
            handleUpdateAddress(deleteIndex, true);
        }
    }

    const handleOpenDialog = (index) => {
        setOpenDialog(true);
        setDeleteIndex(index);
    }

    return (
        <div>
            {!openForm &&
                <div className="rounded bg-white shadow p-6 h-full">
                    <ConfirmDialog handleConfirmDialog={handleConfirmDialog} openDialog={openDialog} setOpenDialog={setOpenDialog} />

                    <div className="flex justify-between items-center pb-6 border-b">
                        <p className="uppercase font-medium text-lg">Address</p>

                        <div>
                            <div onClick={() => handleOpenForm('Add Address', newObj, null)} className="duration-200 transition ease-in w-32 flex justify-center items-center py-2 border border-yellow-500 active:bg-yellow-500 hover:bg-yellow-500 hover:text-white rounded text-yellow-500 cursor-pointer">
                                <div className="flex items-center text-xs uppercase font-medium">
                                    <MdAdd className="text-base mr-1" />Add Address
                                </div>
                            </div>
                        </div>
                    </div>

                    {userInfo && userInfo.address && userInfo.address.length > 0 &&
                        userInfo.address.map((p, index) => (
                            <div key={index} className="flex justify-between border-b py-6">
                                <div className="flex items-center">
                                    <MdPlace className="text-red-600 text-xl mr-2" />
                                    <span>
                                        {p.address + ', ' + p.city + ', ' + ((p.state) ? p.state + ', ' : '') + p.zip + ', ' + p.country}
                                    </span>

                                    {p.default &&
                                        <span className="py-1 px-2 ml-2 text-sm text-white rounded-md bg-yellow-500">Default</span>
                                    }
                                </div>

                                <div className="flex items-center">
                                    <MdEdit className="text-lg text-blue-600 mr-2 cursor-pointer" onClick={() => handleOpenForm('Edit Address', p, index)} />
                                    {!p.default &&
                                        <>
                                            <MdOutlineTaskAlt onClick={() => handleUpdateAddress(index, false)} className="text-xl text-green-500 mr-2 cursor-pointer" />
                                            <MdDelete onClick={() => handleOpenDialog(index)} className="text-xl text-red-600 cursor-pointer" />
                                        </>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            }

            {openForm &&
                <div className="rounded bg-white shadow p-6 h-full">
                    <AddressCRUD title={action} setOpenForm={setOpenForm} addressObj={addressObj} resetAddressObj={resetAddressObj} />
                </div>
            }
        </div>

    )
}

export default Address;