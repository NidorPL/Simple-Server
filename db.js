
let table1 = [
    {
        id: 1,
        name: "Käse",
        quantity: 200,
        unit: "gramm",
        bbf: "",

    },
    {
        id: 2,
        name: "Krakauer",
        quantity: 500,
        unit: "gramm",
        bbf: "",

    },
    {
        id: 3,
        name: "Brot",
        quantity: 1,
        unit: "kg",
        bbf: "",

    },
    {
        id: 4,
        name: "Milch",
        quantity: 2,
        unit: "Liter",
        bbf: "",
    },
]

let oven1 = {
    supportedPrograms:  [{
        programName: "Backen",
        iconName: "chef-hat",
        inputs: ["temperatur", "Zeit in Minuten"],
        pModuleName: "LabeledProgress",
        valueSuffix: "°C",
        connectionUrl: "/bake"
    },
    {
        programName: "Aufwärmen",
        iconName: "radiator",
        inputs: ["Zeit in Minuten"],
        valueSuffix: "Min",
        pModuleName: "LabeledProgress",
        connectionUrl: "/warm"
    }],
    runningPrograms: [
        {
            programName: "Backen",
            pModuleName: "LabeledProgress",
            customApi: "default",
            iconName: "chef-hat",
            status: "running",
            progress: 0.3,
            value: "240",
            valueSuffix: "°C",
            inputs: ["temperature", "time"],
        }
    ]
}



module.exports = {
    table1,
    oven1
}


// table1: [
//     {
//         id: 1,
//         name: "Käse",
//         quantity: 200,
//         unit: "gramm",
//         bbf: "",
//
//     },
//     {
//         id: 2,
//         name: "Krakauer",
//         quantity: 500,
//         unit: "gramm",
//         bbf: "",
//
//     },
//     {
//         id: 3,
//         name: "Brot",
//         quantity: 1,
//         unit: "kg",
//         bbf: "",
//
//     },
//     {
//         id: 4,
//         name: "Milch",
//         quantity: 2,
//         unit: "Liter",
//         bbf: "",
//     },
// ]