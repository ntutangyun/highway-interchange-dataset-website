const fs = require("fs");
const path = require("path");

const classDirs = fs.readdirSync("./maps").sort((a, b) => (+a) - (+b));

const mapPathData = {};

console.log(classDirs);

// const rootURL = "https://ntutangyun.github.io/highway-interchange-dataset-website";

classDirs.forEach(classDir => {
    const classDirPath = path.join("./maps", classDir);

    mapPathData[classDir] = fs.readdirSync(classDirPath);
    // ({
    //     classId: classDir,
    //
    //     // mapFolders: mapFolders.map(mapFolder => {
    //     // return {
    //     //     mapName: mapFolder,
    //     //     pdf: `${classDir}/${mapFolder}/${mapFolder}.pdf`,
    //     //     graphml: `${classDir}/${mapFolder}/${mapFolder}.graphml`,
    //     //     sumoNet: `${classDir}/${mapFolder}/${mapFolder}.net.xml`,
    //     //     png: `${classDir}/${mapFolder}/${mapFolder}.png`,
    //     //     sumoRouting: `${classDir}/${mapFolder}/${mapFolder}.rou.xml`,
    //     //     sumoConfig: `${classDir}/${mapFolder}/${mapFolder}.sumocfg`,
    //     //     openDrive: `${classDir}/${mapFolder}/${mapFolder}.xodr`,
    //     // };
    //     // })
    // });
});

fs.writeFileSync(path.join(__dirname, "mapPathData.json"), JSON.stringify(mapPathData));
