import { LoaderFunction, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const box = await db.box.findUnique({ where: {id: params.boxId} })
    return box
}

export default function BoxPage() {
    const uniqueBox = useLoaderData()
    console.log(uniqueBox)
    return (
        <div>
            {uniqueBox.id}
        </div>
    )
}