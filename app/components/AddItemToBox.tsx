import { ActionFunction, redirect } from "remix"
import { db } from "~/utils/db.server"



export default function AddItemToBox({uniqueBox}) {
    return (
        <form method="post">
            <input type="hidden" name="_method" value="addBox" />
            <div className="flex flex-col mb-4">
                <label className="mb-2">Name: </label>
                <input type="text" name="name" className="border border-slate-200 rounded px-2 py-1"/>
            </div>
            <div className="flex flex-col mb-4">
                    <label className="mb-2">Box: </label>
                    <select name="boxId" className="border border-slate-200 rounded px-2 py-1">
                            <option value={uniqueBox.id}>{uniqueBox.name}</option>
                    </select>
                </div>
            <button type="submit" className="bg-slate-200 py-2 px-6 rounded hover:bg-slate-400">Add To Box</button>
        </form>
    )
}