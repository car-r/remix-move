import { useState } from "react"
import { ActionFunction, Link, LoaderFunction, Outlet, redirect, useLoaderData } from "remix"
import Button from "~/components/Button"
import ButtonOutlined from "~/components/ButtonOutlined"
import EditItemComponent from "~/components/EditItemComponent"
import ItemRouteCard from "~/components/ItemRouteCard"

import { db } from "~/utils/db.server"

export const loader: LoaderFunction = async ({ params }) => {
    const item = await db.item.findUnique({ where: {id: params.itemId} })
    const box = await db.box.findUnique({ where: {id: item?.boxId}})
    const boxes = await db.box.findMany()
    // console.log(params)
    return {...item, box, boxes}
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData()
    if (form.get('_method') === 'delete') {
        await db.item.delete({ where: {id: params.itemId}})
        return redirect('/item')
    }

    if (form.get('_method') === 'update') {
        const name: string | any = form.get('name')
        const boxId: string | any = form.get('boxId')

        const errors = {
            name: '',
        }

        function checkItemName(name: string) {
            if(!name || name.length < 3) {
                return errors.name = `Item name too short`
            }
        }
        checkItemName(name)

        if (errors.name) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = { name, boxId }

        await db.item.update({where: {id: params.itemId}, data: fields })
        return redirect(`/box/${boxId}`)
    }
}


export default function ItemPage() {
    const uniqueItem = useLoaderData()
    const [updateItem, setUpdateItem] = useState(false)
    const handleUpdateItem = () => setUpdateItem(!updateItem)
    // console.log(uniqueItem)
    return (
        <div className="my-4 flex flex-col lg:col-span-4">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 pb-2 border border-b-neutral-300">Item: <span className="font-light">{uniqueItem.name}</span></h1>
            <div className="flex justify-between mb-4">
                <Link to='/item'>
                    <ButtonOutlined children={"Items"} />
                </Link>
                <div onClick={handleUpdateItem}>
                    <Button children={"Edit Item"} />
                </div>
                
            </div>
            {/* {updateItem ? <Outlet /> : <div></div>} */}
            { updateItem ? <EditItemComponent uniqueItem={uniqueItem}/> : <div></div> }
            
            <ItemRouteCard item={uniqueItem}/>
            
        </div>
        
    )
}