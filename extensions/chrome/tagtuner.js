import getSpotifyData from './spotify.js';
import callDeviceWrite from "./device.js";

chrome.contextMenus.create({
    id: "device_url",
    title: "Clear device URL",
    contexts: ["action"],
});

chrome.contextMenus.onClicked.addListener(async (tab) => {
    chrome.storage.local.remove('target_ha', () => {
        console.log("Storage cleared")
        chrome.action.openPopup({popup: 'tagtuner-device.html'});
    });
});

chrome.action.onClicked.addListener(async (tab) => {
    /*
    //TODO: to be configurable.
    chrome.storage.local.get('target_ha', (data) => {
        if (data.target_ha) {
            targetUrl = data.target_ha;
        } else {
            console.log('return', data)
            chrome.action.openPopup({popup: 'tagtuner-device.html'});
        }
    }).then((targetUrl) => {

    });
    if (!targetUrl) {
        return;
    }*/
    chrome.scripting.executeScript({
        target: {tabId: tab.id, allFrames: true},
        func: getSpotifyData,
        args: [tab.url]
    }).then(([res]) => {
        console.log(res)
        callDeviceWrite(res.result.artist, res.result.albumOrPlaylistTitle, res.result.url)
    });
});