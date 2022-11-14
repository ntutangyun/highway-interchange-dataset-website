let interchangeClassSelect, interchangeSampleImage, sampleOriginContainer, sampleMapContainer, sampleTopologyContainer,
    sampleSumoContainer, classSampleContainer, experimentResultContainer, datasetContainer;

document.addEventListener("DOMContentLoaded", async () => {
    console.log(mapPathData);

    interchangeClassSelect = document.getElementById("interchange-class-select");
    interchangeSampleImage = document.getElementById("interchange-sample-image");
    classSampleContainer = document.getElementById("class-sample-container");

    sampleOriginContainer = document.getElementById("sample-origin-container");
    sampleMapContainer = document.getElementById("sample-map-container");
    sampleTopologyContainer = document.getElementById("sample-topology-container");
    sampleSumoContainer = document.getElementById("sample-sumo-container");

    experimentResultContainer = document.getElementById("experiment-result-container");
    datasetContainer = document.getElementById("dataset-container");

    for (const [classIndex, interchangeFolders] of Object.entries(mapPathData)) {
        const option = document.createElement("option");
        option.value = classIndex;
        option.textContent = classIndex;
        interchangeClassSelect.appendChild(option);
    }

    interchangeClassSelect.onchange = onInterchangeClassSelect;

    for (let sampleIdx = 1; sampleIdx <= 5; sampleIdx++) {
        const buttonRadio = document.getElementById(`btnradio${sampleIdx}`);
        buttonRadio.onclick = () => {
            onSampleButtonRadioClick(sampleIdx);
        };
    }

    document.getElementById(`btnradio1`).click();

    document.getElementById("btn-experiment-result").onclick = () => {
        experimentResultContainer.style.display = "block";
        datasetContainer.style.display = "none";
    };

    document.getElementById("btn-interchange-dataset").onclick = () => {
        experimentResultContainer.style.display = "none";
        datasetContainer.style.display = "block";
    };

    document.getElementById("btn-experiment-result").click();
});

function onSampleButtonRadioClick(sampleIdx) {
    console.log(sampleIdx);
    sampleOriginContainer.innerHTML = null;
    sampleMapContainer.innerHTML = null;
    sampleTopologyContainer.innerHTML = null;
    sampleSumoContainer.innerHTML = null;

    const originImg = document.createElement("img");
    originImg.src = `https://github.com/ntutangyun/highway-interchange-dataset-website/raw/main/static/2_table/example_${sampleIdx}/origin_${sampleIdx}.png`;
    originImg.className = "w-100";
    const originImgDesc = document.createElement("p");
    originImgDesc.className = "text-center";
    originImgDesc.textContent = "Real Interchange";
    sampleOriginContainer.appendChild(originImg);
    sampleOriginContainer.appendChild(originImgDesc);

    const topologyImg = document.createElement("img");
    topologyImg.src = `https://github.com/ntutangyun/highway-interchange-dataset-website/raw/main/static/2_table/example_${sampleIdx}/topology_${sampleIdx}.png`;
    topologyImg.className = "w-100";
    const topologyImgDesc = document.createElement("p");
    topologyImgDesc.className = "text-center";
    topologyImgDesc.textContent = "Topology Model";
    sampleTopologyContainer.appendChild(topologyImg);
    sampleTopologyContainer.appendChild(topologyImgDesc);

    const mapImg = document.createElement("img");
    mapImg.src = `https://github.com/ntutangyun/highway-interchange-dataset-website/raw/main/static/2_table/example_${sampleIdx}/map_${sampleIdx}.png`;
    mapImg.className = "w-100";
    const mapImgDesc = document.createElement("p");
    mapImgDesc.className = "text-center";
    mapImgDesc.textContent = "Topology Visualization";
    sampleMapContainer.appendChild(mapImg);
    sampleMapContainer.appendChild(mapImgDesc);

    const sumoImg = document.createElement("img");
    sumoImg.src = `https://github.com/ntutangyun/highway-interchange-dataset-website/raw/main/static/2_table/example_${sampleIdx}/sumo_${sampleIdx}.png`;
    sumoImg.className = "w-100";
    const sumoImgDesc = document.createElement("p");
    sumoImgDesc.className = "text-center";
    sumoImgDesc.textContent = "Sumo Map";
    sampleSumoContainer.appendChild(sumoImg);
    sampleSumoContainer.appendChild(sumoImgDesc);
}

function onInterchangeClassSelect(e) {
    classSampleContainer.innerHTML = null;

    const classIndex = e.target.value;
    if (classIndex === "0") {
        return;
    }

    const classMaps = mapPathData[classIndex];

    for (const [sampleIndex, sampleFolder] of classMaps.entries()) {
        const sampleID = mapPathData[classIndex][sampleIndex];

        const sampleContainer = document.createElement("div");
        sampleContainer.className = "col-3";

        const baseURL = `https://github.com/ntutangyun/highway-interchange-dataset-website/raw/main/static/4_map/${classIndex}/${sampleID}/${sampleID}`;

        const sampleImg = document.createElement("img");
        sampleImg.src = `${baseURL}.png`;
        sampleImg.className = "w-100";
        sampleContainer.appendChild(sampleImg);

        const sampleImgDesc = document.createElement("p");
        // sampleImgDesc.textContent = sampleFolder;
        sampleImgDesc.textContent = sampleIndex;
        sampleImgDesc.className = "text-center mb-0";

        const downloadButtonContainer = document.createElement("div");
        downloadButtonContainer.className = "d-flex justify-content-center align-items-center";

        // download options
        const buttonDownloadNetXML = document.createElement("a");
        buttonDownloadNetXML.className = "btn btn-outline-dark m-1";
        buttonDownloadNetXML.href = `${baseURL}.net.xml`;
        buttonDownloadNetXML.textContent = ".net.xml";
        buttonDownloadNetXML.download = `class-${classIndex}-sample-${sampleID}.net.xml`;

        const buttonDownloadPNG = document.createElement("a");
        buttonDownloadPNG.className = "btn btn-outline-dark m-1";
        buttonDownloadPNG.href = `${baseURL}.png`;
        buttonDownloadPNG.textContent = "png";
        buttonDownloadPNG.download = `class-${classIndex}-sample-${sampleID}.png`;

        const buttonDownloadXodr = document.createElement("a");
        buttonDownloadXodr.className = "btn btn-outline-dark m-1";
        buttonDownloadXodr.href = `${baseURL}.xodr`;
        buttonDownloadXodr.textContent = "OpenDrive";
        buttonDownloadXodr.download = `class-${classIndex}-sample-${sampleID}.xodr`;

        downloadButtonContainer.appendChild(sampleImgDesc);
        downloadButtonContainer.appendChild(buttonDownloadNetXML);
        downloadButtonContainer.appendChild(buttonDownloadPNG);
        downloadButtonContainer.appendChild(buttonDownloadXodr);
        sampleContainer.appendChild(downloadButtonContainer);

        classSampleContainer.appendChild(sampleContainer);
    }
}