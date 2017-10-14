// This file is part of cgeo-cpak, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { Reader, Writer, decodeSign, encodeSign } from 'cpak';
import { State } from './Geometry';

@cgeo.mixin()
export class LineString extends cgeo.LineString {

	writeCpak(writer: Writer, state: State) {
		let count = this.posList.length >> 1;
		let x: number, y: number;
		let num = 0;

		writer.small(count);

		while(count--) {
			x = ~~(this.posList[num++] * state.inverse);
			y = ~~(this.posList[num++] * state.inverse);

			writer.large(encodeSign(x - state.pos[0]));
			writer.large(encodeSign(y - state.pos[1]));

			state.pos[0] = x;
			state.pos[1] = y;
		}
	}

	readCpak(reader: Reader, state: State) {
		let count = reader.small();
		let num = 0;

		while(count--) {
			state.pos[0] += decodeSign(reader.large());
			state.pos[1] += decodeSign(reader.large());

			this.posList[num++] = state.pos[0] * state.precision;
			this.posList[num++] = state.pos[1] * state.precision;
		}
	}

}
