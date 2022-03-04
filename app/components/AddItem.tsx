import { useActionData } from "remix"

export type Box = {
    name: string;
    id: string;
}

export type Boxes = {
    boxes: Box[]
}

export default function AddItem({boxes}: Boxes) {
    const actionData = useActionData()
    console.log('boxes ->' + boxes)
    return (
        <div>
            <div className="mb-4 flex p-4 rounded-md bg-white">
                <form method="post" className="w-full">
                    <input type="hidden" name="_method" value="addBox" />
                    <div className="flex flex-col mb-4">
                        <label className="mb-2">Name: </label>
                        <input type="text" name="name" className="border border-slate-200 rounded px-2 py-1"/>
                        {actionData?.errors.name && (
                            <p className="text-red-400">{actionData.errors.name}</p>
                        )}
                    </div>
                    <div className="flex flex-col mb-4">
                            <label className="mb-2">Box: </label>
                            <select name="boxId" className="border border-slate-200 rounded px-2 py-1">
                                {boxes.map((box) => (
                                    <option key={box.id} value={box.id}>{box.name}</option>
                                ))}
                            </select>
                        </div>
                    <button type="submit" name="_method" value="create" className="bg-indigo-500/75 text-white py-2 px-6 rounded hover:bg-indigo-700/75 transition-all duration-300">Add To Box</button>
                </form>
            </div>
        </div>
        
        
    )
}