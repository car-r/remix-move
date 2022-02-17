import { ActionFunction, Link, LoaderFunction, redirect, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const item = await db.item.findUnique({ where: {id: params.itemId} })
    const box = await db.box.findUnique({ where: {id: item?.boxId}})
    // console.log(params)
    return {...item, box}
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData()

    await db.item.delete({ where: {id: params.itemId}})
    return redirect('/item')
}


export default function ItemPage() {
    const uniqueItem = useLoaderData()
    // console.log(uniqueItem)
    return (
        <div className="mt-10 flex flex-col">
            <div className="flex justify-between">
                <Link to='/item' 
                    className="py-2 px-6 border border-slate-200 rounded hover:bg-slate-100 hover:underline transition-all ease-in-out duration-300"
                >
                    Items
                </Link>
                <form method="post">
                    <input type="hidden" name="id" id={uniqueItem.id} />
                    
                    <button type="submit" name="_action" value="delete"
                        className="bg-slate-400 bg-opacity-75 text-white py-2 px-6 rounded hover:bg-slate-200 hover:text-black transition-all ease-in-out duration-300"
                    >
                        Delete
                    </button>
                </form>
            </div>
            <div className="border border-slate-200 rounded p-4">
                <h1 className="text-2xl">{uniqueItem.name}</h1>
                { uniqueItem.box.name ? <p>Box: {uniqueItem.box.name}</p> : <p>Unpacked</p> }
                <p>Created: {uniqueItem.createdAt}</p>
            </div>
            
        </div>
        
    )
}