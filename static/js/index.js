let interchangeClassSelect,
    interchangeSampleSelect,
    interchangeSampleImage,
    buttonDownloadGraphML,
    buttonDownloadNetXML,
    buttonDownloadPDF,
    buttonDownloadPNG,
    buttonDownloadXodr,
    buttonDownloadRouXMl,
    buttonDownloadSumoCgf;

document.addEventListener("DOMContentLoaded", async () => {
    console.log(mapPathData);

    interchangeClassSelect = document.getElementById("interchange-class-select");
    interchangeSampleSelect = document.getElementById("interchange-sample-select");
    interchangeSampleImage = document.getElementById("interchange-sample-image");
    buttonDownloadGraphML = document.getElementById("btn-down-graphml");
    buttonDownloadNetXML = document.getElementById("btn-down-net-xml");
    buttonDownloadPDF = document.getElementById("btn-down-pdf");
    buttonDownloadPNG = document.getElementById("btn-down-png");
    buttonDownloadXodr = document.getElementById("btn-down-xodr");
    buttonDownloadRouXMl = document.getElementById("btn-down-rou-xml");
    buttonDownloadSumoCgf = document.getElementById("btn-down-sumocfg");

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
        buttonDownloadGraphML.style.display = "none";
        buttonDownloadNetXML.style.display = "none";
        buttonDownloadPDF.style.display = "none";
        buttonDownloadPNG.style.display = "none";
        buttonDownloadXodr.style.display = "none";
        buttonDownloadRouXMl.style.display = "none";
        buttonDownloadSumoCgf.style.display = "none";
    } else {
        buttonDownloadGraphML.style.display = "inline-block";
        buttonDownloadNetXML.style.display = "inline-block";
        buttonDownloadPDF.style.display = "inline-block";
        buttonDownloadPNG.style.display = "inline-block";
        buttonDownloadXodr.style.display = "inline-block";
        buttonDownloadRouXMl.style.display = "inline-block";
        buttonDownloadSumoCgf.style.display = "inline-block";
    }

    buttonDownloadGraphML.onclick = null;
    buttonDownloadNetXML.onclick = null;
    buttonDownloadPDF.onclick = null;
    buttonDownloadPNG.onclick = null;
    buttonDownloadXodr.onclick = null;
    buttonDownloadRouXMl.onclick = null;
    buttonDownloadSumoCgf.onclick = null;
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

    const baseURL = `/static/maps/${classIndex}/${sampleID}/${sampleID}`;

    const img = document.createElement("img");
    img.src = `${baseURL}.png`;
    img.style = "width: 100%";
    interchangeSampleImage.appendChild(img);

    // set download buttons

    buttonDownloadNetXML.href = `${baseURL}.net.xml`;
    buttonDownloadNetXML.download = `class-${classIndex}-sample-${sampleID}.net.xml`;

    buttonDownloadPDF.href = `${baseURL}.pdf`;
    buttonDownloadPDF.download = `class-${classIndex}-sample-${sampleID}.pdf`;

    buttonDownloadGraphML.href = `${baseURL}.graphml`;
    buttonDownloadGraphML.download = `class-${classIndex}-sample-${sampleID}.graphml`;

    buttonDownloadPNG.href = `${baseURL}.png`;
    buttonDownloadPNG.download = `class-${classIndex}-sample-${sampleID}.png`;

    buttonDownloadSumoCgf.href = `${baseURL}.sumocfg`;
    buttonDownloadSumoCgf.download = `class-${classIndex}-sample-${sampleID}.sumocfg`;

    buttonDownloadRouXMl.href = `${baseURL}.rou.xml`;
    buttonDownloadRouXMl.download = `class-${classIndex}-sample-${sampleID}.rou.xml`;

    buttonDownloadXodr.href = `${baseURL}.xodr`;
    buttonDownloadXodr.download = `class-${classIndex}-sample-${sampleID}.xodr`;

    toggleDownloadButtonDisable(false);
}