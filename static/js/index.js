let interchangeClassSelect,
    interchangeSampleSelect,
    interchangeSampleImage,
    buttonDownloadNetXML,
    buttonDownloadPNG,
    buttonDownloadXodr;

document.addEventListener("DOMContentLoaded", async () => {
    console.log(mapPathData);

    interchangeClassSelect = document.getElementById("interchange-class-select");
    interchangeSampleSelect = document.getElementById("interchange-sample-select");
    interchangeSampleImage = document.getElementById("interchange-sample-image");
    buttonDownloadNetXML = document.getElementById("btn-down-net-xml");
    buttonDownloadPNG = document.getElementById("btn-down-png");
    buttonDownloadXodr = document.getElementById("btn-down-xodr");

    for (const [classIndex, interchangeFolders] of Object.entries(mapPathData)) {
        const option = document.createElement("option");
        option.value = classIndex;
        option.textContent = classIndex;
        interchangeClassSelect.appendChild(option);
    }

    interchangeClassSelect.onchange = onInterchangeClassSelect;
});

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