import { Link, LoaderFunction, useLoaderData } from "remix"
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
            <div>
                <ul className="grid grid-cols-1 gap-4">
                    {
                        data.ItemList.map((item) => (
                            <Link to={`/item/${item.id}`}>
                                <div className="flex flex-col border border-slate-400 rounded p-4">
                                    <h3 className="text-2xl font-bold">{item.name}</h3>
                                    <p className="font-thin">{item.box}</p>
                                </div>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}