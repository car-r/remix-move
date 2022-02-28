import { Link, LoaderFunction, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async () => {
    const numberOfBoxes = await db.box.count()
    const numberOfItems = await db.item.count()
    const rooms = await db.box.groupBy({ by: ['room'], _count: true,  })
    let data = {numberOfBoxes, numberOfItems, rooms}
    return data
}

export type room = {
    _count: number
    room: string
}

export default function Dashboard() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            Dashboard Route
            <div className="grid grid-cols-2 gap-4 mb-24">
                <Link to='/box' className="border rounded-md bg-white p-2">
                    <p className="text-center text-7xl mb-2">{data.numberOfBoxes}</p>
                    <h2 className="text-xl text-center">Boxes</h2>
                </Link>
                <Link to='/item' className="border rounded-md bg-white p-2">
                    <p className="text-center text-7xl mb-2">{data.numberOfItems}</p>
                    <h2 className="text-xl text-center">Items</h2>
                </Link>
                {
                    data.rooms.map((room: room) => (
                        <Link to={`/room/${room.room}`}className="border rounded-md p-2 bg-white">
                            <p className="text-center text-7xl mb-2">{room._count}</p>
                            <h2 className="text-xl text-center">{room.room} boxes</h2>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}