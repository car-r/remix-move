import { Link, LoaderFunction, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const item = await db.item.findUnique({ where: {id: params.itemId} })
    const box = await db.box.findUnique({ where: {id: item?.boxId}})
    console.log(params)
    return {...item, box}
}

export default function ItemPage() {
    const uniqueItem = useLoaderData()
    console.log(uniqueItem)
    return (
        <div>
            <h1 className="text-3xl">Item Page</h1>
            <h3 className="text-2xl">{uniqueItem.name}</h3>
            { uniqueItem.box.name ? <p>Box: {uniqueItem.box.name}</p> : <p>Box: To be packed</p> }
        </div>
    )
}