import {terser} from 'rollup-plugin-terser'
import strip from 'rollup-plugin-strip'

const output = (file, format, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'convexHull',
        file,
        format,
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/convexHull.cjs', 'cjs', [
        strip({
            functions: ['debugStartEndHull', 'debugOutQuadrantHull', 'debugQuadrantPoints']
        })
    ]),
    output('./dist/convexHull.min.js', 'umd', [
        strip({
            functions: ['debugStartEndHull', 'debugOutQuadrantHull', 'debugQuadrantPoints']
        }),
        terser()
    ]),
    output('./dist/convexHull.mjs', 'es', [
        strip({
            functions: ['debugStartEndHull', 'debugOutQuadrantHull', 'debugQuadrantPoints']
        })
    ])
]
