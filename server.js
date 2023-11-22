const http = require("http");
const path = require("path");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8080;
const publicDir = path.join(__dirname, 'public');

const requestListener = function (req, res) {
    // Obtenir le chemin complet du fichier demandé
    const filePath = path.join(publicDir, req.url === '/' ? 'views/index.html' : req.url);

    // Vérifiez si le fichier demandé existe
    fs.readFile(filePath)
        .then(contents => {
            res.setHeader("Content-Type", getContentType(filePath));
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(404);
            res.end(`File not found: ${req.url}`);
        });
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

// Fonction pour déterminer le type de contenu en fonction de l'extension du fichier
function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg'
        // Ajoutez d'autres types de contenu au besoin
        default:
            return 'application/octet-stream';
    }
}
