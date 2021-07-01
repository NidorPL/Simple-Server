const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const db = require("./db")

app.use(express.json())

app.use(cors())

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/oven1/programsInfo', (req, res) => {
    res.send({info: {
            deviceName: "Intelligenter Ofen",
            deviceDescription: "Der intelligente Ofen vereinfacht in praktischer Weise Ihren Alltag. Starten Sie vom Wohnzimmmer aus ihren gewünschten Backvorgang oder sezten Sie direkt feste Regeln !",
            iconName: "stove"
        },
        supportedPrograms: db.oven1.supportedPrograms})
})

app.get('/oven1/runningPrograms', (req, res) => {
    res.send(db.oven1.runningPrograms)
})

// start program
app.post('/oven1/startProgram', async (request, res) => {
    const newProgramData = request.body
    const {programName} = request.body
    const ovenData = db.oven1

    const supportedProgram = ovenData.supportedPrograms.find(sp => sp.programName === programName)

    if (!supportedProgram) {
        return res.status(400).send("Program not supported")
    }

    const alreadyRunningProgram = ovenData.runningPrograms.find(sp => sp.programName === programName)

    if (alreadyRunningProgram) {
        return res.status(400).send(`Program ${programName} is already running`)
    }

    const newProgram = ({
        customApi: "default",
        ...supportedProgram,
        ...request.body,
        value: newProgramData[supportedProgram.inputs[0]]
    })

    db.oven1.runningPrograms.push(newProgram)

    return res.send(db.oven1.runningPrograms)
})

// stop program

app.post('/oven1/stopProgram', async (request, reply) => {
    const {programName} = request.body
    const ovenData = db.oven1

    const supportedProgram = ovenData.supportedPrograms.find(sp => sp.programName === programName)

    if (!supportedProgram) {
        reply.status(400).send("Program not supported")
    }

    const alreadyRunningProgram = ovenData.runningPrograms.find(sp => sp.programName === programName)

    if (!alreadyRunningProgram) {
        reply.status(400).send(`Program ${programName} is not running`)
    }

    db.oven1.runningPrograms = db.oven1.runningPrograms.filter(program => program.programName !== programName)

    reply.send(db.oven1.runningPrograms)
})

app.post('/oven1/updateProgram', async (request, reply) => {
    const {programName, newValue} = request.body

    const ovenData = db.oven1

    const supportedProgram = ovenData.supportedPrograms.find(sp => sp.programName === programName)

    if (!supportedProgram) {
        reply.status(400).send("Program not supported")
    }

    const alreadyRunningProgram = ovenData.runningPrograms.find(sp => sp.programName === programName)

    if (!alreadyRunningProgram) {
        reply.status(400).send(`Program ${programName} is not running`)
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

    reply.send(db.oven1.runningPrograms)
})



/*


 Table 1



 */

app.get('/table1/data', async (request, reply) => {
    return reply.send(db.table1)
})




app.post('/table1/edit', async (request, reply) => {
    const {id} = request.body

    const doesElementExist = db.table1.find(element => element.id === id)

    if(!doesElementExist) {
        return reply.status(400).send(`Data element with id ${id} does not exist`)
    }

    db.table1 = db.table1.map((element) => {
        if(element.id === id) {
            console.log("found");
            return request.body
        } else {
            return element
        }
    })

    return reply.send(db.table1)
})

app.post('/table1/delete', async (request, reply) => {
    const {id} = request.body

    const doesElementExist = db.table1.find(element => element.id === id)

    if(!doesElementExist) {
        return reply.status(400).send(`Data element with id ${id} does not exist`)
    }

    db.table1 = db.table1.filter((element) => !(element.id === id))

    return reply.send(db.table1)
})










