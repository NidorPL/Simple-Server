const fastify = require('fastify')({
    logger: true
})

const db = require("./db")


const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()

fastify.register(require('fastify-cors'), {
    // put your options here
})


fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})


fastify.get('/oven1/bake1/status', async (request, reply) => {
    return {
        status: "running",
        progress: 0.3,
        value: "260 °C",
    }
})


fastify.get('/vacuum1/status', async (request, reply) => {
    return {
        status: "running",
        progress: 0.7,
        value: "Intensive Reinigung",
    }
})


fastify.get('/table1/data', async (request, reply) => {
    return db.table1
})


fastify.post('/table1/edit', async (request, reply) => {
    const {id} = request.body

    const doesElementExist = db.table1.find(element => element.id === id)

    if(!doesElementExist) {
        reply.code(400).send(`Element for table1 with id ${id} not found`)
    }

    db.table1 = db.table1.map((element) => {
        if(element.id === id) {
            return request.body
        } else {
            return element
        }
    })

    return db.table1
})


// Löschen Methode




