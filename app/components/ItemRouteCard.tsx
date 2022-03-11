import moment from 'moment'
import { Link } from 'react-router-dom'

export type Box = {
    name: string;
    id: string;
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

export default function ItemRouteCard({item}: Item) {
    return (
        <div className="flex flex-col rounded-md p-4 bg-white">
            <h3 className="text-2xl font-bold">{item.name}</h3>
            <Link to={`/box/${item.box.id}`}>
                <p className="font-semibold hover:underline underline-offset-2 inline-block">
                    Box: <span className="font-thin">{item.box.name}</span>
                </p>
            </Link>
            
            <p className="font-semibold mb-1">
                Last updated: <span className="font-thin">{moment(item.updatedAt).format('MMM DD, YYYY')}</span>
            </p>
        </div>
    )
}