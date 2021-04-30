const { PrismaClient } = require('@prisma/client')
const uuid = require("uuid");

const prisma = new PrismaClient()

const sites = [
    {
        id: uuid.v4(),
        materials: {
            create: [
                {
                    name: "iron",
                    volume: 23.0,
                    cost_per_cubic_meter: 10.0,
                    color: "grey"
                },
                {
                    name: "gold",
                    volume: 34.0,
                    cost_per_cubic_meter: 80.0,
                    color: "yellow"
                },
                {
                    name: "bronze",
                    volume: 13.0,
                    cost_per_cubic_meter: 30.0,
                    color: "green"
                }
            ]
        }
    },
    {
        id: uuid.v4(),
        materials: {
            create: [
                {
                    name: "bronze",
                    volume: 13.0,
                    cost_per_cubic_meter: 30.0,
                    color: "green"
                },
                {
                    name: "gold",
                    volume: 34.0,
                    cost_per_cubic_meter: 80.0,
                    color: "yellow"
                }
            ]
        }
    }
];

async function main() {
    for (let site of sites) {
        await prisma.constructionSite.create({
            data: site
        })
    }
}

main()
.catch(e => {
    console.error(e)
    process.exit(1)
})
.finally(async () => {
    await prisma.$disconnect()
})