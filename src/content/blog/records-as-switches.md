---
date: 2022-08-05
description: a demonstration showing how javascript's switch statements and objects are sometimes interchangable
title: records or maps as switches
---

Imagine you're programming a game and there's a character in the game that says different things depending on what kind of pokemon you show them. You'd probably use a `switch` statement for this.

```typescript
type Kind = 'bug' | 'fire' | 'flying' | 'water';

/**
 * return a reply based on the kind
 */
const getReply = (kind: Kind): string => {
	switch (kind) {
		case 'bug':
			return "Unless you're a Cutiefly, I don't want you.";
		case 'fire':
			return 'Fire, fire, light the fire.';
		case 'flying':
			return 'Fly away little moth! Fly away!';
		case 'water':
			return "I wish Misty we're here.";
	}
};

const reply = getReply('flying');
```

There's nothing wrong with this code but if you're like me you'll start to see a pattern. Underneath every **case** there is a bit of code that needs to be ran if the case clause matches the evaluated switch expression. What if we think about the statements under each case as a procedure? With that mindset, you can think of a switch as a _map_ from the current state of something to a procedure that immediately handles it. Let's see if we can _map_ **switch** to a record.

## switching to a record

We know we want to map some state to a procedure or function and immediately call it.

```typescript
const replyRecord: Record<Kind, string> = {
	bug: "Unless you're a Cutiefly, I don't want you.",
	flying: 'Fly away little moth! Fly away!',
	fire: 'Fire, fire, light the fire.',
	water: "I wish Misty we're here.",
} as const;
```

Here we're mapping the value of a _Kind_ to a string.

```typescript
const reply = replyRecord['flying'];
```

You might be wondering why we're using a record and not a JavaScript **Map**. Firstly while Maps can be used as lookup tables, they really are more useful if you don't know what you'll be putting into them. Since we're using TypeScript, we know exactly what should be in the record. Secondly, because the keys of the record are constant, we don't have to worry about the case where a `Kind` may not be in the record. All `Kind`s are guaranteed to be there. If we used the `.get` method on a **Map** we'd have to cast it with an `as` or, because `.get`'s return type is `T | undefined` we'd have to check for `undefined`. This is a source of ambiguity if `undefined` is a valid value in the map.

```typescript
const replyMap = new Map(/* ... */);
const reply = replyMap.get(kind);
// typeof reply === Kind | undefined;
if (reply !== undefined) {
	// ...
}
```

There are benefits to using a record over a switch. Objects have constant lookup time whereas a switch may have to check each case one by one. There won't be any noticeable difference in performance until the size of the switch gets very large. I've heard that in some languages the compiler is smart enough to convert a switch into a lookup table but I'm not sure if the same optimization can be done with interpreted languages like JavaScript or Python.

## example: keyboard event handling

Imagine that you're developing a game and you want to use key presses to move a character around.

```typescript
const onKeydown = (event: KeyboardEvent) => {
	switch (event.key) {
		case 'ArrowDown':
			// move the character down
			break;
		case 'ArrowLeft':
			// move the character left
			break;
		case 'ArrowRight':
			// move the character right
			break;
		case 'ArrowUp':
			// move the character up
			break;
	}
};

window.addEventListener('keydown', onKeydown);

// don't forget to clean up
window.removeEventListener('keydown', onKeydown);
```

Seems pretty straightforward - chcek the key and run the code under the corresponding case clause.

What does it look like if a record is used?

```typescript
type Positionable = {
	position: {
		x: number;
		y: number;
	};
};

type Move = (positionable: Positionable) => void;

const arrowKeys = ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'] as const;
type ArrowKey = (typeof keys)[number];

const isArrowKey = (u: string): u is ArrowKey => {
	return arrowKeys.includes(u);
};

const movementUnit = 1;

const moveRecord: Record<Key, Move> = {
	ArrowDown(p) {
		p.position.y -= movementUnit;
	},
	ArrowLeft(p) {
		p.position.x -= movementUnit;
	},
	ArrowRight(p) {
		p.position.x += movementUnit;
	},
	ArrowUp(p) {
		p.position.y += movementUnit;
	},
} as const;
```

Seems a lot like the first example. Next, we'll need to create the listener function. It might be handy to create a higher order function to do this so that the listener can be created from any record of this shape.

```typescript
const character = new Chracter(); // character implements Positionable

const createKeyListener = (moveRecord: Record<Key, Move>) => {
  return (event: KeyboardEvent) => {
    const { key } = event;
    // typeof `key` is string so it has to be narrowed to index into `moveRecord`
    if (isArrowKey(key))
      moveRecord[key](character);
    }
  };
};
```

Then the listener can br created and added / removed like so.

```typescript
const listener = createKeyboardListener(moveRecord);

window.addEventListener('keydown', listener);
window.removeEventListener('keydown', listener);
```

I don't want to admit it but this might be a little more complex for no apparent gain BUT nevertheless it can sometimes be handy to separate things out.

This may be a case where a **Map** is preferred especially if you want to dynamically add and remove "key handlers".

```typescript
const createKeyListener = (moveMap: Map<string, Move>) => {
	return (event: KeyboardEvent) => {
		moveMap.get(event.key)?.(character);
	};
};

const map: Map<string, Move> = new Map();
const listener = createKeyListener(map);
```

The benefit of doing it this way is that you can set up the listener now and add/remove entries from the map at any time. It's completely dynamic.

## that's that

If you made it this far, thanks for sticking around through this hodge-podgy article. Hopefully it was interesting and to be clear, I'm not really advocating the use of records or maps in place of switches. I think both appeoaches are perfectly fine.
