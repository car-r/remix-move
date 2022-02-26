import { ActionFunction, Link, LoaderFunction, redirect, useLoaderData } from "remix"
import Button from "~/components/Button"
import ButtonOutlined from "~/components/ButtonOutlined"
import ItemCard from "~/components/ItemCard"
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
                    <Link to='/box'>
                        <ButtonOutlined children={"Boxes"} handleClick={null}/>
                    </Link>
                    <Link to='/item/new' >
                        <Button children={"Add Item"} handleClick={null}/>
                    </Link>
                </div>
                
                <ul className="grid grid-cols-1 gap-4">
                    {
                        data.ItemList.map((item) => (
                            <Link to={`/item/${item.id}`} className="flex">
                                <ItemCard item={item}/>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}