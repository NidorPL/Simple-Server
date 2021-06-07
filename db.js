
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
        programName: "bake1",
        title: "Backen",
        iconName: "chef-hat",
        inputs: ["temperature", "time"],
        pModuleName: "LabeledProgress",
        connectionUrl: "/bake"
    },
        {
            programName: "warm",
            title: "Aufwärmen",
            iconName: "radiator",
            inputs: ["time"],
            pModuleName: "LabeledProgress",
            connectionUrl: "/warm"
        }],
    runningPrograms: []
}

// {
//     programName: "bake1",
//         pModuleName: "LabeledProgress",
//     customApi: "default",
//     title: "Backen",
//     iconName: "chef-hat",
//     status: "running",
//     progress: 0.3,
//     value: "240 °C",
// }

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