var docker = require('node-docker-api');
var express = require('express');
var cors = require('cors');
var router = express.Router();
var app = express();

app.use(express.static(__dirname + '/www/'));
app.use(cors());
app.use(express.json());

router.use(function (request, response, next) {
    next();
});


router.route('/containers')
    .post(function (request, response) {
        response.send("Got a POST request at /api/containers with " + request.body);
    })
    .get(function (request, response) {
        response.send("Got a GET request at /api/containers");
    });


router.route('/containers/:container_id')
    .get(function (request, response) {
        response.send("Got a GET request at /api/containers/" + request.params.container_id);
    })
    .delete(
        function (request, response) {
            response.send("Got a DELETE request at /api/containers/" + request.params.container_id);
        },
        function (err, obj) {
            response.send("Something went wrong with DELETE request at /api/containers/" + request.params.container_id);
        }
    );


app.use('/api', router);

app.listen(8000, 'www.robatsky-dev.de', () => {
    console.log("Server running on port 8000");
});