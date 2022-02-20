import { useState } from "react"
import { ActionFunction, Link, LoaderFunction, Outlet, redirect, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const item = await db.item.findUnique({ where: {id: params.itemId} })
    const box = await db.box.findUnique({ where: {id: item?.boxId}})
    // console.log(params)
    return {...item, box}
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData()
    if (form.get('_method') === 'delete') {
        await db.item.delete({ where: {id: params.itemId}})
        return redirect('/item')
    }
    if (form.get('_method') === 'update') {
        const name = form.get('name')
        const boxId = form.get('boxId')
        const fields = { name, boxId }
        if (
            typeof name !== 'string' ||
            typeof boxId !== 'string'
        ) {
            throw new Error('Form not submitted correctly.')
        }
        await db.item.update({where: {id: params.itemId}, data: fields })
        return redirect(`/box/${boxId}`)
    }
    
}


export default function ItemPage() {
    const uniqueItem = useLoaderData()
    const [updateItem, setUpdateItem] = useState(false)
    // console.log(uniqueItem)
    return (
        <div className="mt-10 flex flex-col">
            <div className="flex justify-between mb-4">
                <Link to='/item' 
                    className="py-2 px-6 border border-slate-200 rounded hover:bg-slate-100 hover:underline transition-all ease-in-out duration-300"
                >
                    Items
                </Link>
                <div 
                    className="bg-slate-400 bg-opacity-75 text-white py-2 px-6 rounded hover:bg-slate-200 hover:text-black transition-all ease-in-out duration-300"
                    onClick={() => setUpdateItem(!updateItem)}
                >    
                    Edit Item
                </div>
            </div>
            {updateItem ? <Outlet /> : <div></div>}
            
            <div className="border border-slate-200 rounded p-4 mb-4">
                <h1 className="text-2xl">{uniqueItem.name}</h1>
                { uniqueItem.box.name ? <p>Box: {uniqueItem.box.name}</p> : <p>Unpacked</p> }
                <p>Created: {uniqueItem.createdAt}</p>
            </div>
            {updateItem ? 
                <form method="post">
                    <input type="hidden" name="id" id={uniqueItem.id} />
                    
                    <button type="submit" name="_method" value="delete"
                        className="bg-slate-400 bg-opacity-75 text-white py-2 px-6 rounded hover:bg-slate-200 hover:text-black transition-all ease-in-out duration-300"
                    >
                        Delete
                    </button>
                </form>
                :
                <div></div>
            }
            
        </div>
        
    )
}