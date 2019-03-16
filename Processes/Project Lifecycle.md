Project Lifecycle
================

Having a standardized project lifecycle will allow us to execute projects quickly and with quality. If we move straight to project execution without going through rigorous planning and leadership roles, we'll likely ship disorganized code and have no recourse when new obstacles are discovered.

### What Projects Does This Apply To?

I'm glad you asked. Rather than being prescriptive here about what is / is not a project, let's say that any "projects" that come out of our all-hands product planning meeting should go through this process. This process does _not_ apply to short term iterative work, bug work, or "active investigation" product research (fleshed out below).

### TL;DR

- [Prioritize a project](#1----prioritization)
- [Pick leads to own what, why, how, and how long](#2----project-leads)
- [Gather a team and identify project milestones and dependencies](#3----kickoff)
- [Design an execution plan](#4----scoping)
- [Build and ship](#5----execution)
- [Be a proud owner of your work](#6----measurement--ownership)

------------------------------------------

## Pre-project Work

Before a project becomes a project, it exists just as a collection of ideas and information. There are primarily two ways of sourcing this information as pre-work to aggregating the data into a logical project.

### Passive Ideation

We are constantly collecting information about possible features to build without necessarily being explicit about the goal of turning that information into a project. Passive ideation sources are things like:

  - Product feedback
  - Feature requests
  - External commitments

External commitments often get handed down as priority items, but still with a vague enough definition that they aren't quite yet a project, and should still be addressed in the same format as all of the others in the lifecycle stages.

### Active Investigation

In addition to passive information collection, there is often work being done in a more active fashion that could lead to the creation of a project. Investigation work should always be timeboxed to prevent it from running away from you, but as long as the time scale is short, can be done in a more informal way. Examples of active investigations include:

  - User research
  - Technical debt identified during domain meetings
  - Data science around interesting questions
  - Promising hack day work

When active investigations go well, there is a strong impulse to move straight to product execution, but it is especially important that work coming out of active investigation projects does not skip steps in the lifecycle stages. Without dedicated leads and a team approved scope, the work will likely end up accruing a dangerous amount of technical debt.

With that in mind, let's go through the stages in the order they should be hit.

------------------------------------------

## Project Lifecycle Stages

Once a project has moved from nascency to an actual project, it's ready to be assigned a stage to capture its progress. The stages are broken out into six distinct project phases to make it clear what exactly is needed going in and coming out.

### 1 -- Prioritization

Project identified as a priority for the entire team during product planning. Projects can be aggregated from information collected as pre-project work, but until they have been prioritized and committed to as part of a product planning exercise, there is little need to address them as part of the lifecycle process. Reference points for product planning:

  - [Spring 2016 product planning](https://docs.google.com/presentation/d/1zZzC5Ydu9eEw_vAvrQaz1FLFsJk-yA1zc0sh9bfIPR0)
  - [Spring 2016 RICE roadmap](https://docs.google.com/spreadsheets/d/1sOfCJLPK6bwNqzFPVLb_sxLf5LajE1-p-Ouk3sMP5mo)

### 2 -- Project Leads

Define clear ownership of project responsibilities. Depending on the scale of a project, *one person can own all of the management responsibilities*, but in the cases where there are two, it is good to break out the distinct responsibilities between product and technical.

  - **Product lead**: owns the *what* and *why* of a project, relevant artifacts:
    - establish and track success metrics
    - product vision, examples:
      - [Tour Planning Retro and Future](https://docs.google.com/presentation/d/1TsuIVRfkhsxaUEDd8YQCno840Ub0W1VEmxB1CWjKGRU), Q4 2015
      - [Alerts Overview and Vision](https://docs.google.com/presentation/d/1DyHTGeLQHLoQzyTAlrUG1w8c54Kx4Kew9B4XrVfoRSM), June 2016
      - [AMP2 Overview](https://docs.google.com/presentation/d/1dQTearT9QICHvzTkx8LB3Ktc4kvHig_MzA6FM4P_f0s), April 2016
    - user stories, who is this product/feature for?
    - feature requirements (often encompassed in vision documents)
    - assessing potential business/tech/design risks (often encompassed in vision documents)
  - **Technical lead**: owns the *how to* and *how long* of a poject, relevant artifacts:
    - complexity estimation on task items, i.e. how complicated is it and how long will it take to complete? (if not the expert, responsible for collecting the necessary information from the experts)
    - JIRA ticket refresentation of work to complete
    - maintaining the accuracy of technical roadmaps, examples:
      - [Direct Deal Reporting Technical Roadmap]
      - [Data Pipeline Monitoring]
    - technical release planning, i.e. what *has* to be done before the next release begins?
  - Shared ownership (at kickoff, leads should decide who owns what)
    - calling standups and check-ins
    - meeting notes & documentation
    - scheduling pre-mortems and retrospectives (can lean on TPM for these)

It is recommended that product leads stay on for the entire duration of a project, owning the post release measurements and follow up planning as well, but technical leads may switch on and off depending on the expertise necessary for a given development period. If leads switch, however, the switches should be planned in advance, and on-deck technical leads should be involved with initial release planning during the project kickoff to serve as “approvers” of the release plan following the [DACI framework](https://en.wikipedia.org/wiki/Responsibility_assignment_matrix#DACI).

### 3 -- Kickoff

Formal project kickoff with everyone who will be working on the project. The format of project kickoffs can be decided by team working on them, but the following artifacts should be an output:

  - Define who is working on the project, and in what capacity
  - Align the project team with the general project milestones, establishing whether the project will be broken up into multiple major releases or phases
  - Work out relevant project metrics
  - Reference learning reviews from previous projects
  - Identify project dependencies, external to and within Next Big Sound
  - Name any commitments, external to and within Next Big Sound

Sometimes projects will get paused due to a change in priorities. When paused projects are restarted, they should go through a kickoff again in order to confirm that former assumptions are still true and that no new dependencies have surfaced.

### 4 -- Scoping

#### 4a -- Research and Design

Before a team feels ready to establish a build scope, it may be necessary to go through a phase of research and design to explore roadmap options without committing work to one yet. We have seen this phase of exploration or uncertainty while developing the methodology for what became the Predictions and Trendsetters charts, and are seeing it again with the quantitative analysis for the alerts project.
There are no necessary artifacts to produce during this phase of a project’s lifecycle, but for many projects, it’s a non-trivial amount of work, so it requires good timeboxing and process reporting. We have found that the age old format of lab reports (hypothesis, experiment, and conclusion) to be a useful construct for organizing work during research and design. Scoping can begin when the end state of the project becomes clear.

#### 4b -- Scoping

With research and design complete, a project needs to be fully scoped. Scoping can likely be done offline, as the necessary artifacts will probably take longer to create than is feasible during a team meeting. Like kickoff, there is no standard format for scoping, but a minimum number of artifacts (more is okay):

  - First project cycle fully scoped
  - Technical roadmap, decreasing granularity of detail the farther out, to acknowledge that there will probably be new information:
    - Example with "phases": [Project Moon Travel](https://docs.google.com/document/d/1xTCuk_nzHANifIYJzkml6wS6KMFUjXp_JJw_prfExxQ)
    - Example with distinct subprojects in order: [Direct Deal Reporting Technical Roadmap]
    - Example with non-dependent work: [Data Pipeline Monitoring]

### 5 -- Execution

Once leads have been picked, a team assembled, and a scope set, it's time to execute on a project. Again, the how is up to the team, but successful projects in the past have employed regular checkins as a way to stay productive:

  - Daily checkins to align priorities and resolve blockers
  - Weekly scope check-in with project team
  - Bi-weekly scope check-in with full team (cycle planning)
  - Retrospectives / learning reviews after major milestones
  - Ship it. Ship it real good.

There may be a loop back point here to step [3] or [4]. With projects that are broken up into multiple build phases (e.g. science development and web development), it may be useful to switch technical leads between the phases and have a phase kickoff during the handoff between one group and the next. Well established acceptance criteria prior to handoffs can be the difference between smooth execution and chaos.

### 6 -- Measurement & Ownership

When the last piece of a project is shipped, that does not mean that you wipe your hands clean of it. All code and features active in the product require an owner, and in particular, being a product lead on a project means:

  - Sharing metrics two weeks after each version launch
  - Scheduling post-project retrospective
  - Planning follow up work as necessary
  - Capturing incoming ideas

Being a developer on a project in any capacity means:

  - Documenting your work
  - Planning for and paying down technical debt accrued

Be proud of what you build.


[Direct Deal Reporting Technical Roadmap]: https://docs.google.com/document/d/1XHci7lBG7yn0RXmC5jzW2M6_LU7tLe0iYmAcIgzsPKE
[Data Pipeline Monitoring]: https://docs.google.com/document/d/16IE2neiEHn88vBjU5vmsT9CW-ia3uIawTA734csz8tg
