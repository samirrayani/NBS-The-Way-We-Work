Data Engineering: Rules of Engagement
=====================================

The Agile Scrum methodology has a concept of [working agreements](https://www.scrumalliance.org/community/articles/2015/march/how-to-create-agile-team-working-agreements). 
While this document was not modeled after a formal working agreement the intentions are the same.  This document describes how the data engineering team have agreed to handle shared responsibilities, like on call rotation.

## The Team
@bigbadace
@kschrodes
@richhaase
@roycehaynes
@spucci <- changing roles
 
## On Call Rotation

* [process] If you can't work on a victorops page, reach out to someone who can work on it.
* [process] Always make a ticket for every victorops issue that comes in while you are on call.

## Alert Feedback

* [process] Pair program when fixing alerts, and update docs linked to a nagios alert on steps to resolve. If not link to resolution docs, create one.
* [process] Add documentation for alerts missing info on how to resolve. If no resolution or need help, pair with teammate in identifying proper documentation for a particular alert. 
* [process] Always look for opportunities to optimize feedback loop on alerts.

## Bugs
We agree in principle that bugs should always come first.  However, we also came up with a long list of
exceptions to that rule without even trying. So, the bullets below are ideals we will strive for rather than unbreakable rules.
        
* [process] Self select to work on bugs.
* [process] If you have a scoped bug in your queue that should be your top priority work item.
* [process] Pair with someone on bug work to help expand the knowledge base of the team and decrease time to resolutions.
