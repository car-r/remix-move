import { Link } from "remix";

export default function BoxRouteCard({box}) {
    return (
        <div className="rounded-md p-4 bg-white">
            <h3 className="text-2xl font-bold">{box.name}</h3>
                <p className="font-semibold">Room: <span className="font-thin">{box.room}</span></p>
                <p className="font-semibold mb-1">Size: <span className="font-thin">{box.size}</span></p>
                <div className="grid grid-cols-1 gap-3">
                    {
                        box.items.map((item) => (
                            <Link to={`/item/${item.id}`} className="border border-slate-200 rounded-md p-2 bg-slate-100 bg-opacity-75 hover:border-slate-400 hover:bg-slate-200 transition-all ease-in-out duration-500">
                                <p key={item.id} className="text-center">
                                    {item.name}
                                </p>
                            </Link>
                        ))
                    }
                </div>
        </div>
    )
}