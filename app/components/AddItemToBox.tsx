import { ActionFunction, redirect, useActionData } from "remix"
import { db } from "~/utils/db.server"

export type UniqueBox = {
    name: string;
    size: string;
    room: string;
    id: string;
    updatedAt: string;
}

export type Box = {
    uniqueBox: UniqueBox;
}

export default function AddItemToBox({uniqueBox}: Box) {
    const actionData = useActionData()
    return (
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
                                <option value={uniqueBox.id}>{uniqueBox.name}</option>
                        </select>
                    </div>
                <button type="submit" name="_method" value="create" className="bg-indigo-500/75 text-white py-2 px-6 rounded hover:bg-indigo-700/75 transition-all duration-300">Add To Box</button>
            </form>
        </div>
    )
}