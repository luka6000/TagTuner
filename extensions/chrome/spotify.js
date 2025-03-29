function getSpotifyData(tabUrl) {
    const data = {albumOrPlaylistTitle: '', artist: '', url: ''};
    data.url = tabUrl + "?si=JKmAp_qJS-iF2iUZ6hUrRg";
    data.albumOrPlaylistTitle = document.querySelectorAll('h1')?.[0]?.textContent ||
        document.querySelector('title')?.text || '';
    data.artist = document.querySelector('[data-testid="creator-link"]')?.textContent || '';;
    return data;
}
export default getSpotifyData