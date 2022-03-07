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
        <div className="lg:col-span-3">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 pb-2 border border-b-neutral-300">Dashboard</h1>
            <div className="grid grid-cols-2 gap-4 mb-24">
                <Link to='/box' className="border border-white hover:border-indigo-500 rounded-md bg-white p-2">
                    <p className="text-center text-7xl mb-2">{data.numberOfBoxes}</p>
                    <h2 className="text-xl text-center">Boxes</h2>
                </Link>
                <Link to='/item' className="border border-white hover:border-indigo-500 rounded-md bg-white p-2">
                    <p className="text-center text-7xl mb-2">{data.numberOfItems}</p>
                    <h2 className="text-xl text-center">Items</h2>
                </Link>
                {
                    data.rooms.map((room: room) => (
                        <Link to={`/room/${room.room}`} className="border border-white hover:border-indigo-500 rounded-md p-2 bg-white">
                            <p className="text-center text-7xl mb-2">{room._count}</p>
                            <h2 className="text-xl text-center">{room.room} boxes</h2>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}