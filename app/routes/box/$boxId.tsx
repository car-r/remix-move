import { LoaderFunction, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const box = await db.box.findUnique({ where: {id: params.boxId} })
    const items = await db.item.findMany({ where: {boxId: params.boxId}})
    return { ...box, items}
}

export default function BoxPage() {
    const uniqueBox = useLoaderData()
    console.log(uniqueBox)
    return (
        <div className="border border-slate-200 rounded p-4">
            <h1 className="text-3xl font-bold">{uniqueBox.name}</h1>
            <h4>Room: {uniqueBox.room}</h4>
            <p>Size: {uniqueBox.size}</p>
            <div>
                {
                    uniqueBox.items.map((item) => (
                        <p key={item.id}>{item.name}</p>
                    ))
                }
            </div>
        </div>
    )
}