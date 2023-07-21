const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5050;

const users = [
    { id: '12345678902000', data: { user: { id: '12345678902000', name: 'Username-1' }, attributes: [{ key: 'level', value: '1' }] }},
    { id: '12345678902001', data: { user: { id: '12345678902001', name: 'example-name' }, attributes: [{ key: 'level', value: '1' }] } },
    { id: '12345678902002', data: { user: { id: '12345678902002' }, attributes: [{ key: 'level', value: '10' }] } },
    { id: '12345678902003', data: { user: { id: '12345678902003' }, attributes: [{ key: 'level', value: '10' }] } },
    { id: '12345678902004', data: { user: { id: '12345678902004' }, attributes: [{ key: 'level', value: '10' }] }},
    { id: '12345678902005', data: undefined },
    { id: '12345678902006', data: {} },
    { id: '12345678902007', data: { user: { id: '12345678902007' } } },
    { id: 'id-from-webhook', data: { user: { id: '12345678902010', name: 'name-from-webhook' } } },
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
        res.status(201).send(foundUser.data)
    } else {
        res.status(404).send('User not found')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})