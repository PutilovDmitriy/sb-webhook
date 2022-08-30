const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5500

const users = [
    { id: '12345678902000', level: 1 },
    { id: '12345678902001', level: 1 },
    { id: '12345678902002', level: 10 },
    { id: '12345678902003', level: 10 },
    { id: '12345678902004', level: 10}
]

app.use(bodyParser.json())

app.post('/api/validate', (req, res) => {
    const { user } = req.body;
    if (!user) {
        res.status(400).end('Bad request');
    }
    const { id } = user;
    const foundUser = users.find((u) => u.id === id);
    if (foundUser) {
        res.status(201).send({ user: { id }, attributes: [{ key: 'level', value: foundUser.level }] })
    } else {
        res.status(404).send('User not found')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})