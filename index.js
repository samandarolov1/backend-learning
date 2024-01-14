const express = require("express")
const Joi = require("joi")
const app = express()

app.use(express.json())

const port = process.env.port || 2006

let categories = [
    { id: 1, name: "dasturlash" },
    { id: 2, name: "3D model" },
    { id: 3, name: "Trading" }
]

app.get("/api/categories", (req, res) => {
    res.send(categories)
    console.log("category olindi");
})
app.post("/api/categories", (req, res) => {
    const { error } = validateCategory(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let category = {
        id: categories[categories.length - 1].id + 1,
        name: req.body.name
    }
    categories.push(category)
    res.status(201).send(category)
    console.log("new category");
})

app.put("/api/categories/:id", (req, res) => {
    let category = categories.find(i => i.id === parseInt(req.params.id))
    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    const { error } = validateCategory(req.body)
    if (error) {
        if (!category)
            return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');
    }
    category.name = req.body.name
    res.send(category)
})
app.get("/api/categories/:id", (req, res) => {
    let category = categories.find(i => i.id === parseInt(req.params.id))
   if(!category)
   return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');
 res.send(category)
})
app.delete("/api/categories/:id", (req, res) => {
    let category = categories.find(i => i.id === +req.params.id)
    if (!category)
        return res.status(404).send("Berilgan idga teng id topilmadi!")
    let indexOfCategory = categories.indexOf(category)
    categories.splice(indexOfCategory, 1)
    res.send(category)
})

function validateCategory(category) {
    const schema = {
        name: Joi.string().required().min(3)
    };

    return Joi.validate(category, schema);
}

app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim`)
})