# React + TypeScript + Vite + Vitest + React Testing Library + Tailwind CSS

This project is based on a [Vite](https://vitejs.dev/) project bootstrapped with [`create-vite`](https://github.com/vitejs/vite/tree/main/packages/create-vite) from `react-ts` template (React + TypeScript).

The goal is an **enhanced developer experience** with pre-configured tools to ensure code quality and consistency and boost productivity.

On top of the default Vite + React + Typescript setup, this starter project includes:

- **[Custom ESLint configuration](https://github.com/stsiarzhanau/eslint-config-nextjs-typescript)** with extended TypeScript support and additional rules for Tailwind CSS, Vitest, React Testing Library and more;
- **.editorconfig file**;
- **Prettier configuration** with special formatting rules for Tailwind CSS;
- **Pre-commit hook** to lint and format staged files on commit with husky and lint-staged;
- **Environment for unit tests** with Vite and React Testing Library.

## Getting Started

Clone this repository. Cloning the repository will download all files including the configuration files and scripts needed to run and develop the project locally.

`cd` to the project directory and initialize new Git repository by running `rm -rf .git && git init`.

Hint: You can also use [degit](https://github.com/Rich-Harris/degit) to make a copy of this repository. (This is much quicker than using `git clone`, because you're not downloading the entire git history). Just install degit globally with `npm install -g degit` and run `degit stsiarzhanau/vite-react-app-starter#main <name-of-folder-for-your repo>` from the directory where you keep your projects. Then `cd` to the project directory and initialize new Git repository by running `git init`.

Run `npm install` to install dependencies.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the running application.

You can start editing the page by modifying `src/App.tsx`. The page auto-updates as you edit the file.

## Code linting and formatting

#### Code linting and formatting - General

```json
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
"lint:fix": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --fix",
"format:check": "prettier . --ignore-unknown --check",
"format": "prettier . --ignore-unknown --write",
```

`npm run lint` - will run ESLint to lint all `.ts` and `.tsx` files except specified in `.eslintrc.cjs` `ignorePatterns`.

`npm run lint:fix` - will run ESLint to lint all `.ts` and `.tsx` files except specified in `.eslintrc.cjs` `ignorePatterns` and automatically fix all the found issues that can be automatically fixed.

`npm run format:check` - will run Prettier to check formatting for all files in the project according to the Prettier configuration. This command does not modify any files and only outputs the list of files that have formatting issues.

`npm run format` - will run Prettier to format all files in the project according to the Prettier configuration.

To lint and format files that are staged for commit a pre-commit hook is configured using husky and lint-staged. If there are some issues with linting or formatting the hook will try to autofix and format code and then make a commit. If issues cannot be autofixed, commit will be aborted. If autofix completely reverts all changes, commit will also be aborted.

**To get most of this setup when working in team it's highly recommeded for each contributor to have EditorConfig, Prettier and ESLint plugins / extensions installed and enabled in their editor / IDE. For ESLint extension it's recommended to enable autofix on file save, for Prettier - format on file save (and optionally on type / paste). This will ensure code is formatted and linted consistently across all contributors.** Example setup for Visual Studio Code IDE is described in a separate section of this README.

As some contributors may have some issues with editor / IDE extensions or with Git hooks, it's also recommended to run `npm run lint` and `npm run format:check` as part of CI pipeline to ensure code is properly formatted and linted.

#### Code linting and formatting - Import sorting

There are different plugins for both ESLint and Prettier to perform import sorting. For this starter [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) was chosen as IMHO it's really very simple to configure and does it's job amazingly. Also it has a great documentation.

#### Code linting and formatting - Tailwind CSS

Both ESLint (via [eslint-plugin-tailwindcss](https://github.com/francoismassart/eslint-plugin-tailwindcss)) and Prettier (via [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)) are used to lint and format Tailwind CSS code. ESLint plugin check things like deprecated class names, invalid class names, etc. Prettier plugin sorts and properly formats Tailwind CSS classes.

> To get the best possible DX with Tailwind CSS it's also highly recommended to install editor / IDE extension that adds intellisense for Tailwind classes. For example for Visual Studio Code such extension is [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).

## Test environment (unit tests)

```json
"test": "vitest",
"test:run": "vitest run",
"test:ui": "vitest --ui --coverage",
"coverage": "vitest run --coverage"
```

`npm test` - will run Vitest in watch mode. When you modify your source code or the test files, Vitest smartly searches the module graph and only reruns the related tests instead of rerunning all tests.

`npm run test:run` - will perform a single tests run without watch mode.

`npm run test:ui` - can be used instead of (or alongside with) `npm test` to run Vitest in watch mode and output test results (and optionally code coverage) in a browser tab (using [Vitest UI](https://vitest.dev/guide/ui.html#vitest-ui)) instead of a terminal window.

`npm run coverage` - will generate code coverage reports using Vitest and output them to the `coverage/` directory.

This starter uses [Vitest](https://vitest.dev/guide/why.html) as a test runner. It has Jest compatible API, but it's faster and easier to configure than Jest. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) (with additional matchers from [jest-dom](https://github.com/testing-library/jest-dom) enabled) is used for component testing. [user-event](https://testing-library.com/docs/user-event/intro/) (a companion library for Testing Library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser) is also installed and can be used without any additional configuration.

[happy-dom](https://github.com/capricorn86/happy-dom) is used by default as testing environment to test React components. [jsdom](https://github.com/jsdom/jsdom) is also installed as a fallback if happy-dom is not sufficient for some tests. You can also set environment on per-file basis using [control comments](https://vitest.dev/guide/environment.html#environments-for-specific-files).

#### Test environment (unit tests) - config and setup files

`vitest.config.ts` - main Vitest [configuration file](https://vitest.dev/config/)

`vitest-setup.ts` - setup file that configures React Testing Library to be used with Vitest and jest-dom. You

`src/test-utils.tsx` (not included by default) - in your project you might want to create a [shared test utils file](https://testing-library.com/docs/react-testing-library/setup) to define common utilities, mocks and custom render method. It's not included by default as it's better to define such things on per-project basis due to different project requirements.

> Note: you can use AI tools to generate test files and test cases automatically based on your code. One such tool is [Cody AI](https://marketplace.visualstudio.com/items?itemName=sourcegraph.cody-ai) Visual Studio Code extension which is not only able to generate test boilerplate for a provided source file or code snippet but also tries to understand your whole codebase (incl. test setup files and `package.json`) to [generate meaningful test cases](https://docs.sourcegraph.com/cody/use-cases/generate-unit-tests) with proper mocks, assertions and edge cases. As a rule, your guidance is still required to review the generated tests and make necessary adjustments, but in a whole such approach can save a lot of time and effort compared to writing tests from scratch.

## Example Visual Studio Code setup

Here is an example of recommended VS Code extensions and settings to enhance your development experience when working on projects based on this starter:

#### Extensions:

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Formatting Toggle](https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle)

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

- [Vitest](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)

- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

- [Cody AI](https://marketplace.visualstudio.com/items?itemName=sourcegraph.cody-ai)

#### Settings:

```jsonc
{
  /* Sets "Prettier - Code formatter" extension as a default formatter */
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  /* Turns on formatting only if a project contains Prettier configuration file */
  "prettier.requireConfig": true,
  /* Turns on formatting on save / paste / type */
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": true,
  /**
   * Code formatting settings.
   * Both .editorconfig and Prettier override this settings, so they are just a fallback.
   */
  "editor.tabSize": 2,
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,

  /* Turn on autofix on save for ESLint */
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
  },

  /* Suggested in "Tailwind CSS IntelliSense" extension documentation */
  "editor.quickSuggestions": {
    "strings": true,
  },

  /* Suggested in "Path IntelliSense" extension documentation */
  "typescript.suggest.paths": false,
  "javascript.suggest.paths": false,
}
```
