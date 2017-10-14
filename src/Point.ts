// This file is part of cgeo-cpak, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { Reader, Writer, decodeSign, encodeSign } from 'cpak';
import { State } from './Geometry';

@cgeo.mixin()
export class Point extends cgeo.Point {

	writeCpak(writer: Writer, state: State) {
		// Convert to integer first, to ensure delta is encoded reversibly.
		const x = ~~(this.pos[0] * state.inverse);
		const y = ~~(this.pos[1] * state.inverse);

		writer.large(encodeSign(x - state.pos[0]));
		writer.large(encodeSign(y - state.pos[1]));

		state.pos[0] = x;
		state.pos[1] = y;
	}

	readCpak(reader: Reader, state: State) {
		// Maintain unscaled integer coordinates in state to avoid rounding errors.
		state.pos[0] += decodeSign(reader.large());
		state.pos[1] += decodeSign(reader.large());

		this.pos[0] = state.pos[0] * state.precision;
		this.pos[1] = state.pos[1] * state.precision;
	}

}
