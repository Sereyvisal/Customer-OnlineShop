import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { MdClose, MdStar } from 'react-icons/md'
import serverConfig from 'utils/serverConfig'
import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md"
import { upsertCart } from 'api/cart'
import { meta } from 'utils/enum'
import { getInventoryByProductId } from 'api/inventory'
import { setCart } from 'redux/actions'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getPrice(product_items, selectedAttribute) {
  var price = 0;

  for (var p of product_items) {
    var attr_keys = Object.keys(p.attr);
    var match = true;

    for (var key of attr_keys) {
      if (selectedAttribute[key] != p.attr[key]) {
        match = false;
        break;
      }
    }

    if (match) {
      price = p.selling_price;
      break;
    }
  }
  return '$' + (price).toFixed(2);
}

const QuickViewProduct = ({ visible, product, onVisibleChange }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { userInfo } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(visible)
  const [image, setImage] = useState();
  const [currentImg, setCurrentImg] = useState('');
  const [radioSelected, setRadioSelected] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [price, setPrice] = useState('$' + (0).toFixed(2));
  const [stockQty, setStockQty] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState({ selling_price: 0, stock_qty: 0 });
  const [cartQty, setCartQty] = useState(1);
  // const [selectedColor, setSelectedColor] = useState(product.specification.colors[0])
  // const [selectedSize, setSelectedSize] = useState(product.specification.sizes[2])

  // const onClose = () => {
  //   onVisibleChange(false)
  //   setOpen(false)
  // }

  const setSelectedAttr = (parent, child) => {
    selectedAttribute.push({ [parent]: child });
    setSelectedAttribute(selectedAttribute);
    // console.log("SelectedAttr: ", selectedAttribute);
  }

  // const setSelected = (value) => {
  //   var attr = value.split(' ');
  //   selectedAttribute[attr[0]] = value;
  //   setSelectedAttribute(selectedAttribute);
  //   console.log("SelectedAttr: ", selectedAttribute);
  // }

  const setSelected = (parent, child) => {
    selectedAttribute[parent] = child;
    setSelectedAttribute({ ...selectedAttribute });
    setAttributeInfo();
  }

  const setAttributeInfo = () => {
    if (product) {
      for (var p of product.product_items) {
        var attr_keys = Object.keys(p.attr);
        var match = true;

        for (var key of attr_keys) {
          if (selectedAttribute[key] != p.attr[key]) {
            match = false;
            break;
          }
        }

        if (match) {
          // setPrice('$' + (p.selling_price).toFixed(2));
          // setStockQty(p.stock_qty);
          setSelectedProduct(p);
          setCurrentImg(serverConfig.file_url + p.image[0])
          break;
        }
      }
    }
  }

  const handleAddToCart = () => {
    if (!userInfo) {
      history.push(`/login`);
    }
    else {
      selectedProduct.cart_qty = cartQty;

      const upsertData = {
        customer: userInfo._id,
        product: selectedProduct
      }

      // console.log("upsertData: ", upsertData);

      upsertCart(upsertData).then(async res => {
        if (res.meta == meta.OK) {
          for (var p of res.data.products) {
            await getInventoryByProductId(p.product._id).then(inventory => {
              if (inventory.meta == meta.OK) {
                p.inventory_id = inventory.data._id;
                p.product.stock_qty = inventory.data.qty;
              }
              else if (inventory.meta == meta.NOTEXIST) {
                p.product.stock_qty = 0;
              }
            })
          }

          dispatch(setCart(res.data));
          // console.log(res.message);
        }
      })
    }
  };

  // const getPrice = () => {
  //   var match = true;
  //   for (var p of product.product_items) {
  //     var attr_keys = Object.keys(p.attr);

  //     for (var key of attr_keys) {
  //       if (selectedAttribute[key] != p.attr[key]) {
  //         match = false;
  //         break;
  //       }
  //     }

  //     if (match) {
  //       return p.selling_price;
  //     }
  //   }
  // }

  useEffect(() => {
    // if (visible) {
    setOpen(visible);
    // console.log("QuickviewProduct: ", product);

    if (product) {
      setCartQty(1);
      // setImage (
      //   typeof product.image === 'string' || product.image == undefined
      //     ? product.image == '' || product.image == undefined
      //       ? serverConfig.blank_product_img
      //       : serverConfig.file_url + product.image
      //     : product.image.length != 0
      //     ? serverConfig.file_url + product.image[0]
      //     : serverConfig.blank_product_img
      // );

      product.attr_type.map((parent, index) => {
        selectedAttribute[parent] = product.attr_value[index][0]
      })

      setAttributeInfo();
    }

    // }
    // else {

    // }
    //   console.log("Product: ", open, visible, product)
  }, [visible, product]);

  return (
    <Transition.Root show={open} as={Fragment}>
      {product &&
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => onVisibleChange(false)}>
          <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8 focus:outline-none"
                    onClick={() => onVisibleChange(false)}
                  >
                    <span className="sr-only">Close</span>
                    <MdClose className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                      <div className="w-full h-96">
                        <img src={currentImg} className="object-center object-cover w-full h-full" />
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-medium text-gray-900 sm:pr-12">{product.name}</h2>

                      <section aria-labelledby="information-heading" className="mt-2">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        {/* <p className="text-2xl text-yellow-500 font-medium">{getPrice(product.product_items, selectedAttribute)}</p> */}
                        <p className="text-2xl text-yellow-500 font-medium">
                          ${(selectedProduct.selling_price).toFixed(2)}
                        </p>

                        <p className="text-lg pt-2">
                          Stock:
                          {(selectedProduct.stock_qty > 0) && <span className="ml-2">{selectedProduct.stock_qty}</span>}
                          {(selectedProduct.stock_qty <= 0) && <span className="ml-2 text-red-600">Out of stock</span>}
                        </p>

                        {/* Reviews */}
                        {/* <div className="mt-6">
                        <h4 className="sr-only">Reviews</h4>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <MdStar
                                key={rating}
                                className={classNames(
                                  product.rating > rating ? 'text-yellow-600' : 'text-gray-200',
                                  'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">{product.rating} out of 5 stars</p>
                          <a href="#" className="ml-3 text-sm font-medium text-yellow-500 hover:text-yellow-500">
                            {product.reviewCount} Reviews
                          </a>
                        </div>
                      </div> */}
                      </section>

                      <section aria-labelledby="options-heading" className="mt-0">
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form>
                          {/* Attributes */}


                          {/* Sizes */}
                          {/* { product.attr_type.length > 0 &&
                          product.attr_type.map((parent, index) => (
                          <div className="mt-10" >
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm text-gray-900 font-medium">{parent}</h4>
                            </div>
                              {selectedAttribute[index]}
                            <RadioGroup key={index} value={selectedAttribute[index] ? selectedAttribute[index] : product.attr_value[index][0]} onChange={setSelected} className="mt-4"> 
                              <RadioGroup.Label className="sr-only">Choose a {parent}</RadioGroup.Label>
                              <div className="grid grid-cols-4 gap-4">
                                {product.attr_value[index].map((child, i) => (
                                  <RadioGroup.Option
                                    key={i}
                                    value={index+" "+child}
                                    disabled={product.product_items[index].stock_qty == 0}
                                    className={({ active }) =>
                                      classNames(
                                        product.product_items[index].stock_qty > 0
                                          ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                          : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                        active ? 'ring-2 ring-yellow-500' : '',
                                        'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                      )
                                    }
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <RadioGroup.Label as="p">{child}</RadioGroup.Label>
                                        {product.product_items[index].stock_qty > 0 ? (
                                          <div
                                            className={classNames(
                                              active ? 'border' : 'border-2',
                                              checked ? 'border-yellow-500' : 'border-transparent',
                                              'absolute -inset-px rounded-md pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <div
                                            aria-hidden="true"
                                            className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                          >
                                            <svg
                                              className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                              viewBox="0 0 100 100"
                                              preserveAspectRatio="none"
                                              stroke="currentColor"
                                            >
                                              <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                          ))
                        } */}

                          {product.attr_type.length > 0 && product.attr_type.map((parent, index) => (
                            <div className="mt-4" key={index}>
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm text-gray-900 font-medium">{parent}</h4>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                {
                                  product.attr_value[index].map((child, i) => (
                                    <div
                                      key={i}
                                      onClick={() => setSelected(parent, child)}
                                      className={
                                        classNames(
                                          product.product_items[index].stock_qty > 0
                                            ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                            : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                          child === selectedAttribute[parent] && product.product_items[index].stock_qty > 0 ? 'ring-2 ring-yellow-500' : '',
                                          'group relative border rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                        )
                                      }
                                    >
                                      {/* <label htmlFor={child}> */}
                                      {/* <input 
                                      type="radio" 
                                      name={parent} 
                                      value={child}
                                      // onChange={() => setSelected(parent, child)}
                                      // checked={child == selectedAttribute[parent]}
                                      disabled={product.product_items[index].stock_qty === 0}
                                      className="invisible"
                                    /> */}
                                      <span>{child}</span>
                                      {/* </label> */}
                                    </div>
                                  ))
                                }
                              </div>



                              {/* <RadioGroup key={index} value={selectedAttribute[index] ? selectedAttribute[index] : product.attr_value[index][0]} onChange={setSelected} className="mt-4"> 
                              <RadioGroup.Label className="sr-only">Choose a {parent}</RadioGroup.Label>
                              <div className="grid grid-cols-4 gap-4">
                                {product.attr_value[index].map((child, i) => (
                                  <RadioGroup.Option
                                    key={i}
                                    value={index+" "+child}
                                    disabled={product.product_items[index].stock_qty == 0}
                                    className={({ active }) =>
                                      classNames(
                                        product.product_items[index].stock_qty > 0
                                          ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                          : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                        active ? 'ring-2 ring-yellow-500' : '',
                                        'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                      )
                                    }
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <RadioGroup.Label as="p">{child}</RadioGroup.Label>
                                        {product.product_items[index].stock_qty > 0 ? (
                                          <div
                                            className={classNames(
                                              active ? 'border' : 'border-2',
                                              checked ? 'border-yellow-500' : 'border-transparent',
                                              'absolute -inset-px rounded-md pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <div
                                            aria-hidden="true"
                                            className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                          >
                                            <svg
                                              className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                              viewBox="0 0 100 100"
                                              preserveAspectRatio="none"
                                              stroke="currentColor"
                                            >
                                              <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup> */}
                            </div>
                          ))
                          }

                          <div className="flex mt-6">
                            <span className="flex items-center mr-4 text-base font-medium">Quantity: </span>

                            <div className="flex flex-row h-10 w-32 rounded-lg relative border border-yellow-500 shadow-sm mt-1 px-2">
                              <button
                                className=" text-gray-600 hover:text-gray-700 h-full w-20 rounded-l cursor-pointer outline-none"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCartQty(value => (value <= 1) ? value : value - 1)
                                }
                                }
                              >
                                <span className="m-auto text-2xl text-yellow-500">−</span>
                              </button>

                              <div className="flex items-center justify-center text-center w-full">
                                <p className="px-2 text-base font-medium">{cartQty}</p>
                              </div>

                              <button
                                className="text-gray-600 hover:text-gray-700 h-full w-20 rounded-r cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCartQty(value => (value >= selectedProduct.stock_qty) ? value : value + 1)
                                }
                                }
                              >
                                <span className="m-auto text-2xl text-yellow-500">+</span>
                              </button>
                            </div>
                          </div>

                          <div
                            onClick={handleAddToCart}
                            className={classNames((selectedProduct.stock_qty <= 0) ? "pointer-events-none bg-gray-50 text-gray-200 cursor-not-allowed" : "cursor-pointer text-white hover:bg-yellow-500 hover:bg-opacity-95 bg-yellow-500 border-transparent" , 
                              "mt-8 w-full border rounded-md py-2 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 uppercase"
                            )}
                          >
                            <MdAddShoppingCart className="text-lg mr-2" />{t('add_cart')}
                          </div>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>

          </div>
        </Dialog>
      }
    </Transition.Root>

  )
}

export default QuickViewProduct