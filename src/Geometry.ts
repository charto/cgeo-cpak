// This file is part of cgeo-cpak, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { Reader, Writer } from 'cpak';

export interface OptionsCpak {
	precision?: number;
	/** Reciprocal of precision (1 / precision). */
	inverse?: number;
}

export const cpakDefaults: OptionsCpak = {
};

export class State implements OptionsCpak {

	constructor(options: OptionsCpak) {
		this.precision = options.precision || 1;
		this.inverse = options.inverse || 1 / this.precision;
		this.pos = [ 0, 0 ];
	}

	precision: number;
	/** Reciprocal of precision (1 / precision). */
	inverse: number;

	pos: number[];

}

export type This = Geometry & cgeo.Geometry;

@cgeo.mixin(cgeo.Geometry as any as { new(): cgeo.Geometry })
export class Geometry {

	readCpak(this: This, reader: Reader, state: State) {}

	writeCpak(this: This, writer: Writer, state: State) {}

	writeFullCpak(this: This, writer: Writer, state: State) {
		writer.small(this.kind);

		this.writeCpak(writer, state);
	}

	toCpak(this: This, options = cpakDefaults) {
		const state = new State(options);
		const writer = new Writer();

		this.writeFullCpak(writer, state);

		return(writer.data);
	}

	static readCpak(reader: Reader, state: State): cgeo.Geometry {
		const tag = reader.small();
		const Type = cgeo.Geometry.typeList[tag];

		if(!Type) throw(new Error('Unknown cpak geometry type ' + tag));

		const geom = new Type();

		geom.readCpak(reader, state);

		return(geom);
	}

	static fromCpak(data: string, options = cpakDefaults): cgeo.Geometry {
		const state = new State(options);

		return(Geometry.readCpak(new Reader(data), state));
	}

}
