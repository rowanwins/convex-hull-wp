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
const fc10PointsXY = fc10.features.map(function (f) {
    return {x: f.geometry.coordinates[0], y: f.geometry.coordinates[1]}
})

const fc100 = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'featureCollection100.geojson'))
const fc100Points = fc100.features.map(function (f) {
    return f.geometry.coordinates
})

const fc100PointsXY = fc100.features.map(function (f) {
    return {x: f.geometry.coordinates[0], y: f.geometry.coordinates[1]}
})

const fc1000 = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'featureCollection1000.geojson'))
const fc1000Points = fc1000.features.map(function (f) {
    return f.geometry.coordinates
})

const fc1000PointsXY = fc1000.features.map(function (f) {
    return {x: f.geometry.coordinates[0], y: f.geometry.coordinates[1]}
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
// Convex Hull - WP x 1,631,956 ops/sec ±1.09% (93 runs sampled)
// monotone-convex-hull-2d x 631,516 ops/sec ±1.12% (87 runs sampled)
// convexhullJs x 712,072 ops/sec ±0.90% (91 runs sampled)
// convexHull x 569,445 ops/sec ±0.52% (94 runs sampled)
// - Fastest is Convex Hull - WP
const suite = new Benchmark.Suite('10 points', options)
suite
    .add('Convex Hull - WP', function () {
        convexHullWp(fc10Points)
    })
    .add('monotone-convex-hull-2d', function () {
        monotoneHull(fc10Points)
    })
    .add('convexhullJs', function () {
        convexhullJs(fc10PointsXY)
    })
    .add('convexHull', function () {
        convexHull(fc10Points)
    })
    .run()


// 100 points
// Convex Hull - WP x 405,877 ops/sec ±0.91% (93 runs sampled)
// monotone-convex-hull-2d x 88,789 ops/sec ±0.96% (91 runs sampled)
// convexhullJs x 97,607 ops/sec ±0.83% (95 runs sampled)
// convexHull x 88,285 ops/sec ±0.44% (95 runs sampled)
// - Fastest is Convex Hull - WP
const suite2 = new Benchmark.Suite('100 points', options)
suite2
    .add('Convex Hull - WP', function () {
        convexHullWp(fc100Points)
    })
    .add('monotone-convex-hull-2d', function () {
        monotoneHull(fc100Points)
    })
    .add('convexhullJs', function () {
        convexhullJs(fc100PointsXY)
    })
    .add('convexHull', function () {
        convexHull(fc100Points)
    })
    .run()


// 1000 points
// Convex Hull - WP x 28,722 ops/sec ±0.93% (89 runs sampled)
// monotone-convex-hull-2d x 4,580 ops/sec ±0.61% (91 runs sampled)
// convexhullJs x 5,521 ops/sec ±0.88% (91 runs sampled)
// convexHull x 4,635 ops/sec ±0.87% (93 runs sampled)
// - Fastest is Convex Hull - WP
const suite3 = new Benchmark.Suite('1000 points', options)
suite3
    .add('Convex Hull - WP', function () {
        convexHullWp(fc1000Points)
    })
    .add('monotone-convex-hull-2d', function () {
        monotoneHull(fc1000Points)
    })
    .add('convexhullJs', function () {
        convexhullJs(fc1000PointsXY)
    })
    .add('convexHull', function () {
        convexHull(fc1000Points)
    })
    .run()
