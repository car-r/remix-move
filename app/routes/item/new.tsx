import { json, LoaderFunction, redirect, useActionData, useLoaderData } from "remix"
import type { ActionFunction } from "remix"

import { db } from "~/utils/db.server"
import AddItem from "~/components/AddItem"

// type LoaderData = {
//     BoxList: Array<{ id: string; name: string; }>
// }

// export const loader: LoaderFunction = async () => {
//     const boxes: LoaderData = {
//         BoxList: await db.box.findMany()
//     }
//     return boxes
// }

export const loader: LoaderFunction = async () => {
    const boxes = await db.box.findMany()
    return boxes
}

// export type Boxes = {
//     box: Box[];
// }

// export type Box = {
//     name: string;
//     id: string;
// }

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    console.log(Object.fromEntries(form))
    const name = form.get('name')
    const boxId = form.get('boxId')
    

    // ************************ //
    // ** WORKING VALIDATION ** //
    // ************************ //
    const errors = {
        name: '',
    }

    function checkItemName(name: string | any) {
        // null check goes first
        // add regex checks
        if(!name || name.length < 3) {
            return errors.name = `Item name too short`
        }
    }
    checkItemName(name)

    if (errors.name) {
        const values = Object.fromEntries(form)
        return { errors, values }
    }

    const fields = { name, boxId }

    const item = await db.item.create( {data: fields })
    return redirect(`/item/${item.id}`)
}

export default function NewItem() {
    const boxes = useLoaderData()
    const actionData = useActionData()
    // const errors = useActionData()
    console.log('new page ' + boxes)
    return ( 
        <div>
            <h1 className="text-3xl mb-4">New Item</h1>
            <AddItem boxes={boxes} /> 
        </div>
    ) 
}