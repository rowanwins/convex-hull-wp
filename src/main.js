import {debugQuadrantPoints, debugOutQuadrantHull, debugStartEndHull} from './debug'

export default function computeHull (points) {
    const numPoints = points.length

    let minx = Infinity
    let y_minx = null

    let maxx = -Infinity
    let y_maxx = null

    let maxy = -Infinity
    let x_maxy = null

    let miny = Infinity
    let x_miny = null

    for (let i = 0; i < numPoints; i++) {
        if (points[i][0] < minx) {
            minx = points[i][0]
            y_minx = points[i][1]
        }

        if (points[i][0] > maxx) {
            maxx = points[i][0]
            y_maxx = points[i][1]
        }

        if (points[i][1] < miny) {
            miny = points[i][1]
            x_miny = points[i][0]
        }

        if (points[i][1] > maxy) {
            maxy = points[i][1]
            x_maxy = points[i][0]
        }
    }

    const ax = []
    const ay = []

    const bx = []
    const by = []

    const cx = []
    const cy = []

    const dx = []
    const dy = []
    for (let i = 0; i < numPoints; i++) {
        if ((points[i][0] <= x_maxy && points[i][1] >= y_minx)) {
            ax.push(points[i][0])
            ay.push(points[i][1])
        }

        if ((points[i][0] >= x_maxy && points[i][1] >= y_maxx)) {
            bx.push(points[i][0])
            by.push(points[i][1])
        }

        if ((points[i][0] >= x_miny && points[i][1] <= y_maxx)) {
            cx.push(points[i][0])
            cy.push(points[i][1])
        }

        if ((points[i][0] <= x_miny && points[i][1] <= y_minx)) {
            dx.push(points[i][0])
            dy.push(points[i][1])
        }
    }
    const out = []
    // debugQuadrantPoints(ax, ay, bx, by, cx, cy, dx, dy)
    processQuadrant1(minx, y_minx, x_maxy, maxy, ax.length, ax, ay, out)
    // debugOutQuadrantHull(q1)
    // console.log(q1)
    processQuadrant2(x_maxy, maxy, maxx, y_maxx, bx.length, bx, by, out)
    // debugOutQuadrantHull(q2)
    // console.log(q2)
    processQuadrant3(maxx, y_maxx, x_miny, miny, cx.length, cx, cy, out)
    processQuadrant4(x_miny, miny, minx, y_minx, dx.length, dx, dy, out)

    return out
}


function processQuadrant1(startx, starty, endx, endy, numPoints, x, y, out) {

    // debugStartEndHull(startx, starty, endx, endy)
    let hullx, hully, maxm, dfy, mindfy, dfx, mindfx, found
    let maxi = 0
    hullx = startx
    hully = starty

    do {
        out.push([hullx, hully])

        maxm = 0;
        mindfy = endy - starty
        mindfx = endx - startx

        found = false
        for (let i = 0; i < numPoints; i++) {
            if ((y[i] >= hully) && (x[i] >= hullx)) {
                if (x[i] === hullx) {
                    if (y[i] !== hully) {
                        dfy = y[i] - hully
                        if (mindfy >= dfy) {
                            mindfy = dfy
                            maxi = i
                            found = true
                        }
                    }
                } else if (!found) {
                    const m = (y[i] - hully) / (x[i] - hullx)
                    if (maxm < m) {
                        mindfx = x[i] - hullx
                        maxm = m
                        maxi = i
                    } else if (maxm === m) {
                        dfx = x[i] - hullx
                        if (mindfx >= dfx) {
                            mindfx = dfx
                            maxi = i
                        }
                    }
                }
            }
        }
        hullx = x[maxi]
        hully = y[maxi]
    } while (!((hullx === endx) && (hully === endy)));
    out.push([hullx, hully])
    return out
}

function processQuadrant2(startx, starty, endx, endy, numPoints, x, y, out) {

    // debugStartEndHull(startx, starty, endx, endy)
    let hullx, hully, maxm, dfy, mindfy, dfx, mindfx, found
    let maxi = 0
    hullx = startx
    hully = starty

    do {
        out.push([hullx, hully])

        maxm = 0;
        mindfy = starty - endy
        mindfx = endx - startx

        found = false
        for (let i = 0; i < numPoints; i++) {
            if ((x[i] >= hullx) && (y[i] <= hully)) {
                if (y[i] === hully) {
                    if (x[i] !== hullx) {
                        dfx = x[i] - hullx
                        if (mindfx >= dfx) {
                            mindfx = dfx
                            maxi = i
                            found = true
                        }
                    }
                } else if (!found) {
                    const m = (x[i] - hullx) / (hully - y[i])
                    if (maxm < m) {
                        mindfy = hully - y[i]
                        maxm = m
                        maxi = i
                    } else if (maxm === m) {
                        dfy = hully - y[i]
                        if (mindfy >= dfy) {
                            mindfy = dfy
                            maxi = i
                        }
                    }
                }
            }
        }
        hullx = x[maxi]
        hully = y[maxi]
    } while (!((hullx === endx) && (hully === endy)));
    out.push([hullx, hully])
    return out
}

function processQuadrant3(startx, starty, endx, endy, numPoints, x, y, out) {

    // debugStartEndHull(startx, starty, endx, endy)
    let hullx, hully, maxm, dfy, mindfy, dfx, mindfx, found
    let maxi = 0
    hullx = startx
    hully = starty

    do {
        out.push([hullx, hully])

        maxm = 0;
        mindfy = starty - endy
        mindfx = startx - endx

        found = false
        for (let i = 0; i < numPoints; i++) {
            if ((y[i] <= hully) && (x[i] <= hullx)) {
                if (x[i] === hullx) {
                    if (y[i] !== hully) {
                        dfy = hully - y[i]
                        if (mindfy >= dfy) {
                            mindfy = dfy
                            maxi = i
                            found = true
                        }
                    }
                } else if (!found) {
                    const m = (hully - y[i]) / (hullx - x[i])
                    if (maxm < m) {
                        mindfx = hullx - x[i]
                        maxm = m
                        maxi = i
                    } else if (maxm === m) {
                        dfx = hullx - x[i]
                        if (mindfx >= dfx) {
                            mindfx = dfx
                            maxi = i
                        }
                    }
                }
            }
        }
        hullx = x[maxi]
        hully = y[maxi]
    } while (!((hullx === endx) && (hully === endy)));
    out.push([hullx, hully])
    return out
}

function processQuadrant4(startx, starty, endx, endy, numPoints, x, y, out) {

    // debugStartEndHull(startx, starty, endx, endy)
    let hullx, hully, maxm, dfy, mindfy, dfx, mindfx, found
    let maxi = 0
    hullx = startx
    hully = starty

    do {
        out.push([hullx, hully])

        maxm = 0;
        mindfy = endy - starty
        mindfx = startx - endx

        found = false
        for (let i = 0; i < numPoints; i++) {
            if ((x[i] <= hullx) && (y[i] >= hully)) {
                if (y[i] === hully) {
                    if (x[i] !== hullx) {
                        dfx = hullx - x[i]
                        if (mindfx >= dfx) {
                            mindfx = dfx
                            maxi = i
                            found = true
                        }
                    }
                } else if (!found) {
                    const m = (hullx - x[i]) / (y[i] - hully)
                    if (maxm < m) {
                        mindfy = y[i] - hully
                        maxm = m
                        maxi = i
                    } else if (maxm === m) {
                        dfy = y[i] - hully
                        if (mindfy >= dfy) {
                            mindfy = dfy
                            maxi = i
                        }
                    }
                }
            }
        }
        hullx = x[maxi]
        hully = y[maxi]
    } while (!((hullx === endx) && (hully === endy)));
    out.push([hullx, hully])
    return out
}
