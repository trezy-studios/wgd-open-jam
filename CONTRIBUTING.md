# Contributing

You want to contribute to the project? Awesome!

## Things to know

By contributing to this repository, you are expected to know and follow the rules laid out in our [Code of Conduct][coc].

**Working on your first Pull Request?**
[How to Contribute to an Open Source Project on GitHub][egghead]





## How do

* Project setup?
	[We've got you covered!](#project-setup)

* Found a bug?
	[Let us know!][bugs]

* Want a new feature?
	[Hook us up with the deets!][feature-request]

* Patched a bug?
	[Make a PR!][new-pr]





## Project setup

<!-- 1. Install Yarn v2 (if you haven't already). Instructions can be found [here][yarn2install]! -->
1. Fork and clone the repo
1. Run `yarn install` to install Node dependencies
1. Run `yarn start` to start up the dev server
1. Create a branch for your PR

**NOTE:** Use of NPM is **NOT** supported by this repository.

> Tip: Keep your `main` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/trezy-studios/wgd-open-jam.git
> git fetch upstream
> git branch --set-upstream-to=upstream/main main
> ```
>
> This will add the original repository as a "remote" called "upstream,"
> Then fetch the git information from that remote, then set your local `main`
> branch to use the upstream main branch whenever you run `git pull`.
> Then you can make all of your pull request branches based on this `main`
> branch. Whenever you want to update your version of `main`, do a regular
> `git pull`.





## Being added as a contributor

When you create your first PR we will add you as a contributor as per [All Contributors][all-contributors] convention.
If you have made a bug report, you will be added along with the PR that fixes the bug. (Assuming you have a GitHub account!)

If you do not wish to be added, please let us know.





[all-contributors]: https://allcontributors.org
[bugs]: https://github.com/trezy-studios/wgd-open-jam/issues/new?assignees=&labels=bug&template=bug_report.md&title=
[coc]: CODE_OF_CONDUCT.md
[feature-request]: https://github.com/trezy-studios/wgd-open-jam/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=
[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[new-pr]: https://github.com/trezy-studios/wgd-open-jam/compare
[yarn2install]: https://yarnpkg.com/getting-started
