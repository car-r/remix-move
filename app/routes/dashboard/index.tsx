import { Link, LoaderFunction, useLoaderData } from "remix"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async () => {
    const numberOfBoxes = await db.box.count()
    const numberOfItems = await db.item.count()
    const boxes = await db.box.findMany()
    const boxNames = boxes.map((box) => (box.name))
    const kitchenBoxes = await db.box.count({ where: {room: 'Kitchen'}})
    const bedroomBoxes = await db.box.count({ where: {room: 'Bedroom'}})
    const bathroomBoxes = await db.box.count({ where: {room: 'Bathroom'}})
    let data = [numberOfBoxes, numberOfItems, kitchenBoxes, bedroomBoxes, bathroomBoxes]
    return data
}

export default function Dashboard() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            Dashboard Route
            <div className="grid grid-cols-2 gap-4">
                <Link to='/box' className="border rounded p-2">
                    <p className="text-center text-8xl mb-2">{data[0]}</p>
                    <h2 className="text-2xl text-center">Boxes</h2>
                </Link>
                <Link to='/item' className="border rounded p-2">
                    <p className="text-center text-8xl mb-2">{data[1]}</p>
                    <h2 className="text-2xl text-center">Items</h2>
                </Link>
                <div className="border rounded p-2">
                    <p className="text-center text-8xl mb-2">{data[2]}</p>
                    <h2 className="text-2xl text-center">Kitchen Boxes</h2>
                </div>
                <div className="border rounded p-2">
                    <p className="text-center text-8xl mb-2">{data[3]}</p>
                    <h2 className="text-2xl text-center">Bedroom Boxes</h2>
                </div>
            </div>
            
        </div>
    )
}