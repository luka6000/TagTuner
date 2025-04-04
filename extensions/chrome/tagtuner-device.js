import getSpotifyData from './spotify.js';
import callDeviceWrite from "./device.js";

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

function clearAndClose(interval) {
    showElement("loading", false)
    clearInterval(interval)
    setTimeout(() => {
        window.close()
    }, 1500)
}

let baseUrl = "";
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
                        const i = setInterval(async () => {
                            await fetch(baseUrl + "/binary_sensor/_writing_", { signal: AbortSignal.timeout(1000) })
                                .catch((err) => {
                                    if (err.name === "TimeoutError") {
                                        console.error("Timeout: It took more than 5 seconds to get the result!");
                                        setTimeout(() => {
                                            showElement("success", true);
                                            clearAndClose(i)
                                        }, 4000)
                                    } else {
                                        clearAndClose(i)
                                        showElement("error", true)
                                        console.error('Error:', error);
                                    }
                                })
                        }, 500)
                        setTimeout(() => {
                            clearAndClose(i)
                        }, 20000)
                    } else {
                        showElement("loading", false)
                        showElement("error", true)

                    }
                })
            });
        } else {
            showElement("set-url-div", true)
        }
    });
}
