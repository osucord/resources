# osu! game resources website

This is the code for the website component of the resource list. The website is created using Astro and it's compiled to static files.

The website processes the `content.md` file in the root of the repository and generates the website based on the content of the file. Any changes to the file will be reflected on the website.

Any time changes are merged into the main branch, the website is automatically rebuilt and deployed to Github Pages.

The website is available here: [osu! game resources](https://resources.osucord.moe)

## Development

Pre-requisites:
- Make sure you have installed Node.js 22 or later
- Optionally install Astro CLI using `npm install -g astro`, if you need to add new astro integrations

Setting up:
1. Clone the repository
2. Navigate to the website directory using `cd Website`
3. Run `npm install` to install the dependencies
4. Run `npm run dev` to start the development server

When the changes are ready, make sure to run `npm run build` to check if the website compiles correctly. Some things may work in development mode but not when building the website.