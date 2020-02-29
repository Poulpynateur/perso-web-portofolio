const ns = 'http://www.w3.org/2000/svg';
const svgSize = {
    x: 1000,
    y: 1000
};
const topOffset = svgSize.y/5;

let svg;

function createSvgContainer(parentId) {
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'preserveAspectRatio', 'none');
    svg.setAttributeNS(null, 'height', '100%');
    svg.setAttributeNS(null, 'width', '100%');
    svg.setAttributeNS(null, 'viewBox', `0 0 ${svgSize.x} ${svgSize.y}`);
    document.getElementById(parentId).appendChild(svg);

    return svg;
}

function createPoint(polygon, x, y) {
    const point = svg.createSVGPoint();
    point.x = x; point.y = y;
    polygon.points.appendItem(point);
}
function createTopPolygon(top) {
    const polygon = document.createElementNS(ns, 'polygon');
    createPoint(polygon, 0, 0);
    createPoint(polygon, 0, top);
    createPoint(polygon, svgSize.x, top - topOffset);
    createPoint(polygon, svgSize.x, 0);
    return polygon;
}

function initSvg(){
    svg = createSvgContainer('svg-background');

    svg.appendChild(createTopPolygon(topOffset*3));
};

function scrollManagement() {

}

export { initSvg, scrollManagement };