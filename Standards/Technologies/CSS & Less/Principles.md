CSS & Less: Guiding Principles
==============================

- [Patterns, Not Pages](#patterns-not-pages)
- [Single Responsibility](#single-responsibility)
- [Low, Targeted Specificity](#low-targeted-specificity)



Patterns, Not Pages
-------------------

#### CSS should implement reusable patterns rather than one-off styles.

CSS should be authored with a goal to be reused everywhere. Consequently, reusable CSS requires a consistent design language.

<a name="patterns-example"></a> Buttons are a great example of a component that should be implemented as a reusable pattern. However, one often sees buttons with CSS classes that are "semantic" but not very reusable:

```html
<button class="upgrade-button">Upgrade Now</button>
<button class="save-button">Save</button>
<button class="delete-button">Delete</button>
```
```css
.upgrade-button {
	width: 100%;
	padding: 14px 21px;
	font-size: 14px;
	font-weight: bold;
	color: white;
	background: green;
}
.save-button {
	width: 50%;
	padding: 12px 18px;
	font-size: 12px;
	color: black;
	background: gray;
}
.delete-button {
	padding: 10px 15px;
	font-size: 10px;
	color: white;
	background: red;
}
```

What if we want another button that looks like `.save-button` button but does something other than saving? Or with different width? Do we use the `save-button` class with another that overrides it, or do we copy and modify the CSS for `.save-button` under a new class name? Neither keeps the CSS particularly easy to understand, maintain, or reuse.

A better approach is to define a common grid and base button styles, with specific classes that can be "mixed in" for optional button traits like type and size:

```html
<button class="button button--success button--large span-10-columns">Upgrade Now</button>
<button class="button button--success span-5-columns">Save</button>
<button class="button button--danger button--small">Delete</button>
```
```css
/* 10-column grid system */
...
.span-6-columns { width: 60%; }
.span-5-columns { width: 50%; }
.span-4-columns { width: 40%; }
...

/* Base button styles */
.button {
	padding: 1em 1.5em;  /* In em units so they scale with the font size */
	font-size: 12px;
	color: black;
	background: gray;
}

/* Type mixins */
.button--success {
	color: white;
	background: green;
}
.button--danger {
	color: white;
	background: red;
}

/* Size mixins */
.button--large {
	font-size: 14px;
	font-weight: bold;
}
.button--small {
	font-size: 10px;
}
```



Single Responsibility
---------------------

#### A CSS class should have a single, clear responsibility.

A class should do one job well and one job only. Multiple classes&mdash;each with a single, clear purpose&mdash;are more reusable and [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) than a single CSS class that does multiple unrelated things. It is also easier to add or remove CSS classes than it is to copy or override CSS styles.

Find the reusable patterns within a multitasking CSS class, and extract them as separate CSS classes that can be mixed in. The [previous button example](#patterns-example) is also a good example of this.



Low, Targeted Specificity
-------------------------

#### A CSS selector should minimize the HTML that is both necessary for it and that can be affected by it.

Changes to HTML should rarely require any changes to the CSS that styles it. Selectors containing many HTML tags, attributes, IDs, or classes will produce tightly coupled HTML and CSS that is difficult to maintain, reuse, and extend.

Let's say we're given:

```html
<div id="#wrapper">
	<section>
		<h2 class="heading">My Awesome Heading</h2>
		<p>
			Blah blah <span>(a fancy tooltip)</span>
		</p>
	</section>
	<section> ... </section>
	<section> ... </section>
	...
</div>
```
```css
div#wrapper > section { /* Section item styles */ }
div#wrapper section h2.heading { /* Section heading styles */ }
div#wrapper section > p span { /* Section tooltip styles */ }
```

With these CSS selectors, nearly any change to the HTML structure will require a corresponding change to the CSS selectors:

- Using a `<ul>` with `<li>`s instead of the wrapper `<div>` and `<section>`s
- Wrapping the `<section>` content in an inner wrapper `<div>`
- Using an `<h3>` instead of an `<h2>`

In addition, the `div#wrapper section > p span` CSS selector has an unnecessarily broad scope: it applies to *any* `<span>` within the paragraph. Unrelated elements such as icon `<span>`s will be unintentionally and unexpectedly styled as tooltips.

Instead using high-specificy selectors, use reusable patterns with only CSS classes:

```html
<div>
	<section class="section">
		<h2 class="section__heading">My Awesome Heading</h2>
		<p class="section__content">
			Blah blah <span class="section__tooltip">(a fancy tooltip)</span>
		</p>
	</section>
	<section class="section"> ... </section>
	<section class="section"> ... </section>
	...
</div>
```
```css
.section { /* Section item styles */ }
.section__heading { /* Section heading styles */ }
.section__tooltip { /* Section tooltip styles */ }
```

If the tooltip is not restricted to only living within a `.section`, then it should be abstracted into its own reusable pattern:

```html
Blah blah <span class="tooltip">(a fancy tooltip)</span>
```
```css
.tooltip { /* Tooltip styles */ }
```
