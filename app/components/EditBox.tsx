import { useActionData } from "remix"
import { action } from "~/routes/box/$boxId"
import DeleteButton from "./DeleteButton"
import UpdateButton from "./UpdateButton"

export type UniqueBox = {
    uniqueBox: uniqueBox;
}

export type uniqueBox = {
    name: string;
    box: string;
    room: string;
}

export default function EditBox({ uniqueBox }: UniqueBox) {
    const actionData = useActionData()
    return (
        <div className="mb-4 flex p-4 rounded-md bg-white lg:w-1/2">
            <form method="post" className="w-full">
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Box Name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        defaultValue={uniqueBox.name}
                        className="border border-slate-200 rounded px-2 py-1"
                    />
                    {actionData?.errors.name && (
                        <p className="text-red-400">{actionData.errors.name}</p>
                    ) }
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Room Name: </label>
                    <input 
                        type="text" 
                        name="room" 
                        defaultValue={uniqueBox.room} 
                        className="border border-slate-200 rounded px-2 py-1"/>
                        {actionData?.errors.room && (
                            <p className="text-red-400">{actionData.errors.room}</p>
                        ) }
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2">Box Size: </label>
                    <select name="size" className="border border-slate-200 rounded px-2 py-1">
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <UpdateButton />
                    <DeleteButton />
                </div>   
            </form>
        </div>
    )
}