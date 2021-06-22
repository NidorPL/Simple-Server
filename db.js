
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

let coffee1 = {
    supportedPrograms:  [{
        programName: "Kaffee machen",
        iconName: "coffee",
        inputs: [],
        pModuleName: "LabeledProgress",
        valueSuffix: "",
    },
        {
            programName: "Latte macchiato machen",
            iconName: "coffee-outline",
            inputs: [""],
            valueSuffix: "",
            pModuleName: "LabeledProgress",
            connectionUrl: "/late"
        }],
    runningPrograms: [
        {
            programName: "Latte macchiato machen",
            iconName: "coffee-outline",
            customApi: "default",
            inputs: [""],
            valueSuffix: "",
            pModuleName: "LabeledProgress",
            progress: 0.8,
            value: "Kaffee brühen..."
        }
    ]
}



module.exports = {
    table1,
    oven1,
    coffee1
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
