function getPath()
{
    const splited = window.location.href.split('/#/');
    if (splited.length > 1) return splited[1];
    return '';
}
function setPath(path)
{
    window.history.pushState("", "", "/#/" + path);
}

module.exports = {
    getPath,
    setPath
};