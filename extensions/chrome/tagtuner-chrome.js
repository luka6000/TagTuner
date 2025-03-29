function fillInputs(artist, title, url) {
    // Fill the form fields
    console.log("fill")
    document.getElementById('artist').value = artist;
    document.getElementById('title').value = title;
    document.getElementById('url').value = url;
}

function fillHa(artist, title, url) {
    // Fill the form fields
    const inputs = [];
    function findElements(root) {
        for (const element of root.querySelectorAll("*")) {
            if (element.shadowRoot) {
                inputs.push(...element.shadowRoot.querySelectorAll('input'));
                findElements(element.shadowRoot);
            }
        }
    }
    findElements(document);

    console.log('Found inputs for filling:', inputs.length);

    if (inputs.length >= 3) {
        // Fill the input fields
        inputs[0].value = artist;
        inputs[1].value = title;
        inputs[2].value = url;

        // Trigger input events
        inputs.forEach(input => {
            if (input) {
                input.dispatchEvent(new Event('input', {bubbles: true}));
                console.log('Filled input with saved data:', input.value);
            }
        });
    } else {
        console.error('Not enough input fields found for filling');
    }
    /* TODO enable auto click on write button with a configuration part
     * Not activated by default to be able to edit informations if needed

    function findWriteBtn(root) {
        for (const element of root.querySelectorAll("*")) {
            if (element.shadowRoot) {
                if (element.shadowRoot.querySelectorAll('div[title="Write Tag"]').length > 0){
                    element.querySelector("mwc-button").click();
                    console.log("Writing...")
                    break;
                }
                findWriteBtn(element.shadowRoot);
            }
        }
    }
    findWriteBtn(document)
    */
}

document.getElementById('scrapeButton').addEventListener('click', async () => {
    const data = {title: '', artist: '', url: ''};
    try {
        // Get current tab information
        const [currentTab] = await chrome.tabs.query({active: true, currentWindow: true});
        data.url = currentTab.url;

        // Extract album title from the page
        const [{result}] = await chrome.scripting.executeScript({
            target: {tabId: currentTab.id},
            func: () => {
                // Try to find album title in common locations
                const albumOrPlaylistTitle = document.querySelectorAll('h1')?.[0]?.textContent ||
                    document.querySelector('title')?.text || '';
                const albumOrPlaylistArtist = document.querySelector('[data-testid="creator-link"]')?.textContent || '';
                return {
                    albumOrPlaylistTitle: albumOrPlaylistTitle.trim(),
                    albumOrPlaylistArtist: albumOrPlaylistArtist.trim()
                };
            },
        });

        data.title = result.albumOrPlaylistTitle;
        data.artist = result.albumOrPlaylistArtist;

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    }

    //TODO: being able to configure device url
    const targetUrl = "http://localhost:3000/"
    let existingTab = await chrome.tabs.query({url: targetUrl});

    if (existingTab.length === 0) {
        existingTab = await chrome.tabs.create({url: targetUrl, active: false});
    } else {
        existingTab = existingTab[0];
    }

    // Execute script to fill inputs in current tab
    await chrome.scripting.executeScript({
        target: {tabId: existingTab.id},
        func: fillInputs,
        args: [data.artist, data.title, data.url]
    }).then(async () => {
        await chrome.tabs.update(existingTab.id, {active: true});
    });

});

