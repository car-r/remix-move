import { json, LoaderFunction, redirect, useActionData, useLoaderData } from "remix"
import type { ActionFunction } from "remix"

import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async () => {
    const boxes = await db.box.findMany()
    return boxes
}


export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    console.log(Object.fromEntries(form))
    const name = form.get('name')
    const boxId = form.get('boxId')
    
    // FROM REMIX TUTORIAL DOCUMENTATION
    // https://remix.run/docs/en/v1/tutorials/jokes

    // if (
    //     typeof name !== 'string' ||
    //     typeof boxId !== 'string'
    // ) {
    //     // throw new Error('Form not submitted correctly.')
    //     return badRequest({
    //         formError: `Form not submitted correctly.`
    //     })
    // }

    // const fieldErrors = {
    //     name: validateItemName(name)
    // }

    // const fields = { name, boxId }

    // if (Object.values(fieldErrors).some(Boolean)) {
    //     return badRequest({ fieldErrors, fields })
    // }



    // ************************ //
    // ** WORKING VALIDATION ** //
    // ************************ //
    const errors = {
        name: '',
    }

    function checkItemName(name) {
        // null check goes first
        if(!name || name.length < 3) {
            return errors.name = `Item name too short`
        }
    }
    checkItemName(name)

    if (errors.name) {
        const values = Object.fromEntries(form)
        return { errors, values }
    }

    


    // FROM REMIX DOCUMENTATION || Error WORKING but can't submit
    // https://remix.run/docs/en/v1/api/remix#useactiondata
    // const errors = { name: ''}

    // if (typeof name !== 'string' || name.length < 3) {
    //     errors.name = `Item name too short`
    // }

    // if (Object.keys(errors).length) {
    //     return json(errors, { status: 422 })
    // }

    const fields = { name, boxId }

    const item = await db.item.create( {data: fields })
    return redirect(`/item/${item.id}`)
}

export default function NewItem() {
    const boxes = useLoaderData()
    const actionData = useActionData()
    // const errors = useActionData()
    console.log(boxes)
    return (
        <div>
            <h1 className="text-3xl">New Item</h1>
            <form method="post">
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Name: </label>
                    <input type="text" name="name" className="border border-slate-200 rounded px-2 py-1"/>
                    {actionData?.errors?.name ? (
                            <p
                                className="text-red-400"
                            >
                                {actionData.errors.name}
                            </p>
                        ) : null
                    }
                    {/* {errors?.name ? (
                        <p
                        className="text-red-400"
                    >
                        {errors.name}
                    </p>
                    ): null} */}
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