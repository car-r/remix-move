import { Link, Outlet, useLoaderData } from "remix"
import type { LinksFunction, LoaderFunction } from "remix"
import { db } from "~/utils/db.server"
import BoxCard from "~/components/BoxCard"
import Button from "~/components/Button"
import ButtonOutlined from "~/components/ButtonOutlined"

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
            <div className="flex mb-4 justify-between">
                <Link to='/dashboard'>
                    <ButtonOutlined children={"Dashboard"} handleClick={null}/>
                </Link>
                <Link to='new'>
                    <Button children={"Add Box"} handleClick={null}/>
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