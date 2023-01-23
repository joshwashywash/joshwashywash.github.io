export type Vector = [x: number, y: number];

export type Polygon = Vector[];

export type AbsoluteBezierCurve = [start: Vector, end: Vector, control: Vector];
export type OffsetBezierCurve = [start: Vector, end: Vector, control: Vector];
