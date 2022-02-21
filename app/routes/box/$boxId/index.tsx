import { LoaderFunction, useLoaderData} from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const box = await db.box.findUnique({ where: {id: params.boxId} })
    const items = await db.item.findMany({ where: {boxId: params.boxId}})
    
    return { ...box, items}
}

export default function BoxIdOutlet() {
    const box = useLoaderData()

    return (
        <div className="flex border border-slate-200 p-4 rounded mb-4">
            <form method="post">
                <div className="flex flex-col mb-4">
                    <label className="mb-2" >Name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Enter Item Name" 
                        className="border border-slate-200 rounded px-2 py-1"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Box: </label>
                    <select name="boxId" className="border border-slate-200 rounded px-2 py-1">
                            <option value={box.id}>{box.name}</option>
                    </select>
                </div>
                <button type="submit" name="_method" value="create" className="bg-blue-500/75 text-white py-2 px-6 rounded hover:bg-blue-700/75 transition-all duration-300">
                    Add Item
                </button>
            </form>
        </div>
    )
}