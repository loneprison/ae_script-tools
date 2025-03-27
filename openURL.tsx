/**
 * 在系统默认浏览器中打开指定的网页。
 *
 * @param {string} url - 要打开的网页链接。
 * @returns {void}
 */
function openURL(url) {
    if (!url || typeof url !== "string") {
        alert("Invalid URL.");
        return;
    }

    if (Folder.fs === "Windows") {
        const cmdCommand = 'cmd.exe /c start "" "' + url + '"';
        system.callSystem(cmdCommand);
    } else if (Folder.fs === "Macintosh") {
        const openCommand = 'open "' + url + '"';
        system.callSystem(openCommand);
    } else {
        alert("Unsupported operating system.");
    }
}

export default openURL;
