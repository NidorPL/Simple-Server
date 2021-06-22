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

fastify.get('/oven1/programsInfo', async (request, reply) => {
    return {
        info: {
            deviceName: "Intelligenter Ofen",
            deviceDescription: "Der intelligente Ofen vereinfacht in praktischer Weise Ihren Alltag. Starten Sie vom Wohnzimmmer aus ihren gewünschten Backvorgang oder sezten Sie direkt feste Regeln !",
            iconName: "stove"
        },
        supportedPrograms: db.oven1.supportedPrograms
    }
})

fastify.get('/oven1/runningPrograms', async (request, reply) => {
    return db.oven1.runningPrograms
})

// start program
fastify.post('/oven1/startProgram', async (request, reply) => {
    const newProgramData = request.body
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
        customApi: "default",
        ...supportedProgram,
        ...request.body,
        value: newProgramData[supportedProgram.inputs[0]]
    })

    db.oven1.runningPrograms.push(newProgram)

    return db.oven1.runningPrograms
})


// stop program

fastify.post('/oven1/stopProgram', async (request, reply) => {
    const {programName} = request.body
    const ovenData = db.oven1

    const supportedProgram = ovenData.supportedPrograms.find(sp => sp.programName === programName)

    if (!supportedProgram) {
        reply.code(400).send("Program not supported")
    }

    const alreadyRunningProgram = ovenData.runningPrograms.find(sp => sp.programName === programName)

    if (!alreadyRunningProgram) {
        reply.code(400).send(`Program ${programName} is not running`)
    }

    db.oven1.runningPrograms = db.oven1.runningPrograms.filter(program => program.programName !== programName)

    return db.oven1.runningPrograms
})

fastify.post('/oven1/updateProgram', async (request, reply) => {
    const {programName, newValue} = request.body

    const ovenData = db.oven1

    const supportedProgram = ovenData.supportedPrograms.find(sp => sp.programName === programName)

    if (!supportedProgram) {
        reply.code(400).send("Program not supported")
    }

    const alreadyRunningProgram = ovenData.runningPrograms.find(sp => sp.programName === programName)

    if (!alreadyRunningProgram) {
        reply.code(400).send(`Program ${programName} is not running`)
    }

    db.oven1.runningPrograms = db.oven1.runningPrograms.map(runningProgram => {
        if(runningProgram.programName === programName) {
            console.log("found");
            return {
                ...runningProgram,
                value: newValue
            }
        }
        return runningProgram
    })

    return db.oven1.runningPrograms
})


/*
 Oven 1
 */

fastify.get('/coffee1/programsInfo', async (request, reply) => {
    return {
        info: {
            deviceName: "Intelligente Kaffeemaschine",
            deviceDescription: "Ihr persönliches Kaffeeerlebnis",
            iconName: "coffee"
        },
        supportedPrograms: db.coffee1.supportedPrograms
    }
})

fastify.get('/coffee1/runningPrograms', async (request, reply) => {
    return db.coffee1.runningPrograms
})

// start program
fastify.post('/coffee1/startProgram', async (request, reply) => {
    const newProgramData = request.body
    const {programName} = request.body
    const coffee1Data = db.coffee1

    const supportedProgram = coffee1Data.supportedPrograms.find(sp => sp.programName === programName)

    if (!supportedProgram) {
        reply.code(400).send("Program not supported")
    }

    const alreadyRunningProgram = coffee1Data.runningPrograms.find(sp => sp.programName === programName)

    if (alreadyRunningProgram) {
        reply.code(400).send(`Program ${programName} is already running`)
    }

    const newProgram = ({
        customApi: "default",
        ...supportedProgram,
        ...request.body,
        value: newProgramData[supportedProgram.inputs[0]]  || "Wird ausgeführt..."
    })

    console.log("newProgram");
    console.log(newProgram);

    db.coffee1.runningPrograms.push(newProgram)

    return db.coffee1.runningPrograms
})


// stop program

fastify.post('/coffee1/stopProgram', async (request, reply) => {
    const {programName} = request.body
    const coffee1Data = db.coffee1

    const supportedProgram = coffee1Data.supportedPrograms.find(sp => sp.programName === programName)

    if (!supportedProgram) {
        reply.code(400).send("Program not supported")
    }

    const alreadyRunningProgram = coffee1Data.runningPrograms.find(sp => sp.programName === programName)

    if (!alreadyRunningProgram) {
        reply.code(400).send(`Program ${programName} is not running`)
    }

    db.coffee1.runningPrograms = db.coffee1.runningPrograms.filter(program => program.programName !== programName)

    return db.coffee1.runningPrograms
})

fastify.post('/coffee1/updateProgram', async (request, reply) => {
    const {programName, newValue} = request.body

    const ovenData = db.coffee1

    const supportedProgram = ovenData.supportedPrograms.find(sp => sp.programName === programName)

    if (!supportedProgram) {
        reply.code(400).send("Program not supported")
    }

    const alreadyRunningProgram = ovenData.runningPrograms.find(sp => sp.programName === programName)

    if (!alreadyRunningProgram) {
        reply.code(400).send(`Program ${programName} is not running`)
    }

    db.coffee1.runningPrograms = db.coffee1.runningPrograms.map(runningProgram => {
        if(runningProgram.programName === programName) {
            console.log("found");
            return {
                ...runningProgram,
                value: newValue
            }
        }
        return runningProgram
    })

    return db.coffee1.runningPrograms
})










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



/*

       Chatbots

 */

fastify.get('/doctor-bot1/init', async (request, reply) => {
    return [
        {
            type: "simple-message",
            text:
                "Willkommen bei deinem persönlichen Assistent zu Gesundheitsfragen",
            fromChatbot: true,
            linkedRequest: "simple-test",
        },
        {
            type: "simple-message",
            text:
                "Wählen Sie einen Themenbereich über den sie sprechen möchten oder stellen sie ihre Frage direkt",
            fromChatbot: true,
            linkedRequest: "simple-test",
        },
        {
            type: "single-checkbox-message",
            options: [
                "TrockenerHusten",
                "Fieber",
                "Atembeschwerden",
                "Abgeschlagenheit",
                "Keine",
            ],
            linkedRequest: [
                "chatbot?request=1",
                "chatbot?request=2",
                "chatbot?request=3",
                "chatbot?request=4",
                "chatbot?request=5",
            ],
        },
    ]
})





fastify.get('/news-bot1/init', async (request, reply) => {
    const labels = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
    ];

    const data = [
        106,
        110,
        102,
        110,
        103,
        106,
    ];
    return [
        {
            type: "simple-message",
            text:
                "Newsbot - Ihr persönlicher Assistent um informiert zu bleiben",
            fromChatbot: true,
            linkedRequest: "simple-test",
        },
        {
            type: "chart-message",
            headline: "Aktienkurs Apple",
            headlineInfo: "111 €",
            chartData: { labels, data },
            fromChatbot: true,
            showSmall: false,
            linkedRequest: "chart-test",
        },
    ]
})



