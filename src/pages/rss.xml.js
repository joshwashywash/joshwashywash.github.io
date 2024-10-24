import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
	return rss({
		title: "josh's blog",
		description: "the site for josh oertel's blog posts",
		site: context.site,
		items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
	});
}
