# Open Social World Website
This is the website for the Open Social World project. It is built with Next.js and hosted on Github Pages.
The github workflow is set up to automatically deploy the website when changes are pushed to the `main` branch.

## Getting Started

First, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
As of now, the home page is 404, but you can visit first articles page at [http://localhost:3000/articles/psn](http://localhost:3000/articles/psn).


## Editing the articles

The articles are written in [mdx format](https://mdxjs.com), which is a superset of markdown, and stored in the `content/articles` directory. You can start editing the articles by modifying the markdown files in this directory. To add a new article, create a new markdown file in the `content/articles` directory.

## Commit and push changes
Before pushing changes, make sure to run the following command to build the website:

```bash
bun run build
```

This command lints and builds the website. If there are any errors, fix them before pushing the changes.
When you make changes, please push to a new branch and create a pull request instead of pushing directly to the `main` branch.