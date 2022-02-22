import {  useActionData } from "remix"

export default function EditItemComponent({ uniqueItem }) {
    const currentBox = uniqueItem.boxes.filter(box => box.id === uniqueItem.boxId)
    const alternateBoxes = uniqueItem.boxes.filter(box => box.id !== uniqueItem.boxId)
    const actionData = useActionData()
    console.log(uniqueItem)
    return (
        <div className="flex flex-col mb-4 border border-slate-200 p-4 rounded">
            <form method="post" className="w-full">
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Name: </label>
                    <input type="text" name="name" defaultValue={uniqueItem.name} className="border border-slate-200 rounded px-2 py-1"/>
                    {actionData?.errors.name && (
                        <p className="text-red-400">{actionData.errors.name}</p>
                    ) }
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Box: </label>
                    <select name="boxId" className="border border-slate-200 rounded px-2 py-1">
                        {/* Return first option as the current box, then the alternate boxes */}
                        {currentBox.map((box) => (
                            <option value={box.id}>{box.name}</option>
                        ))}
                        {alternateBoxes.map((box) => (
                            <option value={box.id}>{box.name}</option>
                        ))}

                    </select>
                </div>
                <div className="flex justify-between">
                    <button type="submit" name="_method" value="update" className="bg-blue-500/75 text-white py-2 px-6 rounded hover:bg-blue-700/75 transition-all duration-300">
                        Update Item
                    </button>
                    <button type="submit" name="_method" value="delete" className="bg-red-400 text-white py-2 px-6 rounded hover:bg-red-600 transition-all duration-300">
                        Delete
                    </button>
                </div>  
            </form>
        </div>
    )
}