---
description: a cursory look at tail-recursive functions in typescript with some examples
layout: '../../../layouts/Post.astro'
pubDate: 2022-06-23
title: tail recursion in typescript
---

I recently rewatched a [computerphile video](https://www.youtube.com/watch?v=_JtPhF8MshA&t=765s) about a simple way to avoid stack overflows when using recursive functions. The technique is known as tail recursion.

> There are more idiomatic ways to solve the following problems in JavaScript and TypeScript using _Array.\*_ methods. You can pretty much do anything with _Array.reduce_. Also, I don't think NodeJS nor Deno support tail recursive calls at all so there's that.

## example 1 - summing an array of numbers

Here's an implementation of a recursive function that calculates the sum of an array of numbers.

```typescript
const sum = (ns: number[]): number => {
	if (ns.length > 0) {
		const [n, ...rest] = ns;
		return n + sum(rest);
	}
	return 0;
};
```

This version is not tail recursive and you can see that by looking at the call stack when calling the function.

```typescript
// sum([3, 4, 5])
// 3 + sum([4, 5])
// 3 + 4 + sum([5])
// 3 + 4 + 5 + sum([])
// 3 + 4 + 5 + 0
// 3 + 4 + 5
// 3 + 9
// 12
```

A kind of triangular shape forms as the actual addition isn't completed until the recursion has ended. Now imagine that the triangle becomes so big that it can't all fit on the stack. This is what's known as a **stack overflow**. Contrast that with a tail recursive version of the same function.

```typescript
const sum = (ns: number[], total = 0): number => {
	if (ns.length > 0) {
		const [n, ...rest] = ns;
		return sum(rest, total + n);
	}
	return total;
};
```

The call stack would look something like this.

```typescript
// sum([3, 4, 5])
// sum([4, 5], 3)
// sum([5], 7)
// sum([], 12)
// 12
```

No triangle and the addition happens before the recursive call. Notice how the running total is carried to the next call of **sum**. This is pretty characteristic of tail recursive functions. Let's check out another example.

## example 2 - count occurences in an array

To do this you just loop through the array and check if the current element is equal to the target. If there's a match, add one to the count. If not, continue the loop.

```typescript
const count = <T>(t: T, ts: T[]): number => {
	if (ts.length > 0) {
		const [first, ...rest] = ts;
		const equal = first === t ? 1 : 0; // sorry for the poor naming :T
		return equal + count(t, rest);
	}
	return 0;
};
```

We delay the calculation until the recursion is all done.

```typescript
// count('a', ['a', 'b', '', 'a'])
// 1 + count('a', ['b', '', 'a'])
// 1 + 0 + count('a', ['', 'a'])
// 1 + 0 + 0 + count('a', ['a'])
// 1 + 0 + 0 + 1 + count('a', [])
// 1 + 0 + 0 + 1 + 0
// 1 + 0 + 0 + 1
// 1 + 0 + 1
// 1 + 1
// 2
```

And version two which doesn't have the pyramid problem:

```typescript
const count = <T>(t: T, ts: T[], c = 0): number => {
	if (ts.length > 0) {
		const [first, ...rest] = ts;
		const equal = first === t ? 1 : 0;
		return count(t, rest, c + equal);
	}
	return c;
};
```

With a call stack similar to this.

```typescript
// count('a', ['a', 'b', '', 'a'])
// count('a', ['b', '', 'a'], 1)
// count('a', ['', 'a'], 1)
// count('a', ['a'], 1)
// count('a', [], 2)
// 2
```

Just like the second version of the **sum** function above, the calculation is performed before the recursion and gets passed along.

## summary

While writing this post I realized that this style of recursion is a lot like performing a **while** loop. In a **while** loop all the work is done in the body of the loop and when you're done, you jump back to the top of the loop to do it all again. Check the out [tail recursion wikipedia article](https://en.wikipedia.org/wiki/Recursion_%28computer_science%29) for more details about the similarities between recursion and looping structures.
