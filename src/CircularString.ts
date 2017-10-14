// This file is part of cgeo-cpak, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { Reader, Writer } from 'cpak';
import { State } from './Geometry';

@cgeo.mixin()
export class CircularString extends cgeo.CircularString {

	writeCpak(writer: Writer, state: State) {
		return(cgeo.LineString.prototype.writeCpak.call(this, writer, state));
	}

	readCpak(reader: Reader, state: State) {
		return(cgeo.LineString.prototype.readCpak.call(this, reader, state));
	}

}
