import { prisma } from "@prisma/client"
import { useState } from "react"
import { ActionFunction, Link, LoaderFunction, Outlet, redirect, useLoaderData } from "remix"
import AddItemToBox from "~/components/AddItemToBox"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const box = await db.box.findUnique({ where: {id: params.boxId} })
    const items = await db.item.findMany({ where: {boxId: params.boxId}})
    
    return { ...box, items}
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData()
    
    console.log(Object.fromEntries(form))
    
    // grab Unpacked Items boxId // findUnique wouldn't work??? vvv
    const unassignedBox = await db.box.findMany({ where: {name: 'Unpacked Items'}})
    // need to reassign all items in the box to Unpacked Items box
    
    if (form.get('_method') === 'create') {
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

    if (form.get('_method') !== "Unpacked Items") {
        const items = await db.item.findMany({ where: {boxId: params.boxId}})
        await db.item.updateMany({
        where: {
            boxId: params.boxId || undefined
        },
        data: {
            boxId: unassignedBox[0].id
        }})

        await db.box.delete({ where: { id: params.boxId }})

        return redirect('/box')
    }

    // update to display to screen
    throw Error('Cannot delete Unpacked Items')
}


export default function BoxPage() {
    const uniqueBox = useLoaderData()
    // console.log(uniqueBox)
    const [outlet, setOutlet] = useState(false)
    return (
        <div className="flex flex-col">
            <div className="mb-4 flex justify-between">
                <div onClick={() => setOutlet(!outlet)} className="py-2 px-6 border border-slate-200 rounded hover:bg-slate-100 hover:underline transition-all ease-in-out duration-300 cursor-pointer">Add Item</div>
                {uniqueBox.name === 'Unpacked Items' ? 
                    <Link to='/box'
                    className="bg-slate-400 bg-opacity-75 text-white py-2 px-6 rounded hover:bg-slate-200 hover:text-black transition-all ease-in-out duration-300"
                    >
                        Boxes
                    </Link>
                :    
                    <form method="post">
                        <input type="hidden" name="_method" id={uniqueBox.id} value='delete'/>
                        <input type="hidden" name="_method" value={uniqueBox.name}/>
                        <button type="submit" name="_action" value="delete"
                            className="bg-slate-400 bg-opacity-75 text-white py-2 px-6 rounded hover:bg-slate-200 hover:text-black transition-all ease-in-out duration-300"
                        >
                            Delete
                        </button>
                    </form>
                }
            </div>
            
            {/* Add item Outlet display on state change */}
            {outlet ? <Outlet /> : <div></div>}
   
            <div className="border border-slate-200 rounded p-4">
                <h1 className="text-3xl font-bold">{uniqueBox.name}</h1>
                <h4 className="font-semibold">Room: <span className="font-thin">{uniqueBox.room}</span></h4>
                <h4 className="font-semibold">Size: <span className="font-thin">{uniqueBox.size}</span></h4>
                <h4 className="font-semibold mb-1">Items:</h4>
                <div className="grid grid-cols-1 gap-3">
                    {
                        uniqueBox.items.map((item) => (
                            <Link to={`/item/${item.id}`} className="border border-slate-200 rounded p-2 bg-slate-50 bg-opacity-75 hover:scale-105 hover:border-slate-400 transition-all ease-in-out duration-500">
                                <p key={item.id} className="text-center">
                                    {item.name}
                                </p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
        
    )
}