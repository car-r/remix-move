import { ActionFunction, Link, LoaderFunction, redirect, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

type LoaderData = {
    ItemList: Array<{ id: string; name: string; box?: string; }>
}

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        ItemList: await db.item.findMany()
    }
    return data
}


export default function Items() {
    const data = useLoaderData<LoaderData>()
    console.log(data)
    return (
        <div>
            <h1 className="text-3xl">Items</h1>
            <div className="flex flex-col">
                <div className="flex justify-between mb-4">
                    <Link to='/box' className="py-2 px-6 border border-slate-200 rounded hover:bg-slate-100 hover:underline transition-all ease-in-out duration-300">Boxes</Link>
                    <Link to='/item/new' className="bg-slate-400 bg-opacity-75 text-white py-2 px-6 rounded hover:bg-slate-200 hover:text-black transition-all ease-in-out duration-300">Add Item</Link>
                </div>
                
                <ul className="grid grid-cols-1 gap-4">
                    {
                        data.ItemList.map((item) => (
                            <Link to={`/item/${item.id}`} className="flex">
                                <div className="flex border justify-between w-full border-slate-400 rounded p-4">
                                    <h3 className="text-2xl font-bold">{item.name}</h3>
                                </div>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}