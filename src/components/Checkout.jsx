import {useParams} from "./App.jsx";
import Spinner from "./Spinner.jsx";
import {formatPrice} from "../helper.js";

export default function Checkout() {
    const { items, cart, setCart } = useParams()
    if (items === null) {
        return (
            <div className="h-[70vh] w-[100vw] flex items-center justify-center">
                <Spinner/>
            </div>
        )
    }

    const total = Object.keys(cart).reduce(
        (total, curr) => total + items[curr-1].price * cart[curr],
        0,
    )

    function onChange(id) {
        return (e) => {
            const inputValue = e.target.value;
            // Remove non-digit characters and allow negative integers
            if (/^-?\d*$/.test(inputValue)) {
                setCart({...cart, [id]: inputValue});
            }
        }
    }

    function onClick(id) {
        return () => {
            const {[id]: removed, ...rest} = cart
            setCart({...rest})
        }
    }

    // todo: rewrite logic when cart is empty
    // todo: link to item page when clicking on cart
    return (cart.length === 0
                ? (<div className="h-[50vh] w-[100vw] flex items-center justify-center">
                        <p className="text-center pt-4 bold text-lg"> Looking Empty... </p>
                    </div>
                ) : (
                    <div>
                        <div className="flex p-20 pb-10 pt-10">
                            <h1 className="font-bold text-5xl border border-black p-4 bg-black text-white"> Cart </h1>
                        </div>
                        <div className="flex p-20 pt-0 justify-between">
                            <div className="flex flex-col w-[45%] gap-5">
                                <div className="flex flex-col gap-3 bg-black text-white p-5 text-lg font-bold">
                                    {
                                        Object.entries(cart).map(([id, quantity]) => {
                                                return (
                                                    <div key={id} className="flex justify-between">
                                                        <div
                                                            className="truncate w-96"> {items[id - 1].title}</div>
                                                        <div> {quantity} x ${formatPrice(quantity * items[id - 1].price)}</div>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>
                                <div className="flex justify-between font-bold text-xl bg-black text-white p-5">
                                    <h1> Total: </h1>
                                    <h1> ${formatPrice(total)} </h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 w-[50%] h-[60vh] overflow-y-auto">
                                {
                                    Object.keys(cart).map(id => {
                                        id = id - 1
                                        return (
                                            <div key={id} className="flex gap-5 border border-black p-4 relative">
                                                <img src={items[id].image} alt={items[id].title}
                                                     className="w-32 justify-center border border-black p-2"/>
                                                <div className="w-full">
                                                    <h2 className="w-full text-xl font-bold"> {items[id].title} </h2>
                                                    <p className="font-light text-gray-500"> {items[id].category}</p>
                                                    <h3 className="text-lg font-bold"> ${formatPrice(items[id].price)} </h3>

                                                    <div className="flex gap-1 items-center">
                                                        <h1 className="font-bold text-lg"> Quantity: </h1>
                                                        <input
                                                            placeholder="Quantity"
                                                            value={cart[id + 1]}
                                                            onChange={onChange(id + 1)}
                                                        />
                                                    </div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     className="top-0 right-0 w-10 absolute p-2"
                                                     onClick={onClick(id + 1)}
                                                >
                                                    <title>close-thick</title>
                                                    <path
                                                        d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"/>
                                                </svg>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
    )
}
