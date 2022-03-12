import moment from "moment"
import { Link } from "remix"

export type Box = {
    name: string;
}

export type ItemProps = {
    name: string;
    id: string;
    updatedAt: string;
    box: Box
}

export type Item = {
    item: ItemProps
}

export default function ItemInBoxCard({item}: Item) {
    return (
        <div className="flex flex-col rounded-md p-4 bg-white h-full">
            <h3 className="text-2xl font-bold">{item.name}</h3>
            <p className="font-semibold mb-6">
                Last updated: <span className="font-thin">{moment(item.updatedAt).format('MMM DD, YYYY')}</span>
            </p>
            <Link to={`/item/${item.id}`} className='flex mt-auto'>
                <div className='rounded-md border-2 border-indigo-500 px-4 py-2 hover:bg-indigo-400 hover:text-white transition-all ease-in-out duration-300 cursor-pointer'>
                    <p className='font-bold'>View Item</p>
                </div>
            </Link>
        </div>
    )
}