export default function ButtonOutlined({children, handleClick}) {
    return (
        <div 
            className="py-2 px-6 border-2 border-indigo-400 rounded 
            hover:bg-indigo-400 hover:text-white transition-all ease-in-out duration-300 cursor-pointer"
            onClick={handleClick}
        >
            {children}
        </div>
    )
}