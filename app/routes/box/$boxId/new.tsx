// DELETE FILE AND $boxId FOLDER

import { ActionFunction, LoaderFunction, redirect, useLoaderData} from "remix"
import { useActionData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const box = await db.box.findUnique({ where: {id: params.boxId} })
    const items = await db.item.findMany({ where: {boxId: params.boxId}})
    
    return { ...box, items}
}

export const action: ActionFunction = async ({request}) => {
    const form = await request.formData()
    
    console.log(Object.fromEntries(form))

    if (form.get('_method') === 'create') {
        const name = form.get('name')
        const boxId = form.get('boxId')

        // if (
        //     typeof name !== 'string' ||
        //     typeof boxId !== 'string'
        // ) {
        //     // throw new Error('Form not submitted correctly.')
        //     return badRequest({
        //         formError: `Form not submitted correctly.`
        //     })
        // }

        const errors = {
            name: '',
            boxId: ''
        }

        function checkName(name) {
            if(!name || name.length < 3) {
                return errors.name = `Item name too short`
            }
        }
        checkName(name)

        // if (!name) {
        //     errors.name = 'Please provide an Item name'
        // }

        if (!boxId) {
            errors.boxId = 'Please select a box'
        }

        if (errors.name || errors.boxId) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        // const fieldErrors = {
        //     name: validateItemName(name)
        // }

        const fields = { name, boxId }
        
        // if(Object.values(fieldErrors).some(Boolean)) {
        //     return badRequest({ fieldErrors, fields })
        // }

        const item = await db.item.create( {data: fields })
        return redirect(`/box/${boxId}/new`)
    }
}

export default function BoxIdOutlet() {
    const box = useLoaderData()
    const actionData = useActionData()
    console.log(actionData)

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
                    {actionData?.errors.name && (
                        <p className="text-red-400">{actionData.errors.itemName}</p>
                    ) }
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