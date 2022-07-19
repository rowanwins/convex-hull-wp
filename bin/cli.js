#!/usr/bin/env node
import meow from 'meow';
import cliEntry from '../src/cli.mjs';

const cli = meow(`
	Usage
	  $ convex-hull-wp

	Options
	  --input, -i  **Required** The filepath of an geojson file. Eg --input some_input.geojson
	  --output, -o  The filepath to write the output to. Eg --output hull.geosjon
    --stdout Write the output to stdout rather than to file. If true the output file will not be written.
    --quiet, -q Hides any non-error messages.

	Examples
	  $ convex-hull-wp --input /Data/in.geojson --output /Data/out.geojson
    $ convex-hull-wp --input /Data/in.geojson --stdout

`, {
	importMeta: import.meta,
	flags: {
		input: {
      isRequired: true,
			type: 'string',
			alias: 'i'
		},
		output: {
			type: 'string',
			alias: 'o'
		},
		stdout: {
			type: 'boolean',
			default: false
		},
		quiet: {
			type: 'boolean',
			alias: 'q',
			default: false
		}
	}
});


cliEntry(cli.flags);