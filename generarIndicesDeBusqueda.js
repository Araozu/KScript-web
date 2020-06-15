const fs = require("fs");

fs.stat("./public/textos/es/docs/v.0.0.1/", (err, stats) => {
    
});

fs.open("./public/search-index.json", "w", (err, fid) => {
    if (err) {
        console.error("Error al abrir el archivo.");
        console.error(err);
        process.exit(1);
    }

    

    fs.closeSync(fid);
});

