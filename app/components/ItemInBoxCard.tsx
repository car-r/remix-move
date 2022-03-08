import moment from "moment"

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
        <div className="flex flex-col rounded-md p-4 bg-white lg:w-1/2">
            <h3 className="text-2xl font-bold">{item.name}</h3>
            <p className="font-semibold mb-1">
                Last updated: <span className="font-thin">{moment(item.updatedAt).format('MMM DD, YYYY')}</span>
            </p>
        </div>
    )
}