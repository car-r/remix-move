export default function DeleteButton() {
    return (
        <button 
            type="submit" 
            name="_method" 
            value="delete" 
            className="bg-red-400 text-white py-2 px-6 rounded 
            hover:bg-red-600 transition-all duration-300"
        >
            Delete
        </button>
    )
}