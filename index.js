const express = require("express")
const app = express()
const category = require("./books/books")
app.use(express.json())
app.use("/category", category)
const port = process.env.port || 2006


app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim`)
})