// const knex = require("knex");
const restify = require("restify");
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const server = restify.createServer();
server.pre(restify.pre.sanitizePath());
server.pre(restify.pre.userAgentConnection());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

async function getMaterials(siteId) {
    const constructionSite = await prisma.constructionSite.findUnique({
        where: {
            id: siteId
        },
        include: {
            materials: true,
        },
    });
    return constructionSite.materials;
}

server.get('/construction_site/:siteId/materials', async function (req, res, next) {
    const {siteId} = req.params;
    const materials = await getMaterials(siteId);
    res.send(materials);
    next();
});

server.get('/construction_site/:siteId/total_cost', async function (req, res, next) {
    const {siteId} = req.params;
    const materials = await getMaterials(siteId);
    let cost = 0;
    for (let material of materials) {
        cost += material.volume * material.cost_per_cubic_meter
    }
    res.send({"total_cost": cost});
    next();
});

server.get('/materials/total_cost', async function (req, res, next) {
    const materials = await prisma.material.findMany();
    let cost = 0;
    for (let material of materials) {
        cost += material.volume * material.cost_per_cubic_meter
    }
    res.send({"total_cost": cost});
    next();
});

server.post('/construction_site/:siteId/materials', async function (req, res, next) {
    const materialData = req.body;
    await prisma.material.upsert({
        where: {
            id: materialData.id
        },
        update: materialData,
        create: materialData,
    })
    res.send("Successful");
    next();
});

server.del('/materials/:materialId', async function (req, res, next) {
    const {materialId} = req.params;
    const deletedMaterial = await prisma.material.delete({
        where: {
            id: materialId,
        }
    });
    res.send(deletedMaterial);
    next();
});

server.listen(8080);

let shuttingDown = false;

function shutdown() {
    if (shuttingDown) {
        return;
    }
    shuttingDown = true;

    const shutdownTimeout = setTimeout(function () {
        console.log("Shutdown failed, terminating process.");
        process.exit(0);
    }, 5000);

    console.log("Closing server connections...");
    server.close(() => {
        clearTimeout(shutdownTimeout);
        console.log("Shutdown successful.");
    });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
