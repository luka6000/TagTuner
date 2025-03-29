/**
 * This file is used to extract the album or playlist title and artist from a URL.
 * You can implement the logic to extract the data from the URL here.
 * Object returned should contain the following properties:
 * - albumOrPlaylistTitle
 * - artist
 * - url
 */

/**
 * @description This function checks if the URL is a valid playlist or album and extracts the relevant data.
 * It returns an object with the album or playlist title, artist, and URL.
 * @param tabUrl
 * @returns {{error: string}|{albumOrPlaylistTitle: string, artist: string, url: string}}
 */
function getPlaylistOrAlbum(tabUrl) {
    const url = new URL(tabUrl);
    const host = url.hostname;
    const pathname = url.pathname;

    if (host === 'open.spotify.com') {
        if (pathname.startsWith('/playlist/') || pathname.startsWith('/album/')) {
            return {
                albumOrPlaylistTitle: document.querySelectorAll('h1')?.[0]?.textContent ||
                    document.querySelector('title')?.text || '',
                artist: document.querySelector('[data-testid="creator-link"]')?.textContent || '',
                url: tabUrl + "?si=JKmAp_qJS-iF2iUZ6hUrRg"
            };
        }
    }

    alert("Current tab is not a valid playlist or album URL.");
    return {error: 'Not a valid playlist or album'};
}

export default getPlaylistOrAlbum;