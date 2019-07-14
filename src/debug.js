export function debugQuadrantPoints (regionA, regionB, regionC, regionD) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const points = L.layerGroup([]).addTo(map)

    regionA.forEach(function(p) {
        L.circleMarker([p[1], p[0]], {
            color: 'green'
        }).addTo(points)
    })

    regionB.forEach(function(p) {
        L.circleMarker([p[1], p[0]], {
            color: 'red',
            radius: 7
        }).addTo(points)
    })

    regionC.forEach(function(p) {
        L.circleMarker([p[1], p[0]], {
            color: 'blue'
        }).addTo(points)
    })

    regionD.forEach(function(p) {
        L.circleMarker([p[1], p[0]], {
            color: 'grey',
            radius: 7
        }).addTo(points)
    })

    debugger

    points.clearLayers()

}

export function debugOutQuadrantHull(points) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const line = L.layerGroup([]).addTo(map)

    L.polyline(points.map(p => [p[1], p[0]], {color: 'red'})).addTo(line)
    debugger

    line.clearLayers()
}

export function debugStartEndHull(start, end) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const points = L.layerGroup([]).addTo(map)
    L.circleMarker([start[1], start[0]], {
        color: 'green'
    }).addTo(points)

    L.circleMarker([end[1], end[0]], {
        color: 'red'
    }).addTo(points)

    debugger

    points.clearLayers()
}
