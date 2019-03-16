JavaScript
==========

*This is possibly outdated and needs review.*

Linting
-------

Linters are tools that statically analyze code to check for bugs and anti-patterns. Linting code is a powerful tool to find problems in code before they makes their way into production, and at Next Big Sound all front-end JavaScript must succesfully pass a linter at least three times before it is included in the product.

We use [jshint](http://jshint.com/), probably the most popular open-source linter in existence.

### Rules

All front-end code gets linted using a universal set of rules, and then a subset of our code gets linted against a stricter superset of rules. We decided it was not worth the effort to bring all our old code into conformity with the coding standards that we've established for new code, and so we programmatically generate a strict superset of rules that takes the universal set and adds in our new strict rules for new code. We use this programmatic approach (instead of manually curating two lists) to make sure that we never accidentally forget to include a universal rule in the strict tests. It adds some time to our build process, but it is well worth it to prevent bugs from sneaking into our code.

The rules are as follows:

#### Universal

All our front end code is run against:

- latedef: 'nofunc' // forbid the use of variable hoisting, except for functions, which may be hoisted
- browser: true		// permit the use of standard browser global variables (eg `window` or `document`)
- laxbreak: true	// permit the use of linebreaks before boolean operators (ie let lines start with `&&` and `||` )
- curly: true		// require expressions to be wrapped in 'curly' braces
- freeze: true		// forbid the modification of globally provided JS prototypes
- bitwise: true		// forbid the use of bitwise operators
- immed: true		// require all IIFEs to be wrapped in parentheses

#### Strict

Strictly linted code is run against all Universal rules, and:

- strict: true		// require all code to be run in strict mode
- newcap: true		// require all constructor functions to start with a capital letter
- undef: true		// forbid the use of undeclared variables

### Process

We use a git pre-commit hook to run the universal and strict linters before any code is committed in an engineer's development environment. We run the linters again when engineers open a PR against our main repo, and again finally before we deploy any new code to our servers.
