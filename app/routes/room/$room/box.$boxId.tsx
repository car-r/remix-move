import { Link, LoaderFunction, useLoaderData } from "remix"
import ItemCard from "~/components/ItemCard"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({params}) => {
    const box = await db.box.findUnique({ where: {id: params.boxId} })
    const items = await db.item.findMany({ where: {boxId: params.boxId}})
    return {...box, items}
}

export default function BoxInRoom() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div className="grid grid-cols-1 gap-4">
            {data.items.map((item: any) => (
                <Link to={`/item/${item.id}`}>
                    <ItemCard item={item}/>
                </Link>
            ))}
        </div>
    )
}