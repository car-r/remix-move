import { LoaderFunction, useLoaderData } from "remix";
import ItemInBoxCard from "~/components/ItemInBoxCard";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params }) => {
    const item = await db.item.findUnique({ where: {id: params.itemId} })
    
    return item
}

export default function ItemInBox() {
    const uniqueItem = useLoaderData()
    return (
        <ItemInBoxCard item={uniqueItem}/>
    )
}