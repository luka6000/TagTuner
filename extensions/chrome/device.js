function getButtonUrl(baseUrl, field,) {
    return `${baseUrl}/button/${field}/press`;
}

function getInputUrl(baseUrl, field, value) {
    return `${baseUrl}/text/${field}/set?value=${encodeURIComponent(value)}`;
}

async function callDeviceWrite(baseUrl, artist, playlistOrAlbumTitle, url) {
    try {
        await fetch(getInputUrl(baseUrl, 'playlist_uri', url), {"method": "POST"});
        await fetch(getInputUrl(baseUrl, 'playlist_artist', artist), {"method": "POST"});
        await fetch(getInputUrl(baseUrl, 'playlist_name_or_album_title', playlistOrAlbumTitle), {"method": "POST"});
        await fetch(getButtonUrl(baseUrl, 'write_tag'), {"method": "POST"});
        return true;
    } catch (error) {
        console.log("Error in call device write:", error);
        return false;
    }
}

export default callDeviceWrite