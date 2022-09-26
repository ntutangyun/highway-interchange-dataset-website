const fs = require("fs");
const path = require("path");

const classDirs = fs.readdirSync("./4_map").sort((a, b) => (+a) - (+b));

const mapPathData = {};

classDirs.forEach(classDir => {
    const classDirPath = path.join("./4_map", classDir);
    mapPathData[classDir] = fs.readdirSync(classDirPath).sort((a, b) => (+a) - (+b));
});

fs.writeFileSync(path.join(__dirname, "mapPathData.json"), JSON.stringify(mapPathData));
