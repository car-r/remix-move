import { prisma } from "@prisma/client"
import { ActionFunction, Link, LoaderFunction, redirect, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const box = await db.box.findUnique({ where: {id: params.boxId} })
    const items = await db.item.findMany({ where: {boxId: params.boxId}})
    
    
    return { ...box, items}
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData()

    // grab Unpacked Items boxId 
    const unassignedBox = await db.box.findMany({ where: {name: 'Unpacked Items'}})
    // need to reassign all items in the box to another box
    const items = await db.item.findMany({ where: {boxId: params.boxId}})
    await db.item.updateMany({
        where: {
            boxId: params.boxId || undefined
        },
        data: {
            boxId: unassignedBox[0].id
        }
    })

    await db.box.delete({ where: { id: params.boxId }})

    return redirect('/box')
}

export default function BoxPage() {
    const uniqueBox = useLoaderData()
    // console.log(uniqueBox)
    return (
        <div className="flex flex-col">
            <div className="mb-4 flex justify-between">
                <Link to='/box' className="hover:underline">Go Back</Link>
                <form method="post">
                    <input type="hidden" name="id" id={uniqueBox.id} />
                    
                    <button type="submit" name="_action" value="delete"
                        className="bg-slate-400 bg-opacity-75 text-white py-2 px-6 rounded hover:bg-slate-200 hover:text-black transition-all ease-in-out duration-300"
                    >
                        Delete
                    </button>
                </form>
            </div>
            <div className="border border-slate-200 rounded p-4">
                <h1 className="text-3xl font-bold">{uniqueBox.name}</h1>
                <h4 className="font-semibold">Room: <span className="font-thin">{uniqueBox.room}</span></h4>
                <h4 className="font-semibold">Size: <span className="font-thin">{uniqueBox.size}</span></h4>
                <h4 className="font-semibold mb-1">Items:</h4>
                <div className="grid grid-cols-1 gap-3">
                    {
                        uniqueBox.items.map((item) => (
                            <Link to={`/item/${item.id}`} className="border border-slate-200 rounded p-2 bg-slate-50 bg-opacity-75">
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