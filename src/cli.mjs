
import {coordAll} from '@turf/meta'
import {polygon} from '@turf/helpers'
import {sync as loadJsonFileSync} from 'load-json-file'
import {writeJsonFileSync} from 'write-json-file'

import computeHull from './main.js'


function createHullsForGeojson (geojson) {
    const coords = coordAll(geojson)
    const hull = computeHull(coords)
    return polygon([hull])
}

export default function cli (options) {
    try {
        const gj = loadJsonFileSync(options.input)
        const out = createHullsForGeojson(gj)
        if (out == null) {
            throw new Error('Could not generate convex hull')
        } else if (!options.stdout && options.output) {
            writeJsonFileSync(options.output, out)
            if (!options.quiet) console.log('Convex Hull Done')
        } else if (options.stdout) {
            console.log(JSON.stringify(out))
        }
    } catch (err) {
        throw new Error('Could not generate convex hull', err)
    }
}
