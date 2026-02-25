import type { APIRoute } from "astro";
import { experimental_AstroContainer } from "astro/container";
import { getEntry } from "astro:content";
import mdxRenderer from "@astrojs/mdx/server.js";

import {
	getWorkPageDescription,
	getWorkPageTitle,
} from "../../../lib/work";
import WorkPage from "../../work/[slug].astro";

export const GET: APIRoute = async ({ params }) => {
    const { slug } = params;

    if (!slug) {
        return new Response(
            JSON.stringify({ error: "Slug is required" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    const entry = await getEntry("work", slug);

    if (!entry) {
        return new Response(
            JSON.stringify({ error: "Work entry not found" }),
            {
                status: 404,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    try {
        const container = await experimental_AstroContainer.create();
        container.addServerRenderer({ renderer: mdxRenderer });
        const html = await container.renderToString(WorkPage, {
            props: { item: entry },
        });

        const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
        const content = mainMatch ? mainMatch[1].trim() : html;

        const response = {
            title: getWorkPageTitle(entry.data.title),
            content,
            meta: {
                description: getWorkPageDescription(entry.data.description),
            },
        };

        return new Response(JSON.stringify(response), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("API work fetch error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch content" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
