import { Link, useLocation } from "react-router-dom";
import Profile from "./Profile";
import { MdPerson, MdFavorite, MdPlace, MdManageAccounts } from "react-icons/md";
import { RiFileList2Fill } from "react-icons/ri";
import OrderHistory from "./OrderHistory";
import Address from "./Address";
import ChangePassword from "./ChangePassword";

let navigation = [
    { name: 'Profile', to: '/me/profile' },
    { name: 'Orders', to: '/me/orders' },
    { name: 'Address', to: '/me/address' },
    // { name: 'Wishlist', to: '/me/wishlist' },
    { name: "Change Password", to: '/me/security' }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const MeBody = () => {
    const location = useLocation();

    return (
        <div className="mt-28 mb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-0 lg:max-w-none">
                    <div className="lg:grid lg:grid-cols-4 lg:gap-4">
                        <div className="mb-6 lg:h-96 lg:mb-24">
                            <div className="flex flex-col bg-white rounded px-4 py-3 space-y-2 shadow" >
                                {
                                    navigation.map((p) => (
                                        <Link key={p.name} to={p.to} className={classNames(
                                            p.to === location.pathname ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-yellow-500 hover:text-white',
                                            'flex items-center px-3 py-2 rounded text-base font-medium'
                                        )}>
                                            {p.name == 'Profile' && <MdPerson className="mr-2" />}
                                            {p.name == 'Orders' && <RiFileList2Fill className="mr-2" />}
                                            {p.name == 'Address' && <MdPlace className="mr-2" />}
                                            {/* {p.name == 'Wishlist' && <MdFavorite className="mr-2" />} */}
                                            {p.name == 'Change Password' && <MdManageAccounts className="mr-2 text-lg" />}

                                            {p.name}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            {location.pathname === '/me/profile' &&
                                <Profile />
                            }

                            {location.pathname === '/me/orders' &&
                                <OrderHistory />
                            }

                            {location.pathname === '/me/address' &&
                                <Address />
                            }

                            {location.pathname === '/me/security' &&
                                <ChangePassword />
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MeBody