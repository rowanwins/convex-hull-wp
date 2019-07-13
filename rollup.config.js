import {terser} from 'rollup-plugin-terser'
import strip from 'rollup-plugin-strip'

const output = (file, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'convexHull',
        file,
        format: 'umd',
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/convexHull.js', [
        // strip({
        //     functions: ['debugEventAndSegment', 'debugEventAndSegments']
        // })
    ]),
    output('./dist/convexHull.min.js', [
        // strip({
        //     functions: ['debugEventAndSegment', 'debugEventAndSegments']
        // }),
        terser()
    ])
]
