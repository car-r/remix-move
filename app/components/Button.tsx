
export type Children = {
    children: string;
}

export default function Button({children}: Children) {
    return (
        <div 
            className="font-bold bg-indigo-500 border-2 border-indigo-400 bg-opacity-75 text-white py-2 px-6 rounded 
            hover:bg-neutral-200  hover:text-black hover:border-indigo-400 transition-all ease-in-out duration-300 cursor-pointer"
            
        >
            {children}
        </div>
    )
}