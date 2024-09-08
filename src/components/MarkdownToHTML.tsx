import { marked } from "marked";

// Set options
marked.use({
	async: true,
	pedantic: false,
	gfm: true,
});

type MarkdownToHTMLUrl = string;
type MarkdownToHTMLProps = {
	url: MarkdownToHTMLUrl;
};

const getMarkdownHTML = async (url: MarkdownToHTMLUrl) => {
	console.log("Fetching markdown from:", url);
	const md = await fetch(url).then((res) => res.text());
	const html = await marked.parse(md);
	return html;
};
export const MarkdownToHTML = async ({ url }: MarkdownToHTMLProps) => {
	const html = await getMarkdownHTML(url);
	return (
		<div
			dangerouslySetInnerHTML={{ __html: html }}
			data-testid="markdown-html"
		/>
	);
};
