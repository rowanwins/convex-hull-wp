'use strict';

// import {debugQuadrantPoints, debugOutQuadrantHull, debugStartEndHull} from './debug'

function computeHull (points) {
    const numPoints = points.length;

    let minx = [Infinity, Infinity];
    let maxx = [-Infinity, -Infinity];
    let maxy = [-Infinity, -Infinity];
    let miny = [Infinity, Infinity];

    for (let i = 0; i < numPoints; i++) {
        if (points[i][0] < minx[0]) {
            minx = points[i];
        }

        if (points[i][0] > maxx[0]) {
            maxx = points[i];
        }

        if (points[i][1] < miny[1]) {
            miny = points[i];
        }

        if (points[i][1] > maxy[1]) {
            maxy = points[i];
        }
    }

    const regionA = [];
    const regionB = [];
    const regionC = [];
    const regionD = [];
    for (let i = 0; i < numPoints; i++) {
        if ((points[i][0] <= maxy[0] && points[i][1] >= minx[1])) {
            regionA.push(points[i]);
        }

        if ((points[i][0] >= maxy[0] && points[i][1] >= maxx[1])) {
            regionB.push(points[i]);
        }

        if ((points[i][0] >= miny[0] && points[i][1] <= maxx[1])) {
            regionC.push(points[i]);
        }

        if ((points[i][0] <= miny[0] && points[i][1] <= minx[1])) {
            regionD.push(points[i]);
        }
    }
    // debugQuadrantPoints(regionA, regionB, regionC, regionD)
    const out = [];
    processQuadrant1(minx, maxy, regionA.length, regionA, out);
    processQuadrant2(maxy, maxx, regionB.length, regionB, out);
    processQuadrant3(maxx, miny, regionC.length, regionC, out);
    processQuadrant4(miny, minx, regionD.length, regionD, out);
    out.push(out[0]);
    return out
}


function processQuadrant1(start, end, numPoints, regionCoords, out) {
    // debugStartEndHull(startx, starty, endx, endy)
    let hullx, hully, maxm, dfy, mindfy, dfx, mindfx, found;
    let maxi = 0;
    hullx = start[0];
    hully = start[1];

    do {
        out.push([hullx, hully]);

        maxm = 0;
        mindfy = end[1] - start[1];
        mindfx = end[0] - start[0];

        found = false;
        for (let i = 0; i < numPoints; i++) {
            if ((regionCoords[i][1] >= hully) && (regionCoords[i][0] >= hullx)) {
                if (regionCoords[i][0] === hullx) {
                    if (regionCoords[i][1] !== hully) {
                        dfy = regionCoords[i][1] - hully;
                        if (mindfy >= dfy) {
                            mindfy = dfy;
                            maxi = i;
                            found = true;
                        }
                    }
                } else if (!found) {
                    const m = (regionCoords[i][1] - hully) / (regionCoords[i][0] - hullx);
                    if (maxm < m) {
                        mindfx = regionCoords[i][0] - hullx;
                        maxm = m;
                        maxi = i;
                    } else if (maxm === m) {
                        dfx = regionCoords[i][0] - hullx;
                        if (mindfx >= dfx) {
                            mindfx = dfx;
                            maxi = i;
                        }
                    }
                }
            }
        }
        hullx = regionCoords[maxi][0];
        hully = regionCoords[maxi][1];
    } while (!((hullx === end[0]) && (hully === end[1])));
}

function processQuadrant2(start, end, numPoints, regionCoords, out) {
    // debugStartEndHull(startx, starty, endx, endy)
    let hullx, hully, maxm, dfy, mindfy, dfx, mindfx, found;
    let maxi = 0;
    hullx = start[0];
    hully = start[1];

    do {
        out.push([hullx, hully]);

        maxm = 0;
        mindfy = start[1] - end[1];
        mindfx = end[0] - start[0];

        found = false;
        for (let i = 0; i < numPoints; i++) {
            if ((regionCoords[i][0] >= hullx) && (regionCoords[i][1] <= hully)) {
                if (regionCoords[i][1] === hully) {
                    if (regionCoords[i][0] !== hullx) {
                        dfx = regionCoords[i][0] - hullx;
                        if (mindfx >= dfx) {
                            mindfx = dfx;
                            maxi = i;
                            found = true;
                        }
                    }
                } else if (!found) {
                    const m = (regionCoords[i][0] - hullx) / (hully - regionCoords[i][1]);
                    if (maxm < m) {
                        mindfy = hully - regionCoords[i][1];
                        maxm = m;
                        maxi = i;
                    } else if (maxm === m) {
                        dfy = hully - regionCoords[i][1];
                        if (mindfy >= dfy) {
                            mindfy = dfy;
                            maxi = i;
                        }
                    }
                }
            }
        }
        hullx = regionCoords[maxi][0];
        hully = regionCoords[maxi][1];
    } while (!((hullx === end[0]) && (hully === end[1])));
}

function processQuadrant3(start, end, numPoints, regionCoords, out) {
    // debugStartEndHull(startx, starty, endx, endy)
    let hullx, hully, maxm, dfy, mindfy, dfx, mindfx, found;
    let maxi = 0;
    hullx = start[0];
    hully = start[1];

    do {
        out.push([hullx, hully]);

        maxm = 0;
        mindfy = start[1] - end[1];
        mindfx = start[0] - end[0];

        found = false;
        for (let i = 0; i < numPoints; i++) {
            if ((regionCoords[i][1] <= hully) && (regionCoords[i][0] <= hullx)) {
                if (regionCoords[i][0] === hullx) {
                    if (regionCoords[i][1] !== hully) {
                        dfy = hully - regionCoords[i][1];
                        if (mindfy >= dfy) {
                            mindfy = dfy;
                            maxi = i;
                            found = true;
                        }
                    }
                } else if (!found) {
                    const m = (hully - regionCoords[i][1]) / (hullx - regionCoords[i][0]);
                    if (maxm < m) {
                        mindfx = hullx - regionCoords[i][0];
                        maxm = m;
                        maxi = i;
                    } else if (maxm === m) {
                        dfx = hullx - regionCoords[i][0];
                        if (mindfx >= dfx) {
                            mindfx = dfx;
                            maxi = i;
                        }
                    }
                }
            }
        }
        hullx = regionCoords[maxi][0];
        hully = regionCoords[maxi][1];
    } while (!((hullx === end[0]) && (hully === end[1])));
}

function processQuadrant4(start, end, numPoints, regionCoords, out) {
    // debugStartEndHull(startx, starty, endx, endy)
    let hullx, hully, maxm, dfy, mindfy, dfx, mindfx, found;
    let maxi = 0;
    hullx = start[0];
    hully = start[1];

    do {
        out.push([hullx, hully]);

        maxm = 0;
        mindfy = end[1] - start[1];
        mindfx = start[0] - end[0];

        found = false;
        for (let i = 0; i < numPoints; i++) {
            if ((regionCoords[i][0] <= hullx) && (regionCoords[i][1] >= hully)) {
                if (regionCoords[i][1] === hully) {
                    if (regionCoords[i][0] !== hullx) {
                        dfx = hullx - regionCoords[i][0];
                        if (mindfx >= dfx) {
                            mindfx = dfx;
                            maxi = i;
                            found = true;
                        }
                    }
                } else if (!found) {
                    const m = (hullx - regionCoords[i][0]) / (regionCoords[i][1] - hully);
                    if (maxm < m) {
                        mindfy = regionCoords[i][1] - hully;
                        maxm = m;
                        maxi = i;
                    } else if (maxm === m) {
                        dfy = regionCoords[i][1] - hully;
                        if (mindfy >= dfy) {
                            mindfy = dfy;
                            maxi = i;
                        }
                    }
                }
            }
        }
        hullx = regionCoords[maxi][0];
        hully = regionCoords[maxi][1];
    } while (!((hullx === end[0]) && (hully === end[1])));
}

module.exports = computeHull;
