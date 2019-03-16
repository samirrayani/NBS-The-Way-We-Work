CSS & Less: Selectors
=====================

*This is possibly outdated and needs review.*

- [Overview](#overview)
- [Blocks](#blocks)
- [Elements](#elements)
- [Modifiers](#modifiers)
- [Nesting](#nesting)
- [IDs, Tags, Attributes](#ids-tags-attributes)
- [Pseudo Selectors and Elements](#pseudo-selectors-and-elements)



Overview
--------

#### We use the BEM framework for naming and structuring CSS selectors.

BEM is a modular, composable framework that pairs well with a component-based design language. BEM promotes a class-based CSS selector structure comprised of *Blocks*, *Elements*, and *Modifiers* (BEM):

- **Block:** A reusable, self-encapsulated component that can contain individual *elements* and other *blocks*.
- **Element:** A dependent part of a block.
- **Modifier:** An optional state or property of a block or element.



Blocks
------

#### A *block* is a self-encapsulated component that can contain individual *elements* and other *blocks*.

A block is represented by a CSS class. To differentiate it from third-party CSS classes, a block's class name should be in [PascalCase](http://msdn.microsoft.com/en-us/library/x2dbyw72(v=vs.71).aspx) and prefixed with `nbs`. This mirrors our naming convention for Angular directives, which are a JavaScript analogue to BEM blocks.

```html
<button class="nbsButton"> ... </button>
```
```css
.nbsButton { ... }
```



Elements
--------

#### Blocks are made up of individual *elements*.

An element is represented by a camelCase CSS class, prefixed with the block class name and two underscores (`__`).

```html
<button class="nbsButton">
	<span class="nbsButton__label">
		<span class="nbsButton__icon"> ... </span>
		...
	</span>
</button>
```
```css
.nbsButton { ... }

/* Elements */
.nbsButton__label { ... }
.nbsButton__icon { ... }
```

Regardless of how deeply nested an element is, its class should only be prefixed with the block name.

```css
/* Bad */
.nbsButton__label__icon { ... }

/* Good */
.nbsButton__icon { ... }
```

If you find yourself needing an additional level of underscore-based nesting, it probably means that one of the elements should actually be an independent block.



Modifiers
---------

#### A *modifier* is an optional state or property of a block or element.

A modifier is represented by a camelCase CSS class, prefixed with the block class name and two dashes (`--`).

```html
<button class="nbsButton nbsButton--large nbsButton--success">
	<span class="nbsButton__label">
		<span class="nbsButton__icon"> ... </span>
		...
	</span>
</button>
```
```css
.nbsButton { ... }
.nbsButton__label { ... }
.nbsButton__icon { ... }

/* Modifiers */
.nbsButton--large { font-size: 1.2em; }
.nbsButton--success { background: green; }
```


##### Modifiers with Elements
Block modifiers can be used to affect inner elements as well. This is one of the few times when classical CSS nesting is appropriate.

```html
<button class="nbsButton nbsButton--large">
	<span class="nbsButton__label"> ... </span>
</button>
```
```css
.nbsButton--large .nbsButton__label { font-weight: bold; }
```


##### Simpler Modifiers with Less
Note that the base block class `nbsButton` must be present even when a modifier class `nbsButton--large` is used. To eliminate this redundancy, we can leverage Less `extend()` to inherit a modifier class from the base block class.

```html
<button class="nbsButton--large">  <!-- No "nbsButton" class -->
	<span class="nbsButton__label"> ... </span>
</button>
```
```css
/* Less */
.nbsButton--large {
	&:extend(.nbsButton);
	font-size: 1.2;
}

/* Equivalent CSS */
.nbsButton, .nbsButton--large { /* Base button styles */ }
.nbsButton--large { font-size: 1.2; }
```



Nesting
-------

#### Avoid CSS or Less nesting in selectors.

###### Bad:

```html
<table class="data-table">
	<tbody>
		<tr>
			<td>
				1234
				<span>Cell Annotation</span>
			</td>
		</tr>
		...
	</tbody>
</table>
```
```css
/* Less */
table.data-table {
	tbody {
		tr {
			td {
				span { ... }
			}
		}
	}
}

/* Equivalent CSS */
table.data-table tbody tr td span { ... }
```

###### Good:

```html
<table class="nbsDataTable">
	<tbody>
		<tr>
			<td>
				1234
				<span class="nbsDataTable__cellAnnotation">Cell Annotation</span>
			</td>
		</tr>
		...
	</tbody>
</table>
```
```css
.nbsDataTable__cellAnnotation { ... }
```



IDs, Tags, Attributes
---------------------

#### Avoid IDs, tag names, and attributes in selectors.

###### Bad:

```html
<form id="signup-form">
	<input type="text" name="name">
	<input type="email" name="email">
	<textarea name="message"><textarea>
	<input type="submit" value="Send">
</form>
```
```css
#signup-form { ... }
#signup-form input[type="text"], #signup-form input[type="email"], #signup-form textarea { ... }
#signup-form [type="submit"] { ... }
```

###### Good:

```html
<form class="nbsForm">
	<input type="text" name="name" class="nbsForm__input">
	<input type="email" name="email" class="nbsForm__input">
	<textarea name="message" class="nbsForm__input"><textarea>
	<input type="submit" value="Send" class="nbsForm__submit">
</form>
```
```css
.nbsForm__input { ... }
.nbsForm__submit { ... }
```



Pseudo Selectors and Elements
-----------------------------

#### Use pseudo-selectors and pseudo-elements instead of dedicated markup when possible.

###### Bad:

```html
<p><span class="drop-cap">T</span>he quick brown fox jumped over the lazy dog.</p>
```
```css
.drop-cap { ... }
```

###### Good:

```html
<p class="has-drop-cap">The quick brown fox jumped over the lazy dog.</p>
```
```css
.has-drop-cap:first-letter { ... }
```
