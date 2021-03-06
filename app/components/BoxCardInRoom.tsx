import { Link } from "remix"
import ButtonOutlined from "./ButtonOutlined"

export type BoxProps = {
    name: string;
    size: string;
    room: string;
    id: string;
}

export type Box = {
    box: BoxProps;
}

export default function BoxCardInRoom({box}: Box) {
    return (
        <button className="flex items-center w-full bg-white border border-white rounded-md py-4 px-1  hover:border-indigo-500  focus:outline-none focus:ring focus:ring-indigo-300 cursor-auto">
            <div className="flex flex-col w-full">
                <div className="flex mb-6">
                    <div className="flex w-20 mr-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`mx-auto ${box.size === 'Large' ? 'h-18 w-18' : box.size === 'Medium' ? 'h-14 w-14' : 'h-10 w-10'}`} fill="none" viewBox="0 0 24 24" stroke="currentcolor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={`${box.size === 'Large' ? '1' : box.size === 'Medium' ? '1' : '1'}`} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div className="text-left">
                        <h3 className="text-2xl tracking-wide font-extrabold pb-1 ">{box.name}</h3>
                        <h4 className="font-semibold">Room: <span className="font-thin">{box.room}</span></h4>
                        <h4 className="font-semibold">Size: <span className="font-thin">{box.size}</span></h4>
                    </div>  
                </div> 
                <div className="flex justify-between px-4">
                    <Link to={`/box/${box.id}`}>
                        <button className="border-2 border-indigo-400 px-4 rounded-md py-1 hover:bg-indigo-400 hover:text-white transition-all ease-in-out duration-300 cursor-pointer font-semibold">Go to box</button>
                    </Link>
                </div>
            </div>
        </button>
    )
}