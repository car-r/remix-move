import { useActionData } from "remix"
import { action } from "~/routes/box/$boxId"


export default function EditBox({ uniqueBox }) {
    const actionData = useActionData()
    return (
        <div className="mb-4 flex p-4 rounded-md bg-white">
            <form method="post" className="w-full">
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Box Name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        defaultValue={uniqueBox.name} 
                        className="border border-slate-200 rounded px-2 py-1"
                    />
                    {actionData?.errors.name && (
                        <p className="text-red-400">{actionData.errors.name}</p>
                    ) }
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Room Name: </label>
                    <input 
                        type="text" 
                        name="room" 
                        defaultValue={uniqueBox.room} 
                        className="border border-slate-200 rounded px-2 py-1"/>
                        {actionData?.errors.room && (
                            <p className="text-red-400">{actionData.errors.room}</p>
                        ) }
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Box Size: </label>
                    <select name="size" className="border border-slate-200 rounded px-2 py-1">
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button type="submit" name="_method" value="update" className="bg-indigo-500/75 text-white py-2 px-6 rounded hover:bg-indigo-700/75 transition-all duration-300">
                        Save Box
                    </button>
                    <button type="submit" name="_method" value="delete" className="bg-red-400 text-white py-2 px-6 rounded hover:bg-red-600 transition-all duration-300">
                        Delete
                    </button>
                </div>   
            </form>
        </div>
    )
}