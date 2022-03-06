import { Link, LoaderFunction, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async () => {
    const rooms = await db.box.groupBy({ by: ['room'], _count: true,  })
    return rooms
}

export default function RoomHome() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <h1 className="text-3xl mb-4">Rooms</h1>
            <ul className="grid grid-cols-1 gap-4 mb-24">
                {data.map((room) => (
                    <Link to={`/room/${room.room}`} className=" border border-white rounded-md p-4 bg-white hover:border-indigo-500">
                        <h3 className="text-2xl font-bold">{room.room}</h3>
                    </Link>
                ))}
            </ul>
        </div>
    )
}