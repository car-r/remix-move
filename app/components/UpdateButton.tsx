export default function UpdateButton() {
    return (
        <button
            type="submit" 
            name="_method" 
            value="update" 
            className="bg-indigo-500/75 text-white py-2 px-6 rounded 
            hover:bg-indigo-700/75 transition-all duration-300"
        >
            Update
        </button>
    )
}