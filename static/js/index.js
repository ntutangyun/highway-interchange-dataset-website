let interchangeClassSelect, interchangeSampleSelect, interchangeSampleImage;

document.addEventListener("DOMContentLoaded", async () => {
    console.log(mapPathData);

    interchangeClassSelect = document.getElementById("interchange-class-select");
    interchangeSampleSelect = document.getElementById("interchange-sample-select");
    interchangeSampleImage = document.getElementById("interchange-sample-image");

    for (const [classIndex, interchangeFolders] of Object.entries(mapPathData)) {
        const option = document.createElement("option");
        option.value = classIndex;
        option.textContent = classIndex;
        interchangeClassSelect.appendChild(option);
    }

    interchangeClassSelect.onchange = onInterchangeClassSelect;
});

function onInterchangeClassSelect(e) {
    interchangeSampleSelect.innerHTML = null;
    interchangeSampleSelect.disabled = true;
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
    console.log(mapPathData[classIndex][sampleIndex]);

    interchangeSampleImage.innerHTML = null;

    const img = document.createElement("img");
    img.src = `https://ntutangyun.github.io/highway-interchange-dataset-website/static/maps/${classIndex}/${sampleIndex}/${sampleIndex}.png`;
    interchangeSampleImage.appendChild(img);
}