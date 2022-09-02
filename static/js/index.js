document.addEventListener("DOMContentLoaded", async () => {
    console.log("hello world.");

    const errorConfigElements = Array.from(document.getElementsByClassName("error-configs"));

    for (const errorConfigElm of errorConfigElements) {
        const json = await fetch(errorConfigElm.dataset.configPath).then(res => res.json());
        errorConfigElm.textContent = JSON.stringify(json, undefined, 4);
    }
    hljs.highlightAll();
});