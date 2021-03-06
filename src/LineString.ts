// This file is part of cgeo-cpak, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { decodeSign, encodeSign } from 'cpak';
import { State } from './Geometry';

@cgeo.mixin()
export class LineString extends cgeo.LineString {

	writeCpak(state: State) {
		const writer = state.writer;
		const count = this.x.length;
		let x: number, y: number, z: number, m: number;

		writer.small(count);

		for(let num = 0; num < count; ++num) {
			x = ~~(this.x[num] * state.inverse);
			y = ~~(this.y[num] * state.inverse);

			writer.large(encodeSign(x - state.x));
			writer.large(encodeSign(y - state.y));

			state.x = x;
			state.y = y;
		}
	}

	readCpak(state: State) {
		const reader = state.reader;
		const count = reader.small();

		for(let num = 0; num < count; ++num) {
			state.x += decodeSign(reader.large());
			state.y += decodeSign(reader.large());

			this.x[num] = state.x * state.precision;
			this.y[num] = state.y * state.precision;
		}
	}

}
