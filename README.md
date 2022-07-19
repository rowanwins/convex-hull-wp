# convex-hull-wp
A small and fast module for generating convex hulls from a set of points based on the algorithm by Wijeweera & Pinidiyaarachchi.

## Install
````
npm install convex-hull-wp

// Or for CLI usage
npm install convex-hull-wp -g
````

## API Documentation
Takes an array of `[x, y]` coordinates and returns the same
````js
    const convexHull = require('convex-hull-wp')

    const coords = [[42, 23], [46, 15], [51, 27], [34, 22], [54, 22]]
    convexHull(coords)
    // => [ [ 34, 22 ], [ 51, 27 ], [ 54, 22 ], [ 46, 15 ], [ 34, 22 ] ]
````

## CLI Documentation
Takes an input geojson file, and writes an output `Feature` `Polygon`
````
    convex-hull-wp --input /Data/in.geojson --output /Data/out.geojson
    // => Convex Hull Done
````
### CLI Options

`--input OR -i` **Required** The filepath of an geojson file. Eg `--input some_input.geojson`

`--output OR -o` The filepath to write the output to. Eg `--output hull.geojson`

`--stdout` Write the output to stdout rather than to file. If true the output file will not be written.

`--quiet or -q` Hides any non-error messages.


### Benchmarks
This library performs very well compared to equivalent js libraries.
````
// 10 points
// Convex Hull - WP x 1,631,956 ops/sec ±1.09% (93 runs sampled)
// monotone-convex-hull-2d x 631,516 ops/sec ±1.12% (87 runs sampled)
// convexhullJs x 712,072 ops/sec ±0.90% (91 runs sampled)
// convexHull x 569,445 ops/sec ±0.52% (94 runs sampled)
// - Fastest is Convex Hull - WP

// 1000 points
// Convex Hull - WP x 28,722 ops/sec ±0.93% (89 runs sampled)
// monotone-convex-hull-2d x 4,580 ops/sec ±0.61% (91 runs sampled)
// convexhullJs x 5,521 ops/sec ±0.88% (91 runs sampled)
// convexHull x 4,635 ops/sec ±0.87% (93 runs sampled)
// - Fastest is Convex Hull - WP
````

## Further Reading
[An Efficient Convex Hull Algorithm for a Planer Set of Points](https://github.com/rowanwins/convex-hull-wp/blob/master/KP_Paper.pdf) - by Wijeweera & Pinidiyaarachchi
Interestingly this algorithm could be sped up by applying parallel processing to each quadant of the hull.