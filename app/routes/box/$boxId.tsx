import { prisma } from "@prisma/client"
import { useState } from "react"
import { ActionFunction, Link, LoaderFunction, Outlet, redirect, useLoaderData, json, useActionData } from "remix"
import AddItemToBox from "~/components/AddItemToBox"
import EditBox from "~/components/EditBox"
import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const box = await db.box.findUnique({ where: {id: params.boxId} })
    const items = await db.item.findMany({ where: {boxId: params.boxId}})
    
    return { ...box, items}
}


export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData()
    
    console.log(Object.fromEntries(form))
    
    // grab Unpacked Items boxId // findUnique wouldn't work??? vvv
    const unassignedBox = await db.box.findMany({ where: {name: 'Unpacked Items'}})
    // need to reassign all items in the box to Unpacked Items box
    
    if (form.get('_method') === 'create') {
        const name = form.get('name')
        const boxId = form.get('boxId')

        // Validation checks for adding a new item to a box
        const errors = {
            name: '',
            boxId: ''
        }

        function checkItemName(name) {
            if(!name || name.length < 3) {
                return errors.name = `Item name too short`
            }
        }
        checkItemName(name)

        if (!boxId) {
            errors.boxId = 'Please select a box'
        }

        if (errors.name || errors.boxId) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = { name, boxId }

        const item = await db.item.create( {data: fields })
        return redirect(`/box/${boxId}`)
    }


    // Action to handle updating box information
    if(form.get('_method') === 'update') {
        const name = form.get('name')
        const room = form.get('room')
        const size = form.get('size')
 
        // Validation checks for updating box information
        const errors = {
            name: '',
            room: ''
        }

        // check if box name is null or less than 3 characters
        function checkBoxName(name) {
            if(!name || name.length < 3) {
                return errors.name = `Box name too short`
            }
        }
        checkBoxName(name)

        // check if box room name is null or less than 3 characters
        function checkRoomName(room) {
            if(!room || room.length < 3) {
                return errors.room = `Room name too short`
            }
        }
        checkRoomName(room)

        if (errors.name || errors.room) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = { name, room, size }
        await db.box.update({where: {id: params.boxId}, data: fields })
        return redirect(`/box/${params.boxId}`)
    }

}


export default function BoxPage() {
    const uniqueBox = useLoaderData()
   
    const [showAddItem, setShowAddItem] = useState(false)
    const [showEditBox, setShowEditBox] = useState(false)
    
    return (
        <div className="flex flex-col my-4">
            <div className="mb-4 flex justify-between">
                <div 
                    onClick={() => setShowAddItem(!showAddItem)} 
                    className="py-2 px-6 border border-slate-200 rounded 
                    hover:bg-slate-100 hover:underline transition-all ease-in-out duration-300 cursor-pointer"
                >
                    Add Item
                </div>
                {uniqueBox.name === 'Unpacked Items' ? 
                    <Link 
                        to='/box' 
                        className="bg-slate-400 bg-opacity-75 text-white py-2 px-6 rounded 
                        hover:bg-slate-200 hover:text-black transition-all ease-in-out duration-300 cursor-pointer"
                    >
                        Boxes
                    </Link> :
                    <div 
                        onClick={() => setShowEditBox(!showEditBox)} 
                        className="bg-slate-400 border border-slate-400/75 bg-opacity-75 text-white py-2 px-6 rounded 
                        hover:bg-slate-200 hover:text-black hover:border hover:border-slate-400 transition-all ease-in-out duration-300 cursor-pointer"
                    >
                        Edit Box
                    </div>
                }  
            </div>

            {showAddItem ? <AddItemToBox uniqueBox={uniqueBox}/> : <div></div>}
            {showEditBox ? <EditBox uniqueBox={uniqueBox}/> : <div></div>}
            
            <div className="border border-slate-200 rounded p-4">
                <h1 className="text-3xl font-bold">{uniqueBox.name}</h1>
                <h4 className="font-semibold">Room: <span className="font-thin">{uniqueBox.room}</span></h4>
                <h4 className="font-semibold">Size: <span className="font-thin">{uniqueBox.size}</span></h4>
                <h4 className="font-semibold mb-1">Items:</h4>
                <div className="grid grid-cols-1 gap-3">
                    {
                        uniqueBox.items.map((item) => (
                            <Link to={`/item/${item.id}`} className="border border-slate-200 rounded p-2 bg-slate-50 bg-opacity-75 hover:scale-105 hover:border-slate-400 transition-all ease-in-out duration-500">
                                <p key={item.id} className="text-center">
                                    {item.name}
                                </p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
        
    )
}