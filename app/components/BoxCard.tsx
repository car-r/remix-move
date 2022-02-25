export default function BoxCard({box}) {
    return (
        <div className=" border border-white rounded-md p-4 bg-white hover:border-indigo-500">
            <h3 className="text-3xl font-bold">{box.name}</h3>
                <h4 className="font-semibold">Room: <span className="font-thin">{box.room}</span></h4>
                <h4 className="font-semibold">Size: <span className="font-thin">{box.size}</span></h4>
        </div>
    )
}