const fastify = require('fastify')({
    logger: true
})


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
        value: "271 °C",
    }
})


fastify.get('/vacuum1/status', async (request, reply) => {
    return {
        status: "running",
        progress: 0.7,
        value: "Intensive Reinigung",
    }
})


