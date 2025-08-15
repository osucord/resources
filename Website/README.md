# osu! Game Resources Website

This is the code for the website component of the resource list, built with **Astro** and compiled to static files.

It uses the `content.md` file in the repository root to generate pages, and any updates to that file are automatically reflected on the site.

When changes are merged into the `main` branch, the site is rebuilt and deployed to **GitHub Pages**.

The website is available here: [osu! game resources](https://resources.osucord.moe)

## Development

Prerequisites:
- Install **Node.js 22** or later.
- Optionally install Astro CLI using `npm install -g astro`, if you need to add new astro integrations

Setup:
1. Clone the repository
2. Navigate to the website directory using `cd Website`
3. Run `npm install` to install the dependencies
4. Run `npm run dev` to start the development server

When the changes are ready, make sure to run `npm run build` to check if the website compiles correctly. Some features may work in development mode but not when building the website.
