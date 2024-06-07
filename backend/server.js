import express from "express"

const app = express()
const port = 5000

app.get("/", (req, res) => {
    res.send("chris will buy landrover defender 110")
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})