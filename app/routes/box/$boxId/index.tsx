import { ActionFunction, LoaderFunction, redirect, useActionData, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const box = await db.box.findUnique({ where: {id: params.boxId} })
    const items = await db.item.findMany({ where: {boxId: params.boxId}})
    
    return { ...box, items}
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
    return redirect(`/box/${boxId}`)
    
}

export default function BoxIdOutlet() {
    const box = useLoaderData()
    
    return (
        <div className="flex border border-slate-200 p-4 rounded mb-4">
            
            <form method="post">
                <div className="flex flex-col mb-4">
                    <label className="mb-2" >Name: </label>
                    <input type="text" name="name" placeholder="Enter Item Name" className="border border-slate-200 rounded px-2 py-1"/>
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Box: </label>
                    <select name="boxId" className="border border-slate-200 rounded px-2 py-1">
                            <option value={box.id}>{box.name}</option>
                    </select>
                </div>
                <button type="submit" name="_method" value="create" className="bg-slate-400 border border-slate-400/75 bg-opacity-75 text-white py-2 px-6 rounded hover:bg-slate-200 hover:text-black hover:border hover:border-slate-400 transition-all ease-in-out duration-300">
                    Add Item
                </button>
            </form>
        </div>
    )
}