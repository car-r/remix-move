import { Link, LoaderFunction, Outlet, useLoaderData } from "remix"
import BoxCard from "~/components/BoxCard"
import BoxCardInRoom from "~/components/BoxCardInRoom"
import ItemCard from "~/components/ItemCard"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({params}) => {
    const room = await db.box.findMany({where: {room: params.room}})
    const numberOfBoxes = await db.box.count({where: {room: params.room}})
    const items = await db.item.findMany()
    console.log(params)
    let data = {room, numberOfBoxes, items}
    return data
}

export default function Room() {
    const room = useLoaderData()
    console.log(room.room.items)
    const roomName = room.room[0].room
    const roomIds = room.room.map((box) => (box.id))
    // const itemsInRoom = room.items.filter(item => item.boxId.includes(roomIds[0]))
    // const itemsInRoom = room.items.filter(item => {item.boxId !== roomIds})
    // https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
    const itemsInRoom = room.items.filter((item) => {
        return roomIds.some((i) => {
            return i === item.boxId
        })
    })
    const itemCount = itemsInRoom.length
    console.log(itemsInRoom, itemCount)
    
    return (
        <div className="lg:col-span-4">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 pb-2 border border-b-neutral-300">Room: <span className="font-light">{roomName}</span></h1>
            <div className="grid grid-cols-2 gap-4 mb-20">
                <div className="border rounded-md bg-white  p-2">
                    <p className="text-center text-7xl mb-2">{room.numberOfBoxes}</p>
                    <h4 className="text-xl text-center">Total boxes</h4>
                </div>
                <div className="border rounded-md bg-white p-2">
                    <p className="text-center text-7xl mb-2">{itemCount}</p>
                    <h4 className="text-xl text-center">Total items</h4>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-24 lg:grid-cols-2">
                <div className="grid grid-cols-1 gap-4 mb-4 lg:flex lg:flex-col">
                    <h3 className="text-2xl lg:text-3xl font-light pb-2 border border-b-neutral-300">Boxes</h3>
                    {
                        room.room.map((box) => (
                            <Link to={`box/${box.id}`}>
                                <BoxCardInRoom box={box}/>
                            </Link> 
                        ))
                    }
                </div>
                {/* <div className="grid grid-cols-1 gap-4 lg:flex lg:flex-col">
                    <h3 className="text-2xl lg:text-3xl font-light pb-2 border border-b-neutral-300">Items</h3>
                    { itemsInRoom.map((item) => (
                        <Link to={`/item/${item.id}`}>
                            <ItemCard item={item}/>
                        </Link>
                    ))}
                </div> */}
                <div className="grid grid-cols-1 gap-4 lg:flex lg:flex-col">
                    <h3 className="text-2xl lg:text-3xl font-light pb-2 border border-b-neutral-300">{`Items`}</h3>
                    <Outlet />
                </div>
                
            </div>
        </div>
    )
}