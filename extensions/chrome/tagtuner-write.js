import getPlaylistOrAlbum from './music-provider.js';
import callDeviceWrite from "./device.js";

let baseUrl = "";

// Set the device link
document.getElementById('deviceSetButton').addEventListener('click', async () => {
    const device_url = document.getElementById("device_url_input").value;
    await chrome.storage.local.set({
        target_device: device_url
    }).then(() => {
        window.close()
    });
});

//Clear the device link
document.getElementById('clearDeviceLink').addEventListener('click', async () => {
    chrome.storage.local.remove('target_device', () => {
        console.log("Storage cleared")
        window.close()
    });
})

// Show or hide elements
function showElementById(el, show) {
    document.getElementById(el).style.display = show ? "block" : "none";
}

// Used to clear the interval and close the popup
function clearAndClose(interval, error = false) {
    showElementById("loading", false)
    showElementById(error ? "error" : "success", true)
    if (interval) clearInterval(interval)
    setTimeout(() => {
        window.close()
    }, 3000)
}

function fetchDeviceWriting() {
    const interval = setInterval(async () => {
        await fetch(baseUrl + "/binary_sensor/_writing_", {signal: AbortSignal.timeout(400)})
            .then((response) => response.json())
            .then((sensor) => {
                if (sensor.state !== "ON") {
                    clearAndClose(null)
                }
            })
            .catch((err) => {
                if (err.name === "TimeoutError") {
                    console.log("Device is busy.");
                } else {
                    clearAndClose(interval, true)
                }
            })
    }, 500)

    // Set a timeout to clear the interval after 20 seconds if no tag was placed
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
            showElementById("load-div", true)
            await chrome.scripting.executeScript({
                target: {tabId: currentTab.id, allFrames: true},
                func: getPlaylistOrAlbum,
                args: [currentTab.url]
            }).then(([res]) => {
                console.log(res)
                callDeviceWrite(baseUrl, res.result.artist, res.result.albumOrPlaylistTitle, res.result.url).then((success) => {
                    if (success) {
                        showElementById('loading', true)
                        document.getElementById("artist").textContent = res.result.artist;
                        document.getElementById("playlist").textContent = res.result.albumOrPlaylistTitle;
                        const urlSpan = document.getElementById("url");
                        urlSpan.title = res.result.url;
                        urlSpan.textContent = res.result.url.substring(0, 40) + "...";
                        fetchDeviceWriting();
                    } else {
                        clearAndClose(null, true)
                    }
                })
            });
        } else {
            showElementById("set-url-div", true)
        }
    });
}
