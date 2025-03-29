document.getElementById('deviceSetButton').addEventListener('click', async () => {
    const device_url = document.getElementById("device_url").value;
    await chrome.storage.local.set({
        target_ha: device_url
    }).then(async () => {
        await chrome.action.setPopup({popup: ''});
    }).then(() => {
        window.close()
    });
});

