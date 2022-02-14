import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

async function seed() {
    await Promise.all(
        getBoxes().map(box => {
            return db.box.create({ data: box })
        })
    )

    await Promise.all(
        getItems().map(item => {
            return db.item.create({ data: item })
        })
    )
}

seed()

function getBoxes() {
    return [
        {
            room: "Kitchen",
            size: "Large",
            name: "Pots and Pans"
        },
        {
            room: "Bedroom",
            size: "Large",
            name: "Bedding"
        },
        {
            room: "Office",
            size: "Medium",
            name: "Misc"
        },
    ]
}

function getItems() {
    return [
        {
            name: "Cast Iron Pan"
        },
        {
            name: "Computer Monitor"
        },
        {
            name: "Office Clock"
        },
        {
            name: "Air fryer"
        },
        {
            name: "Pillow"
        },
    ]
}