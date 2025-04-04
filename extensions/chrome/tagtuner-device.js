import getSpotifyData from './spotify.js';
import callDeviceWrite from "./device.js";

let baseUrl = "";

document.getElementById('deviceSetButton').addEventListener('click', async () => {
    const device_url = document.getElementById("device_url_input").value;
    await chrome.storage.local.set({
        target_device: device_url
    }).then(() => {
        window.close()
    });
});

document.getElementById('clearDeviceLink').addEventListener('click', async () => {
    chrome.storage.local.remove('target_device', () => {
        console.log("Storage cleared")
        window.close()
    });
})


function showElement(el, show) {
    document.getElementById(el).style.display = show ? "block" : "none";
}

function clearAndClose(interval, error = false) {
    showElement("loading", false)
    showElement(error ? "error" : "success", true)
    if (interval) clearInterval(interval)
    setTimeout(() => {
        window.close()
    }, 1500)
}

function fetchDeviceWriting() {
    const interval = setInterval(async () => {
        await fetch(baseUrl + "/binary_sensor/_writing_", {signal: AbortSignal.timeout(300)})
            .then((res) => res.json())
            .then((res) => {
                if (res.state === "ON") {
                    console.log("Writing in progress")
                } else {
                    console.log("Writing ")
                    clearAndClose(null)
                }
            })
            .catch((err) => {
                if (err.name === "TimeoutError") {
                    console.error("Timeout: It took more than 500ms seconds to get the result!");
                    setTimeout(() => {
                        clearAndClose(interval)
                    }, 4000)
                } else {
                    clearAndClose(interval, true)
                }
            })
    }, 500)

    // Set a timeout to clear the interval after 20 seconds
    setTimeout(() => {
        clearAndClose(interval, true)
    }, 20000)
}

window.onload = async function () {
    const [currentTab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.storage.local.get('target_device', async (localStorage) => {
        if (localStorage.target_device) {
            baseUrl = localStorage.target_device;
            document.getElementById("device_url").textContent = baseUrl;
            showElement("load-div", true)
            await chrome.scripting.executeScript({
                target: {tabId: currentTab.id, allFrames: true},
                func: getSpotifyData,
                args: [currentTab.url]
            }).then(([res]) => {
                callDeviceWrite(baseUrl, res.result.artist, res.result.albumOrPlaylistTitle, res.result.url).then((success) => {
                    if (success) {
                        fetchDeviceWriting();
                    } else {
                        clearAndClose(null, true)
                    }
                })
            });
        } else {
            showElement("set-url-div", true)
        }
    });
}
