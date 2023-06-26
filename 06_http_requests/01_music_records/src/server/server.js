const express = require('express');
const body_parser = require('body-parser');
const bodyParser = require('body-parser');

let records = [
    {
        id: 1,
        name: 'Album Name #1', 
        artist_name: 'Artist Name #1',
        description: 'Alboum description #1'
    },
    {
        id: 2,
        name: 'Album Name #2', 
        artist_name: 'Artist Name #2',
        description: 'Alboum description #2'
    },
    {
        id: 3,
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

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
});
