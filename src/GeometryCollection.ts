// This file is part of cgeo-cpak, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as cgeo from 'cgeo';
import { Reader, Writer } from 'cpak';
import { State } from './Geometry';

@cgeo.mixin()
export class GeometryCollection<Member extends cgeo.Geometry = cgeo.Geometry> extends cgeo.GeometryCollection {

	writeCpak(writer: Writer, state: State) {
		let count = 0;

		for(let child of this.childList) {
			if(child) ++count;
		}

		writer.small(count);

		for(let child of this.childList) {
			if(child) child.writeFullCpak(writer, state);
		}
	}

	readCpak(reader: Reader, state: State) {
		const count = reader.small();

		for(let num = 0; num < count; ++num) {
			this.addChild(cgeo.Geometry.readCpak(reader, state) as Member);
		}
	}

}
