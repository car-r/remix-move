import { Link, LoaderFunction, useLoaderData } from "remix"
import BoxCard from "~/components/BoxCard"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({params}) => {
    const roomName = await db.box.findMany({where: {room: params.room}})
    console.log(params)
    return roomName
}

export default function Room() {
    const room = useLoaderData()
    console.log(room)
    return (
        <div>
            Room
            <div className="grid grid-cols-1 gap-4 mb-24">
                {
                    room.map((box) => (
                        <Link to={`/box/${box.id}`}>
                            <BoxCard box={box}/>
                        </Link> 
                    ))
                }
            </div>
        </div>
    )
}