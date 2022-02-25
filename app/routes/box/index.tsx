import { Link, Outlet, useLoaderData } from "remix"
import type { LinksFunction, LoaderFunction } from "remix"
import { db } from "~/utils/db.server"
import BoxCard from "~/components/BoxCard"

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
    
    const withoutUnpackedItems = data.BoxListItems.filter(box => box.name !== 'Unpacked Items')
    const unpackedItemsBox = data.BoxListItems.filter(box => box.name === 'Unpacked Items')

    console.log(withoutUnpackedItems, unpackedItemsBox)
    return (
        <div className="flex flex-col">
            <h1 className="text-4xl mb-2">Boxes</h1>
            <div className="flex mb-2 justify-between">
                <Link to='/dashboard'
                    className="py-2 px-6 border border-slate-200 rounded hover:bg-slate-100 hover:underline transition-all ease-in-out duration-300">
                    Dashboard
                </Link>
                <Link to='new'
                    className="bg-slate-400 bg-opacity-75 text-white py-2 px-6 rounded hover:bg-slate-200 hover:text-black transition-all ease-in-out duration-300">
                    Add Box
                </Link>
            </div>
            
            <ul className="grid grid-cols-1 gap-4 mb-24">
                {
                    withoutUnpackedItems.map((box) => (
                        <Link to={`/box/${box.id}`}>
                            <BoxCard box={box}/>
                        </Link> 
                    ))
                    
                }
                {
                    unpackedItemsBox.map((box) => (
                        <Link to={`/box/${box.id}`}>
                            <BoxCard box={box}/>
                        </Link> 
                    ))
                }
            </ul>
        </div>
    
    )
}