import { redirect, useActionData } from "remix"
import type { ActionFunction } from "remix"

import { db } from "~/utils/db.server"
import AddBox from "~/components/AddBox"

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const name = form.get('name')
    const room = form.get('room')
    const size = form.get('size')

    const errors = {
        name: '',
        room: ''
    }

    function checkBoxName(name: string | any) {
        if(!name || name.length < 3) {
            return errors.name = `Box name too short`
        }
    }
    checkBoxName(name)

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

    const fields = { name, room, size }
    const box = await db.box.create( {data: fields})
    return redirect(`/box/${box.id}`)
}

export default function NewBox() {
    const actionData = useActionData()
    return (
        <div className="lg:col-span-4">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 pb-2 border border-b-neutral-300">New Box</h1>
            <AddBox />
        </div>
    ) 
}