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
    
    
    // Action to handle deleting a box
    if (form.get('_method') === 'delete') {
        // reassign all items in the current box to Unpacked Items box
        const items = await db.item.findMany({ where: {boxId: params.boxId}})
        await db.item.updateMany({
            where: {
                boxId: params.boxId || undefined
            },
            data: {
                boxId: unassignedBox[0].id
            }
        })
        // delete current box
        await db.box.delete({ where: {id: params.boxId}})
        return redirect('/box')
    }


    if (form.get('_method') === 'create') {
        const name: string | any = form.get('name')
        const boxId: string | any = form.get('boxId')

        // Validation checks for adding a new item to a box
        const errors = {
            name: '',
            boxId: ''
        }

        function checkItemName(name: string | any) {
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
        const name: any = form.get('name')
        const room: any = form.get('room')
        const size: any = form.get('size')
 
        // Validation checks for updating box information
        const errors = {
            name: '',
            room: ''
        }

        // check if box name is null or less than 3 characters
        function checkBoxName(name: string | any) {
            if(!name || name.length < 3) {
                return errors.name = `Box name too short`
            }
        }
        checkBoxName(name)

        // check if box room name is null or less than 3 characters
        function checkRoomName(room: string | any) {
            if(!room || room.length < 3) {
                return errors.room = `Room name too short`
            }
        }
        checkRoomName(room)

        if (errors.name || errors.room) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = { 
            name, 
            room, 
            size 
        }

        await db.box.update({where: {id: params.boxId}, data: fields })
        return redirect(`/box/${params.boxId}`)
    }

}


export default function BoxPage() {
    const uniqueBox = useLoaderData()
    console.log(uniqueBox)
    const [showAddItem, setShowAddItem] = useState(false)
    const [showEditBox, setShowEditBox] = useState(false)

    const handleEditBox = () => setShowEditBox(!showEditBox)
    const handleAddItem = () => setShowAddItem(!showAddItem)
    
    return (
        <div className="flex flex-col lg:col-span-4">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 pb-2 border border-b-neutral-300">Box: <span className="font-light">{uniqueBox.name}</span></h1>
            <div className="mb-4 flex justify-between">
                <div onClick={handleAddItem}>
                    <ButtonOutlined children="Add Item" />                                                                                
                </div>
                
                {uniqueBox.name === 'Unpacked Items' ? 
                    <Link to='/box'>
                        <Button children="Boxes" />
                    </Link>
                    :
                    <div onClick={handleEditBox}>
                        <Button children="Edit Box" />
                    </div>
                    
                }  
            </div>
            <div className="lg:flex lg:gap-4">
                {showAddItem ? <AddItemToBox uniqueBox={uniqueBox}/> : null}
                {showEditBox ? <EditBox uniqueBox={uniqueBox}/> : null}
            </div>
            
            
            <BoxRouteCard box={uniqueBox}/>
        </div>
        
    )
}