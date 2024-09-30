import {useParams} from "./App.jsx";
import {useState} from "react";
import Spinner from "./Spinner.jsx";

export default function Checkout() {
    // todo: refactor cart to object iwth quantities so quantities is not lost when switching pages
    const { items, cart, setCart } = useParams()
    const [ quantity, setQuantity ] = useState({})

    // todo: rewrite logic when cart is empty
    return (
        items === null
            ? (<div className="h-[70vh] w-[100vw] flex items-center justify-center">
                    <Spinner/>
                </div>
            )
            : cart.length === 0
                ? (<div className="h-[50vh] w-[100vw] flex items-center justify-center">
                        <p className="text-center pt-4 bold text-lg"> Looking Empty... </p>
                    </div>
                ) : (
                    <div>
                        <div className="flex p-10">
                            <h1 className="font-bold text-5xl border border-black p-4 bg-black text-white"> Cart </h1>
                        </div>
                        <div className="flex p-10">
                            <div className="flex flex-col gap-5 w-[70%]">
                                {
                                    // cart.map(id => {
                                    //     id = id - 1
                                    //     return (
                                    //         <div key={id} className="flex gap-10">
                                    //             <img src={items[id].image} alt={items[id].title} className="w-32 justify-center"/>
                                    //             <div>
                                    //                 <h2> {items[id].title} </h2>
                                    //                 <p> {items[id].category}</p>
                                    //                 <h3> {items[id].price} </h3>
                                    //
                                    //                 <div className="flex">
                                    //                     {/* lock input between 0 and infinity*/}
                                    //                     <input
                                    //                         placeholder="Quantity"
                                    //                     />
                                    //                     {/*<Remove onClick={removeOnClick}/>*/}
                                    //                 </div>
                                    //             </div>
                                    //
                                    //         </div>
                                    //     )
                                    // })
                                }
                            </div>
                            <div className="flex flex-col">
                                {/*    prices and checkout*/}
                            </div>
                        </div>
                    </div>
                )
    )
}
