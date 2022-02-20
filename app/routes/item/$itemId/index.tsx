import { LoaderFunction, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const item = await db.item.findUnique({ where: {id: params.itemId} })
    const boxes = await db.box.findMany()
    
    return {...item, boxes}
}

export default function EditItem() {
    const item = useLoaderData()
    const currentBox = item.boxes.filter(box => box.id === item.boxId)
    const alternateBoxes = item.boxes.filter(box => box.id !== item.boxId)
    console.log(item)
    return (
        <div className="flex flex-col mb-4">
            <form method="post">
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Name: </label>
                    <input type="text" name="name" defaultValue={item.name} className="border border-slate-200 rounded px-2 py-1"/>
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
                <button 
                    type="submit" 
                    name="_method" 
                    value="update" 
                    className="bg-slate-400 bg-opacity-75 text-white py-2 px-6 rounded hover:bg-slate-200 hover:text-black transition-all ease-in-out duration-300"
                >
                    Update Item
                </button>
            </form>
        </div>
    )
}