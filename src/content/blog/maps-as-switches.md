---
date: 2022-08-05
description: a demonstration of how javascript's switch statements and map types are sometimes interchangable
title: maps as switches
---

Imagine you're programming a game and there's a character in the game that says different things depending on what kind of monster you show them. A switch statement can get this job done.

Before we go any further, I want to declare some types that will be used throughout the code examples.

```typescript
type Handler = () => void;

type Kind = 'bug' | 'fire' | 'flying' | 'water';
```

Okey dokey. Now we're ready.

```typescript
const speak = (kind: Kind) => {
	switch (kind) {
		case 'bug':
			console.log("Unless you're Cutiefly, I don't want you.");
			break;
		case 'flying':
			console.log('Fly away little moth! Fly away!');
			break;
		default:
			console.log(`Lol what? That's not even a type!`);
	}
};

const kind: Kind = 'flying';

speak(kind);
```

There's nothing wrong with this code but if you're like me you'll start to see a pattern. Underneath every **case** there is a bit of code that needs to be ran if the case clause matches the evaluated switch expression. What if we think about the statements under each case as a procedure? With that mindset, you can think of a switch as a _map_ from the current state of something to a procedure that immediately handles it. Let's see if we can _map_ **switch** to JavaScript's **Map**. (See what I did there?)

> If you're unfamiliar with Map, it is essentially JavaScript's version of a hash table / dictionary.

## switching to map

We know we want to map some state to a procedure or function and immediately call it. Let's set up our map first and then we'll see how we can use it like a switch.

```typescript
const map = new Map<Kind, Handler>([
	[
		'bug', // case 'bug'
		() => {
			console.log("Unless you're Cutiefly, I don't want you.");
		},
	],
	[
		'flying', // case 'flying'
		() => {
			console.log('Fly away little moth! Fly away!');
		},
	],
]);
```

Here we're mapping the value of a _Kind_ to a function that we can grab hold of and call later on.

```typescript
const kind: Kind = 'flying';

if (map.has(kind)) {
	const handler = map.get(kind) as Handler;
	// ts will error without the type assertion above
	handler();
} else {
	// default
	console.log(`Lol what? That's not even a type!`);
}
```

And here we check if _kind_ is in the map. If it is, we'll get back a function that we can call; our _case_ in this case. If not, we can run some _default_ code.

> If you're interested in the details of the type assertion you can read more about it at the end of this article in the [PostScript section](#ps).

So are there any benefits to using a map over a switch? Maps have constant lookup time but in small cases I don't think you'll notice any difference. I've heard that in some languages the compiler is smart enough to convert a switch into a lookup table but I'm not sure if the same optimization can be done with interpreted languages like JavaScript or Python.

I think one place where a map might have an advantage over a switch is its ability to dynamically add and remove keys (**handlers** in this case). As far as I know there's no way to do the same thing with switches.

Ultimately I'd say it's probably a matter of preference. I prefer the `map` way of doing things because I like being different for no reason. Let's go over another example.

## keyboard event handling

Imagine (again) that you're developing a game and you want to use key presses to move your character around.

```typescript
// save the handler in a callback in case it needs to be removed later on.
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

// window.removeEventListener('keydown', onKeydown);
```

Seems pretty straightforward -- check the key and run the code under the corresponding case clause.

What does it look like if we use a map? First we'll create the map.

```typescript

type Move: (character: Character) => void;

const map = new Map<string, Move>([
	[
		'ArrowDown',
		(c) => {
			// move character down
		},
	],
	[
		'ArrowLeft',
		(c) => {
			// move character left
		},
	],
	[
		'ArrowRight',
		(c) => {
			// move character right
		},
	],
	[
		'ArrowUp',
		(c) => {
			// move character up
		},
	],
]);
```

Seems a lot like the first example. Next, we'll need to create the listener function. I think it might be handy to create a higher order function to do this so that we can create a listener from any map of this shape.

```typescript
const character = new Chracter();

const createKeyboardListener = (map: Map<string, Handler>) => {
	return (event: KeyboardEvent) => {
		const { key } = event;
		if (map.has(key)) {
			const move = map.get(key) as Handler;
			move(character);
		}
		// no default
	};
};
```

Then you can create the listener and attach / detach it like so.

```typescript
const listener = createKeyboardListener(map);

window.addEventListener('keydown', listener);

// window.removeEventListener('keydown', listener);
```

I don't want to admit it but this might be a little more complex for no apparent gain BUT nevertheless I think it is pretty handy to separate everything out like this.

## that's that

If you made it this far, thanks for sticking around through this hodge-podgy article. Hopefully it was interesting and to be clear, I'm not really advocating the use of maps in place of switches. I think both switches and maps are perfectly fine and just wanted to share something I've been thinking about.

## p.s.

In the examples above, you might be wondering why there is an extra check for the existence of the key in the map before getting the corresponding value out of it. _Map.get_ will return _undefined_ if the key is not in the map. This can be problematic in some contexts if _undefined_ is a valid value or in cases where a boolean is expected. Values like _undefined_ and _null_ are converted to **false** when used as booleans. I could come up with a contrived example but just trust me that you shouldn't assume your keys will always be in your map.
