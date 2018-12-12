var {Docker} = require('node-docker-api');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

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
        var containerArray = [];

        docker.container.list({id:"6ed12813a280"}).then(containers => {
            for(var i = 0; i < containers.length; i++) {
                var tempContainer = {};
                tempContainer.name = containers[i].data.Names[0];
                tempContainer.id = (""+containers[i].data.Id).substring(0, 12);
                //tempContainer.image = containers[i].data.Image;
                tempContainer.status = containers[i].data.Status;
                tempContainer.image = containers[i].data.Image;
                containerArray.push(tempContainer);
                console.log(containers[i].data.Id);
            }
            console.log(containerArray);
            response.send(JSON.stringify({"containers": containerArray}));
        });
        
        //response.send("Got a GET request at /api/containers");

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

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
