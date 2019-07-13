const path = require('path')
const Benchmark = require('benchmark')
const convexHullWp = require('../dist/convexHull.js')
const monotoneHull = require('monotone-convex-hull-2d')
const convexHull = require('convex-hull')
const convexhullJs = require('convexhull-js')
const loadJsonFile = require('load-json-file')

const fc10 = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'featureCollection10.geojson'))
const fc10Points = fc10.features.map(function (f) {
    return f.geometry.coordinates
})

const fc100 = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'featureCollection100.geojson'))
const fc100Points = fc100.features.map(function (f) {
    return f.geometry.coordinates
})

const fc1000 = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'featureCollection1000.geojson'))
const fc1000Points = fc1000.features.map(function (f) {
    return f.geometry.coordinates
})

const options = {
    onStart () { console.log(this.name) },
    onError (event) { console.log(event.target.error) },
    onCycle (event) { console.log(String(event.target)) },
    onComplete () {
        console.log(`- Fastest is ${this.filter('fastest').map('name')}`)
    }
}

// 10 points
// Convex Hull - WP x 1,102,935 ops/sec ±1.11% (85 runs sampled)
// monotone-convex-hull-2d x 588,728 ops/sec ±1.85% (85 runs sampled)
// convexhullJs x 1,216,076 ops/sec ±1.07% (91 runs sampled)
// convexHull x 522,029 ops/sec ±0.58% (92 runs sampled)
// - Fastest is convexhullJs
const suite = new Benchmark.Suite('10 points', options)
suite
    .add('Convex Hull - WP', function () {
        convexHullWp(fc10Points)
    })
    .add('monotone-convex-hull-2d', function () {
        monotoneHull(fc10Points)
    })
    .add('convexhullJs', function () {
        convexhullJs(fc10Points)
    })
    .add('convexHull', function () {
        convexHull(fc10Points)
    })
    .run()


// 100 points
// Convex Hull - WP x 1,102,935 ops/sec ±1.11% (85 runs sampled)
// monotone-convex-hull-2d x 588,728 ops/sec ±1.85% (85 runs sampled)
// convexhullJs x 1,216,076 ops/sec ±1.07% (91 runs sampled)
// convexHull x 522,029 ops/sec ±0.58% (92 runs sampled)
// - Fastest is convexhullJs
const suite2 = new Benchmark.Suite('100 points', options)
suite2
    .add('Convex Hull - WP', function () {
        convexHullWp(fc100Points)
    })
    .add('monotone-convex-hull-2d', function () {
        monotoneHull(fc100Points)
    })
    .add('convexhullJs', function () {
        convexhullJs(fc100Points)
    })
    .add('convexHull', function () {
        convexHull(fc100Points)
    })
    .run()


// 1000 points
// Convex Hull - WP x 1,102,935 ops/sec ±1.11% (85 runs sampled)
// monotone-convex-hull-2d x 588,728 ops/sec ±1.85% (85 runs sampled)
// convexhullJs x 1,216,076 ops/sec ±1.07% (91 runs sampled)
// convexHull x 522,029 ops/sec ±0.58% (92 runs sampled)
// - Fastest is convexhullJs
const suite3 = new Benchmark.Suite('1000 points', options)
suite3
    .add('Convex Hull - WP', function () {
        convexHullWp(fc1000Points)
    })
    .add('monotone-convex-hull-2d', function () {
        monotoneHull(fc1000Points)
    })
    .add('convexhullJs', function () {
        convexhullJs(fc1000Points)
    })
    .add('convexHull', function () {
        convexHull(fc1000Points)
    })
    .run()
