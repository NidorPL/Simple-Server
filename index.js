const fastify = require('fastify')({
    logger: true
})
const _ = require("lodash")

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

/*
 Oven 1
 */

fastify.get('/oven1/supportedPrograms', async (request, reply) => {
    return db.oven1.supportedPrograms
})

fastify.get('/oven1/runningPrograms', async (request, reply) => {
    return db.oven1.runningPrograms
})

// start program
fastify.post('/oven1/startProgram', async (request, reply) => {
    const {programName} = request.body
    const ovenData = db.oven1

    const supportedProgram = ovenData.supportedPrograms.find(sp => sp.programName === programName)

    if (!supportedProgram) {
        reply.code(400).send("Program not supported")
    }

    const alreadyRunningProgram = ovenData.runningPrograms.find(sp => sp.programName === programName)

    if (alreadyRunningProgram) {
        reply.code(400).send(`Program ${programName} is already running`)
    }

    const newProgram = ({
        ...supportedProgram,
        ...request.body
    })

    db.oven1.runningPrograms.push(newProgram)

    return db.oven1.runningPrograms
})


// stop program


/*
 Table 1
 */

fastify.get('/table1/data', async (request, reply) => {
    return db.table1
})




fastify.post('/table1/edit', async (request, reply) => {
    const {id} = request.body

    const doesElementExist = db.table1.find(element => element.id === id)

    if(!doesElementExist) {
        reply.code(400).send(`Data element with id ${id} does not exist`)
    }

    db.table1 = db.table1.map((element) => {
        if(element.id === id) {
            console.log("found");
            return request.body
        } else {
            return element
        }
    })

    return db.table1
})

fastify.post('/table1/delete', async (request, reply) => {
    const {id} = request.body

    const doesElementExist = db.table1.find(element => element.id === id)

    if(!doesElementExist) {
        reply.code(400).send(`Data element with id ${id} does not exist`)
    }

    db.table1 = db.table1.filter((element) => !(element.id === id))

    return db.table1
})




