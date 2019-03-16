Git
===

*This is possibly outdated and needs review.*

## Preface
This document will offer a set of guidelines on how to use Git and GitHub to effectively collaborate, with the goal of increasing the speed and quality of our development while decreasing overhead. Topics covered include: using git locally, with a particular focus on branching; GitHub's Pull Requests, where the bulk of our collaboration happens; and sample workflows, which will offer recommendations on how to accomplish common tasks, such as fixing a bug or working on a large team project.

### Contents
- [Git at Next Big Sound](#git-at-next-big-sound)
	- [Preface](#preface)
		- [Contents](#contents)
	- [Git](#git)
		- [Branching](#branching)
	- [Pull Requests](#pull-requests)
		- [Forks](#forks)
		- [Sharing Code](#sharing-code)
		- [Code Review](#code-review)
		- [Cleaning Up](#cleaning-up)
	- [Workflows](#workflows)
		- [Developing a Feature Solo](#developing-a-feature-solo)
		- [Developing a Feature with a Team](#developing-a-feature-with-a-team)
		- [Branching a non-forked repo](#branching-a-non-forked-repo)
		- [Fixing a Bug](#fixing-a-bug)


## Git
The remainder of this document will assume a basic understanding of Git. If you don't feel comfortable with Git, I highly recommend checking out this [tutorial](http://try.github.io/). Done? Cool! Let's get started.

### Branching
Say we are working on a feature that is not ready for production, and a bug comes along that we are required to fix. We have to do some pretty epic copy-and-paste maneuvers in order to fix the bug, deploy to production, and then continue developing our feature. Does this sound familiar? Enter branching.

Branching enables us to work on multiple things at once. It allows a feature to be developed without fear of it being deployed prematurely. And it allows us to jump between feature development and bug fixing at the press of a button (okay, a few buttons). Unfortunately, the one thing branching is not good at is saving the day when we don't take the time to plan ahead.

Let's go back to that feature branch we were developing,`feature1`. If we are developing on branch `feature1` and a bug comes along that we need to fix, typing `git checkout -b bug1` will create a branch with the contents of `feature1`. This is not exactly the behavior we were after. In order to isolate these two branches so that neither blocks the other, we must create `bug1` from `master`.

A careful reader will note that this means we can never have anything in `master` that is not already in production or production ready. Essentially, we should **never write any code in master**. **Ever**. Following this one simple guideline ensures that we always have a production-ready branch from which to create new branches. It also means that no matter how many features or bugs we are juggling, we will never be blocked from deploying any single one of them. Pretty cool.

Branch naming is of lesser importance, but is still something we should give some thought to. A simple one or two word name will probably suffice for feature branches. For bug branches, why come up with a name when DoneDone does that for us - `bug<#>` makes a great branch name, as it is both descriptive and unique.

## Pull Requests
Just as with Git, a basic understanding of Pull Requests is assumed. If you don't feel comfortable with Pull Requests, check out this [article](https://help.github.com/articles/using-pull-requests). You may also find this [document](https://docs.google.com/a/thenextbigsound.com/document/d/1LHAoMglF1gehkmLHyFjtcFeuhbs8DpgLKhtqNI1diT4/view) useful.

### Forks
Before we dive into Pull Requests, we also need to understand [forks](https://help.github.com/articles/fork-a-repo). A fork is your own complete copy of someone else's repository. For example, [wb/Policies](https://github.com/wb/Policies) is my own personal copy of [nextbigsoundinc/Policies](https://github.com/nextbigsoundinc/Policies). They each have their own code and set of branches; the difference is that only the code in Next Big Sound's `master` branch will wind up in production. If this is the case, how - you might ask - do you get your own code into production? Pull Requests, of course!

One last thing. Referring to the Next Big Sound repository by that name is getting old. Let's use the terms that GitHub has settled upon in their documentation: your fork is known as `origin` and the Next Big Sound repository as `upstream`.

### Sharing Code
Pull Requests are how we share code. If we need to get `origin bug1` into `upstream master`, use a Pull Request. If we need to share `origin feature1` with our team, use a Pull Request. As a general rule, Pull Requests are the only way to move code from `origin` to `upstream`.

The reverse is not true. We will often need to get `origin` in sync with `upstream`, and while a Pull Request would technically work, the best way to accomplish this is by pulling directly from the applicable branch on `upstream`.

Pull Requests must be opened from [github.com](http://www.github.com). The easiest way to open a pull request is to visit the URL corresponding to the source (usually `origin`), e.g. [https://github.com/wb/Policies](https://github.com/wb/Policies). First select the correct branch using the branch selector, and then click the green button immediately to the left. This will open a page where we can create a Pull Request, using the current branch as the source.

When creating a Pull Request, pay close attention to which branches are involved. When working on a feature with a team, we may want to create a Pull Request from `origin feature1` to `upstream feature1` to share progress. When addressing a bug, we will create a Pull Request from `origin bug1` to `upstream master` so we can get the bug fix deployed as soon as possible. Both source and destination can be edited when creating a Pull Request.

If this is getting confusing, hang in there. We will see more concrete examples of how to combine Pull Requests and Branches in the [Workflows](#workflows) section below.

### Code Review
Opening Pull Requests early and often is a great way to involve others on your team, both to solicit feedback and to provide awareness. But what exactly should a code review entail? And who should be reviewing it?

When working on a team, ask one person to review the code, but considering including the rest of your team so they are aware of the changes. If you are not working on a team, pick someone who is familiar with this part of the codebase. Consider trying out in-person reviews. They often go much faster and can result in more conversation than an asynchronous review done online.

As for what to talk about in the review, here's a sample checklist to run through - feel free to modify it to suit your needs:

- architectural issues
- correctness
- presence of tests, or evidence of manual testing
- reinventing the wheel, lack of code reuse
- consistency of style, naming conventions
- hard coding, lack of constants

### Cleaning Up
With all these branches lying around, things can get kind of messy. Luckily, GitHub provides a great way to delete old branches - whenever a Pull Request is merged, a link is provided to delete the source branch. This is particularly helpful when creating a branch for each bug. Note that this only deletes the branch on [github.com](http://www.github.com). You will also have to delete the branch locally.

## Workflows
Now that we've gone over best practices for both Git and Pull Requests, let's put it all together with a few sample workflows. These were picked because they come up often. If there there is a common workflow that slipped by, create a [Pull Request](https://github.com/nextbigsoundinc/Policies/compare/)!

### Developing a Feature Solo
As always, the first thing to do is to create a branch! Off of master, of course.

```
git checkout master
git checkout -b feature1
```

Depending on the size of the feature, we may also want to create a corresponding branch on the `upstream` repository. Doing so will allow us to make incremental Pull Requests from `origin feature1` to `upstream feature1` and get feedback before we are ready to deploy. In order to make this branch on `upstream`, we will need to use the interface on [github.com](http://www.github.com); when searching for a branch in the branch selector that does not yet exist, we will be given the option to create it.

With our branches set up, development work progresses as usual. If using the optional branch on `upstream`, make a Pull Request periodically to gather some feedback. This type of feedback is particularly important when working alone.

If our change is slated for `master`, pulling in `upstream master` periodically will help ensure a successful final merge.

```
git pull upstream master
```

To keep things simple for the reviewers, it is best to pull in `upstream master` when you have no outstanding changes, so that the pull request can be simply titled "pulling in master". Combining your changes with an update from `upstream master` can be confusing when it comes time to figure out what changes were actually made by you.

When development is complete, we make a Pull Request from `origin feature1` to `upstream master`, do one last review of the entire change, and merge!

### Developing a Feature with a Team
*Developing a feature with a team is very similar to [developing a feature solo](#developing-a-feature-solo). The only difference is that with a team, the branch on the `upstream` repository is now required.*

As always, the first thing to do is to create a branch! Off of master, of course.

```
git checkout master
git checkout -b feature1
```

We also need to create a corresponding branch on the `upstream` repository. This branch will serve as the synchronization point between team members. In order to make this branch on `upstream`, we will need to use the interface on [github.com](http://www.github.com); when searching for a branch in the branch selector that does not yet exist, we will be given the option to create it.

With our branches set up, each team member can now begin working on their own `origin feature1`. When we have code ready to be shared with the team, a Pull Request is opened from `origin feature1` to `upstream feature1`. Once merged, other team members get this code by pulling from `upstream feature1`.

```
git pull upstream feature1
```

If our change is slated for `master`, pulling in `upstream master` periodically will help ensure a successful final merge.

```
git pull upstream master
```

To keep things simple for the reviewers, it is best to pull in `upstream master` when you have no outstanding changes, so that the pull request can be simply titled "pulling in master". Combining your changes with an update from `upstream master` can be confusing when it comes time to figure out what changes were actually made by you.

When development is complete, and all code lives in `upstream feature1`, we make a Pull Request from `upstream feature1` to `upstream master`, do one last review of the entire change, and merge!

### Branching a non-forked repo
Let's suppose you're working on a project with no upstream repository (this is the case with NBS-JVM).  You can still use branches!  You'll create the branch in the same way

```
git checkout master
git checkout -b feature1
git push origin feature1
```

Now, when another team member wants to create their version of this branch they can do it with a single git command

```
git pull origin master
git checkout -b feature1 origin/feature1
```

(you need to make sure you're up to date with master before you checkout the branch)

### Fixing a Bug
*Fixing a bug can be approached in the same way as [developing a feature solo](#developing-a-feature-solo). However, it is usually not necessary to create a corresponding bug branch on `upstream`.*

As always, the first thing to do is to create a branch! Off of master, of course.

```
git checkout master
git checkout -b bug1
```

With our branch set up, development work progresses as usual.

If our change is slated for `master`, pulling in `upstream master` before creating the Pull Request will help ensure a successful merge.

```
git pull upstream master
```

When development is complete, we make a Pull Request from `origin bug1` to `upstream master`, do a review of the entire change, and merge!
