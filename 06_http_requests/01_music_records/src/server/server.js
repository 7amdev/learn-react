const express = require('express');
const body_parser = require('body-parser');
const { generate_uid } = require('../Utils');

let records = [
    {
        id: 1,
        uid: generate_uid(),
        name: 'Album Name #1', 
        artist_name: 'Artist Name #1',
        description: 'Alboum description #1'
    },
    {
        id: 2,
        uid: generate_uid(),
        name: 'Album Name #2', 
        artist_name: 'Artist Name #2',
        description: 'Alboum description #2'
    },
    {
        id: 3,
        uid: generate_uid(),
        name: 'Album Name #3', 
        artist_name: 'Artist Name #3',
        description: 'Alboum description #3'
    }
];

const PORT = 5000;
const app = express();

app.use(body_parser.json());

app.get('/api/records', function (req, res) {
    res.send(records);
});

app.post('/api/records', function (req, res) {
    let total_records = records.reduce(function (acc, item) {
        return acc += 1
    }, 0);

    let new_record = {
        id: total_records + 1,
        uid: generate_uid(),
        ...req.body
    };

    records.push(new_record);

    res.status(201).send(new_record);
});

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
});
