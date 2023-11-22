const http = require("http");

const host = 'localhost';
const port = 8080;



const evenement = JSON.stringify([
    { event: "Don du Sang", description:"don du sang en partenariat avec la branche Aixoise", mois : "", annee: 0 }
]);

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case "/evenement":
            res.writeHead(200);
            res.end(evenement);
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found"}));
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

