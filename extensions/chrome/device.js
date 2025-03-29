function getButtonUrl(baseUrl, field,) {
    return `${baseUrl}/button/${field}/press`;
}

function getInputUrl(baseUrl, field, value) {
    const inputUrl = `${baseUrl}/text/${field}/set?value=${encodeURIComponent(value)}`;
    console.log(inputUrl)
    return inputUrl;
}

function callDeviceWrite(artist, playlistOrAlbumTitle, url) {
    const baseUrl = "http://192.168.1.199"
    return Promise.all([
        fetch(getInputUrl(baseUrl, 'playlist_uri', url), {"method": "POST"}),
        fetch(getInputUrl(baseUrl, 'playlist_artist', artist), {"method": "POST"}),
        fetch(getInputUrl(baseUrl, 'playlist_name_or_album_title', playlistOrAlbumTitle), {"method": "POST"})
    ]).then(() => {
        return fetch(getButtonUrl(baseUrl, 'write_tag'), {"method": "POST"}).then(() => {
            return true
        });
    }).catch(error => {
        console.error('Error:', error);
        return fetch(getButtonUrl(baseUrl, 'cancel_writing'), {"method": "POST"}).then(() => {
            return false
        });
    });
}

export default callDeviceWrite