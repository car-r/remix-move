import { LoaderFunction, redirect, useLoaderData } from "remix"
import type { ActionFunction } from "remix"

import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async () => {
    const boxes = await db.box.findMany()
    return boxes
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const name = form.get('name')
    const boxId = form.get('boxId')
    

    if (
        typeof name !== 'string' ||
        typeof boxId !== 'string'
    ) {
        throw new Error('Form not submitted correctly.')
    }

    const fields = { name, boxId }
    const item = await db.item.create( {data: fields })
    return redirect(`/item/${item.id}`)
}

export default function NewItem() {
    const boxes = useLoaderData()
    console.log(boxes)
    return (
        <div>
            <h1 className="text-3xl">New Item</h1>
            <form method="post">
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Name: </label>
                    <input type="text" name="name" className="border border-slate-200 rounded px-2 py-1"/>
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Box: </label>
                    <select name="boxId" className="border border-slate-200 rounded px-2 py-1">
                        {/* TO DO - Don't assign a box to an item - Assign as Unpacked as workaround? */}
                        {boxes.map((box) => (
                            <option value={box.id}>{box.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-slate-200 py-2 px-6 rounded hover:bg-slate-400">
                    Add Item
                </button>
            </form>
        </div>
    ) 
}