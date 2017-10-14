// This file is part of cgeo-cpak, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import { Reader } from 'cpak';

import { Geometry as GeometryCpak, OptionsCpak } from './Geometry';
import './Geometry';
import './Point';
import './LineString';
import './Polygon';
import './GeometryCollection';
import './CircularString';
import './CompoundCurve';
import './CurvePolygon';

declare module 'cgeo/dist/Geometry' {

	interface Geometry extends GeometryCpak {}

	namespace Geometry {
		export function readCpak(reader: Reader, options?: OptionsCpak): Geometry;
		export function fromCpak(data: string, options?: OptionsCpak): Geometry;
	}

}
