import { Link, Outlet, useLoaderData } from "remix"
import type { LinksFunction, LoaderFunction } from "remix"
import { db } from "~/utils/db.server"

type LoaderData = {
    BoxListItems: Array<{ id: string; room: string; size: string; name: string;}>
}

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        BoxListItems: await db.box.findMany()
    }
    return data
}



export default function Boxes() {
    const data = useLoaderData<LoaderData>()
    console.log(data)

    return (
        <div className="flex flex-col">
            <h1 className="text-4xl mb-2">Boxes</h1>
            <div className="flex mb-2">
                <Link to='new'
                    className="bg-slate-200 py-2 px-6 rounded hover:bg-slate-400">
                    Add Box
                </Link>
            </div>
            
            <ul className="grid grid-cols-1 gap-4">
                {
                    data.BoxListItems.map((box) => (
                        <Link to={`/box/${box.id}`}>
                            <div className="flex flex-col border border-slate-400 rounded p-4">
                                <h3 className="text-3xl font-bold">{box.name}</h3>
                                <h4 className="text-xl">{box.room}</h4>
                                <p className="font-thin">{box.size}</p>
                            </div>
                        </Link>
                    ))
                }
            </ul>
        </div>
    
    )
}