---
description: a cursory look at tail-recursive functions in typescript with some examples
published_at: 2022-06-23
title: tail recursion in typescript
---

I recently re-watched a [computerphile video](#resources) about a simple way to
avoid stack overflows when using recursive functions. The technique is known as
tail recursion.

Note that there are more idiomatic ways to solve the following problems in
JavaScript and TypeScript using _Array.\*_ methods. You can pretty much do
anything with _Array.reduce_. Also, at the time of this writing, I don't think
Node.js nor Deno support tail recursive calls at all so there's that.

## summing an array of numbers

Here's an implementation of a recursive function that calculates the sum of an
array of numbers.

```typescript
const sum = (numbers: number[], index = 0): number => {
	if (index < numbers.length) {
		return numbers[index] + sum(numbers, index + 1);
	}
	return 0;
};
```

You can see by looking at the call stack when calling the function, this version of `sum` is not tail recursive.

```typescript
sum([3, 4, 5], 0);
3 + sum([3, 4, 5], 1);
3 + 4 + sum([3, 4, 5], 2);
3 + 4 + 5 + sum([3, 4, 5], 3);
3 + 4 + 5 + 0;
3 + 4 + 5;
3 + 9;
12;
```

A triangle shape forms as the actual addition isn't completed until the
recursion has ended. Now imagine that the triangle becomes so big that it can't
all fit on the stack. This is what's known as a **stack overflow**. Contrast
that with a tail recursive version.

```typescript
const sum = (numbers: number[], index = 0, total = 0): number => {
	if (index < numbers.length) {
		return sum(numbers, index + 1, total + numbers[index]);
	}
	return total;
};
```

The call stack would look something like this.

```typescript
sum([3, 4, 5]);
sum([3, 4, 5], 1, 3);
sum([3, 4, 5], 2, 7);
sum([3, 4, 5], 3, 12);
12;
```

No triangle and the addition happens before the recursive call. Notice how the
running total is carried along to the next call of `sum`. This is pretty
characteristic of tail recursive functions.

## count occurrences in an array

To do this you just loop over the array and check if the current element is
equal to the target. If there's a match, add 1 to the tally otherwise add 0.

```typescript
const count = <E>(elements: E[], element: E, index = 0): number => {
	if (index < elements.length) {
		const equal = elements[index] === element;
		// false -> 0, true -> 1
		return +equal + count(elements, element, index + 1);
	}
	return 0;
};
```

The calculation is delayed until the recursion is done.

```typescript
count(["a", "b", "", "a"], "a");
1 + count(["a", "b", "", "a"], "a", 1);
1 + 0 + count(["a", "b", "", "a"], "a", 2);
1 + 0 + 0 + count(["a", "b", "", "a"], "a", 3);
1 + 0 + 0 + 1 + count(["a", "b", "", "a"], "a", 4);
1 + 0 + 0 + 1 + 0;
1 + 0 + 0 + 1;
1 + 0 + 1;
1 + 1;
2;
```

Here's the tail-recursive version.

```typescript
const count = <E>(elements: E[], element: E, index = 0, tally = 0): number => {
	if (index < elements.length) {
		const equal = elements[index] === element;
		// false -> 0, true -> 1
		return count(elements, element, index + 1, +equal + tally);
	}
	return tally;
};
```

With a call stack similar to this.

```typescript
count(["a", "b", "", "a"], "a");
count(["a", "b", "", "a"], "a", 1, 1);
count(["a", "b", "", "a"], "a", 2, 1);
count(["a", "b", "", "a"], "a", 3, 1);
count(["a", "b", "", "a"], "a", 4, 2);
2;
```

Just like the tail-recursive version of the _sum_ function above, the
calculation is performed before the recursion and the result gets passed along.

## summary

While writing this post I realized that this style of recursion is a lot like
performing a while loop. In a while loop all the work is done in the body of the
loop and when you're done, you jump back to the top of the loop to do it all
again.

## resources

- [computerphile tail recursion video](https://www.youtube.com/watch?v=_JtPhF8MshA&t=765s)
- [tail recursion wikipedia article](https://en.wikipedia.org/wiki/Recursion_%28computer_science%29)
