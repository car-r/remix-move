

export type ItemProps = {
    name: string;
    id: string;
}

export type Item = {
    item: ItemProps
}

export default function ItemCard({item}: Item) {
    return (
        <div className="flex justify-between w-full bg-white rounded-md p-4">
            <h3 className="text-2xl font-bold">{item.name}</h3>
        </div>
    )
}