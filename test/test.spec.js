import test from 'ava'
import path from 'path'
import glob from 'glob'

import load from 'load-json-file'

import makeHull from '../src/main.js'

const fixtures = glob.sync(path.join(__dirname, 'fixtures', '*.geojson'))

test('fixtures', (t) => {
    fixtures.forEach((filepath) => {
        const name = path.parse(filepath).name;
        const geojson = load.sync(filepath);
        const out = makeHull(geojson.features.map(f => f.geometry.coordinates))
        t.is(out.length, geojson.features[0].properties.hullCount, `${name}`);
    });
})

test('input data is not modified', (t) => {
    const geojson = load.sync(path.join(__dirname, 'fixtures', 'featureCollection10.geojson'));
    const clonedData = JSON.parse(JSON.stringify(geojson))
    makeHull(geojson.features.map(f => f.geometry.coordinates))
    t.deepEqual(geojson, clonedData)
})
