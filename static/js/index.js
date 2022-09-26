let interchangeClassSelect,
    interchangeSampleSelect,
    interchangeSampleImage,
    buttonDownloadNetXML,
    buttonDownloadPNG,
    buttonDownloadXodr,
    sampleOriginContainer,
    sampleMapContainer,
    sampleTopologyContainer,
    sampleSumoContainer;

document.addEventListener("DOMContentLoaded", async () => {
    console.log(mapPathData);

    interchangeClassSelect = document.getElementById("interchange-class-select");
    interchangeSampleSelect = document.getElementById("interchange-sample-select");
    interchangeSampleImage = document.getElementById("interchange-sample-image");
    buttonDownloadNetXML = document.getElementById("btn-down-net-xml");
    buttonDownloadPNG = document.getElementById("btn-down-png");
    buttonDownloadXodr = document.getElementById("btn-down-xodr");

    sampleOriginContainer = document.getElementById("sample-origin-container");
    sampleMapContainer = document.getElementById("sample-map-container");
    sampleTopologyContainer = document.getElementById("sample-topology-container");
    sampleSumoContainer = document.getElementById("sample-sumo-container");

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

function toggleDownloadButtonDisable(disabled) {
    if (disabled) {
        buttonDownloadNetXML.style.display = "none";
        buttonDownloadPNG.style.display = "none";
        buttonDownloadXodr.style.display = "none";
    } else {
        buttonDownloadNetXML.style.display = "inline-block";
        buttonDownloadPNG.style.display = "inline-block";
        buttonDownloadXodr.style.display = "inline-block";
    }

    buttonDownloadNetXML.onclick = null;
    buttonDownloadPNG.onclick = null;
    buttonDownloadXodr.onclick = null;
}

function onInterchangeClassSelect(e) {
    interchangeSampleSelect.innerHTML = null;

    const defaultSampleOption = document.createElement("option");
    defaultSampleOption.value = "0";
    defaultSampleOption.textContent = "-";
    interchangeSampleSelect.appendChild(defaultSampleOption);

    interchangeSampleSelect.disabled = true;
    toggleDownloadButtonDisable(true);
    interchangeSampleSelect.onchange = null;

    const classIndex = e.target.value;
    if (classIndex === "0") {
        return;
    }

    const classMaps = mapPathData[classIndex];

    for (const [sampleIndex, sampleFolder] of classMaps.entries()) {
        const option = document.createElement("option");
        option.value = sampleIndex;
        option.textContent = sampleIndex + 1;
        interchangeSampleSelect.appendChild(option);
    }
    interchangeSampleSelect.onchange = function (e) {
        onInterchangeSampleSelect(classIndex, e.target.value);
    };
    interchangeSampleSelect.disabled = false;
}

function onInterchangeSampleSelect(classIndex, sampleIndex) {
    const sampleID = mapPathData[classIndex][sampleIndex];
    toggleDownloadButtonDisable(true);

    interchangeSampleImage.innerHTML = null;

    // const baseURL = `static/maps/${classIndex}/${sampleID}/${sampleID}`;
    const baseURL = `https://github.com/ntutangyun/highway-interchange-dataset-website/raw/main/static/4_map/${classIndex}/${sampleID}/${sampleID}`;

    const img = document.createElement("img");
    img.src = `${baseURL}.png`;
    img.style = "width: 100%";
    interchangeSampleImage.appendChild(img);

    // set download buttons

    buttonDownloadNetXML.href = `${baseURL}.net.xml`;
    buttonDownloadNetXML.download = `class-${classIndex}-sample-${sampleID}.net.xml`;

    buttonDownloadPNG.href = `${baseURL}.png`;
    buttonDownloadPNG.download = `class-${classIndex}-sample-${sampleID}.png`;

    buttonDownloadXodr.href = `${baseURL}.xodr`;
    buttonDownloadXodr.download = `class-${classIndex}-sample-${sampleID}.xodr`;

    toggleDownloadButtonDisable(false);
}