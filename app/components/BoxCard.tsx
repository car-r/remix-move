export type BoxProps = {
    name: string;
    size: string;
    room: string;
    id: string;
}

export type Box = {
    box: BoxProps;
}

export default function BoxCard({box}: Box) {
    return (
        <div className=" border border-white rounded-md p-4 bg-white hover:border-indigo-500">
            <h3 className="text-3xl font-bold">{box.name}</h3>
                <h4 className="font-semibold">Room: <span className="font-thin">{box.room}</span></h4>
                <h4 className="font-semibold">Size: <span className="font-thin">{box.size}</span></h4>
        </div>
    )
}