export function debugQuadrantPoints (ax, ay, bx, by, cx, cy, dx, dy) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const points = L.layerGroup([]).addTo(map)

    ax.forEach(function(p, i) {
        L.circleMarker([ay[i], ax[i]], {
            color: 'green'
        }).addTo(points)
    })

    bx.forEach(function(p, i) {
        L.circleMarker([by[i], bx[i]], {
            color: 'red',
            radius: 7
        }).addTo(points)
    })

    cx.forEach(function(p, i) {
        L.circleMarker([cy[i], cx[i]], {
            color: 'blue'
        }).addTo(points)
    })

    dx.forEach(function(p, i) {
        L.circleMarker([dy[i], dx[i]], {
            color: 'grey',
            radius: 7
        }).addTo(points)
    })

    // debugger

    // points.clearLayers()

}

export function debugOutQuadrantHull(points) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const line = L.layerGroup([]).addTo(map)

    L.polyline(points.map(p => [p[1], p[0]], {color: 'red'})).addTo(line)
    debugger

    line.clearLayers()
}

export function debugStartEndHull(startx, starty, endx, endy) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const points = L.layerGroup([]).addTo(map)
    L.circleMarker([starty, startx], {
        color: 'green'
    }).addTo(points)

    L.circleMarker([endy, endx], {
        color: 'red'
    }).addTo(points)

    debugger

    points.clearLayers()
}
