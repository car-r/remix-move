import { redirect } from "remix"
import type { ActionFunction } from "remix"

import { db } from "~/utils/db.server"

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const name = form.get('name')
    const room = form.get('room')
    const size = form.get('size')

    if (
        typeof name !== 'string' ||
        typeof room !== 'string' ||
        typeof size !== 'string'
    ) {
        throw new Error('Form not submitted correctly.')
    }

    const fields = { name, room, size }
    const box = await db.box.create( {data: fields})
    return redirect(`/box/${box.id}`)
}

export default function NewBox() {
    return (
        <div>
            <h1 className="text-3xl">New Box</h1>
            <form method="post">
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Name: </label>
                    <input type="text" name="name" className="border border-slate-200 rounded px-2 py-1"/>
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Room: </label>
                    <input type="text" name="room" className="border border-slate-200 rounded px-2 py-1"/>
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Size: </label>
                    <select name="size" className="border border-slate-200 rounded px-2 py-1">
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
                <button type="submit" className="bg-slate-200 py-2 px-6 rounded hover:bg-slate-400">
                    Add Box
                </button>
            </form>
        </div>
    ) 
}