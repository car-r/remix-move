import { prisma } from "@prisma/client"
import { useState } from "react"
import { ActionFunction, Link, LoaderFunction, Outlet, redirect, useLoaderData, json, useActionData } from "remix"
import AddItemToBox from "~/components/AddItemToBox"
import BoxRouteCard from "~/components/BoxRouteCard"
import Button from "~/components/Button"
import ButtonOutlined from "~/components/ButtonOutlined"
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

    const handleEditBox = () => setShowEditBox(!showEditBox)
    const handleAddItem = () => setShowAddItem(!showAddItem)
    
    return (
        <div className="flex flex-col my-4">
            <div className="mb-4 flex justify-between">
                
                <ButtonOutlined children="Add Item" handleClick={handleAddItem}/>
                {uniqueBox.name === 'Unpacked Items' ? 
                    <Link to='/box'>
                        <Button children="Boxes" handleClick={null}/>
                    </Link>
                    :
                    <Button children="Edit Box" handleClick={handleEditBox}/>
                }  
            </div>

            {showAddItem ? <AddItemToBox uniqueBox={uniqueBox}/> : null}
            {showEditBox ? <EditBox uniqueBox={uniqueBox}/> : null}
            
            <BoxRouteCard box={uniqueBox}/>
        </div>
        
    )
}