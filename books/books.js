const express = require("express")
const Joi = require("joi")
const router = express  .Router()

let categories = [
    { id: 1, name: "dasturlash" },
    { id: 2, name: "3D model" },
    { id: 3, name: "Trading" }
]

router.get("/", (req, res) => {
    res.send(categories)
    console.log("category olindi");
})
router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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
router.get("/:id", (req, res) => {
    let category = categories.find(i => i.id === parseInt(req.params.id))
    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');
    res.send(category)
})
router.delete("/:id", (req, res) => {
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

module.exports = router;