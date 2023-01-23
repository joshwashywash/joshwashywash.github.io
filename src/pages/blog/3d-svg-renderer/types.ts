export type Triangle = {
	indices: number[];
	stroke: string;
};

type Pair<S, T = S> = [S, T];
export type Range = Pair<number>;
