---
description: a demonstration showing how javascript's switch statements and objects are sometimes interchangeable
published_at: 2022-08-05
title: records or maps as switches
---

Imagine you're programming a game and there's a character in the game that says
different things depending on what kind of monsters you show them. You'd
probably implement this using a `switch`.

```typescript
type Kind = "bug" | "fire" | "flying" | "water";

/**
 * return a reply based on the kind
 */
const getReply = (kind: Kind): string => {
	switch (kind) {
		case "bug":
			return "Unless you're a Cutiefly, I don't want you.";
		case "fire":
			return "Fire, fire, light the fire.";
		case "flying":
			return "Fly away little moth! Fly away!";
		case "water":
			return "I wish Misty we're here.";
	}
};

const reply = getReply("flying");
```

There's nothing wrong with this code but if you're like me you'll spot a
pattern. Underneath every _case_ there is a bit of code that needs to be run if
the case clause matches the evaluated switch expression. It's as if we're
matching state to a function or procedure. It seems like the same functionality
can be achieved with a lookup table, a map, or in the case of TypeScript, a
record.

## switching to a record

We know we want to map state to the desired output.

```typescript
const replyRecord: Record<Kind, string> = {
	bug: "Unless you're a Cutiefly, I don't want you.",
	flying: "Fly away little moth! Fly away!",
	fire: "Fire, fire, light the fire.",
	water: "I wish Misty we're here.",
} as const;

const reply = replyRecord["flying"];
```

Here we're mapping the value of a _Kind_ to a string.

You might be wondering why we're using a record and not a **Map**. While Maps
can be used as lookup tables, they're more useful when you don't know what
they'll be storing until runtime. Since we know exactly what strings we need to
store before running the program, it makes more sense to use a record. Secondly,
because the keys of the record are constant and exhaustive, we don't have to
worry about any `Kind`s not being present. All `Kind`s are guaranteed to be
there. If we used the `.get` method of a Map we'd have to cast it with an `as`
or, because `.get`'s return type is `Value | undefined`, we'd have to check for
`undefined`. This is a source of ambiguity if `undefined` is a valid value in
the map. Note that you shouldn't use `undefined` directly but that's a topic for
a different blog post.

```typescript
const replyMap = new Map(/* ... */);

const reply = replyMap.get(kind);
// typeof reply === Kind | undefined;

if (reply !== undefined) {
	// ...
}
```

There are benefits to using a record over a switch. All objects have constant
lookup-time whereas a switch may have to check each of its cases one by one.
There won't be any noticeable difference in performance until the size of the
switch gets very large. I've heard that in some languages the compiler is smart
enough to convert a switch into a lookup table, but I'm not sure if the same
optimization can be done with interpreted languages like JavaScript or Python.

## example: keyboard event handling

Imagine that you're developing a game and you want to use key presses to move a
character around.

```typescript
type Position = {
	x: number;
	y: number;
};

const createMoveKeyListener = (position: Position) => {
	return (event: KeyboardEvent) => {
		switch (event.key) {
			case "ArrowDown":
				position.y += 1;
				break;
			case "ArrowLeft":
				position.x -= 1;
				break;
			case "ArrowRight":
				position.y += 1;
				break;
			case "ArrowUp":
				position.x -= 1;
				break;
		}
	};
};

const position: Position = { x: 0, y: 0 };

const onKeyDown = createMoveKeyListener(position);

window.addEventListener("keydown", onKeyDown);

// ... game stuff

// don't forget to clean up later on
window.removeEventListener("keydown", onKeyDown);
```

Seems pretty straightforward - check the key and run the code under the
corresponding case.

Here's what a 'record' implementation might look like.

```typescript
type ArrowKey = "ArrowDown" | "ArrowLeft" | "ArrowRight" | "ArrowUp";

type Move = (position: Position) => void;
const moveRecord: Record<ArrowKey, Move> = {
	ArrowDown(p) {
		p.y += 1;
	},
	ArrowLeft(p) {
		p.x -= 1;
	},
	ArrowRight(p) {
		p.x += 1;
	},
	ArrowUp(p) {
		p.y -= 1;
	},
} as const;

const isMoveKey = (s: string): s is keyof typeof moveRecord => {
	return s in moveRecord;
};

const createMoveKeyListener = (moveRecord: Record<ArrowKey, Move>) => {
	return (position: Position) => {
		return ({ key }: KeyboardEvent) => {
			if (isMoveKey(key)) moveRecord[key](position);
		};
	};
};
```

Then the listener can be created and added / removed like so.

```typescript
const onKeyDown = createMoveKeyListener(moveRecord)(position);

window.addEventListener("keydown", onKeyDown);
window.removeEventListener("keydown", onKeyDown);
```

I don't want to admit it but this might be a little more complex for no apparent
gain BUT nevertheless it can sometimes be handy to separate things out.

This may be a case where a Map is preferred especially if you want to
dynamically add and remove "key press handlers".

```typescript
const createMoveListener = (moveMap: Map<string, Move>) => {
	return () => {
		return (event: KeyboardEvent) => {
			moveMap.get(event.key)?.(character);
		};
	};
};

const map: Map<string, Move> = new Map();
const onKeyDown = createMoveKeyListener(map)(character.position);
```

The benefit of doing it this way is that you can add or remove entries from the
map at any time before or after the listener is set up. It's completely dynamic.

## that's that

If you made it this far, thanks for sticking around through this hodge-podgey
article. Hopefully it was interesting To be clear, I'm not really advocating the
use of records or maps in place of switches. I think both approaches are
perfectly fine.
