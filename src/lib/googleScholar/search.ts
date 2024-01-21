import { IArticle, IHTMLTags } from "../interfaces";

import { Article } from "../config";
import cheerio from "cheerio";

declare type CheerioStatic = ReturnType<(typeof cheerio)["load"]>;

const baseUrl = "https://scholar.google.com";

/**
 * A helper function to parse the publication tag from the article.
 * @param $ CheerioStatic
 * @param div Cheerio.Element
 * @param article IArticle
 */
const _parsePublicationTag = (
  $: CheerioStatic,
  div: cheerio.Cheerio,
  article: Article,
): void => {
  let authorHTMLString = $(div).text();
  if (authorHTMLString === "") {
    return;
  }
  // Author Tag format (author1, author2 - publication, year - journal)
  let author = "";
  const ellipsisIdx = authorHTMLString.indexOf("...");
  for (let idx = 0; idx < authorHTMLString.length; idx++) {
    const char = authorHTMLString[idx];
    if (char === "," || char === "-" || idx === ellipsisIdx) {
      article.authors.push(author.trim());
      if (char !== ",") {
        authorHTMLString = authorHTMLString.substring(
          idx === ellipsisIdx ? idx + 3 : idx + 1,
        );
        break;
      }
    } else {
      author += char;
    }
  }
  const splitData = authorHTMLString.split(" - ");
  article.publication = splitData.pop()?.trim();
  const year = splitData.pop();
  if (year) {
    article.year = parseInt(year.substring(-5));
  }
  return;
};

/**
 *
 *
 * @param {CheerioStatic} $
 * @param {Cheerio} div
 * @param {Article} article
 */
const _parseFooterLinks = (
  $: CheerioStatic,
  div: cheerio.Cheerio,
  article: Article,
): void => {
  $(div).each((_, el) => {
    if ($) {
      const href = $(el).attr("href");
      if (!href) {
        return;
      }
      if (href.indexOf("/scholar?cites") >= 0) {
        const citationCountPrefix = "Cited by ";
        article.citationUrl = baseUrl + href;
        article.numCitations = parseInt(
          $(el).text().substring(citationCountPrefix.length),
        );
      } else if (href.indexOf("/scholar?q=related") >= 0) {
        article.relatedUrl = baseUrl + href;
      } else if (href.indexOf("/scholar?cluster") >= 0) {
        article.urlVersionsList = baseUrl + href;
      }
    }
  });
};

/**
 * A helper function to parse the article data from the user's Google Scholar profile.
 * @param $ CheerioStatic
 * @param div Cheerio.Element
 * @param tags IHTMLTags
 * @returns IArticle | undefined
 */
const _parseScholarArticle = (
  $: CheerioStatic,
  div: cheerio.Element,
  tags: IHTMLTags,
): Article | undefined => {
  if ($) {
    const article = new Article();
    article.title = $(div).find(tags.title).text().trim();
    article.url = $(div).find(tags.url).attr("href");
    if (tags.description)
      article.description = $(div).find(tags.description).text();
    if (tags.pdf) article.pdf = $($(div).find(tags.pdf)[0]).attr("href");
    if (tags.footers) _parseFooterLinks($, $(div).find(tags.footers), article);
    _parsePublicationTag($, $(div).find(tags.authors), article);
    return article;
  }
};

/**
 *
 *
 * @param {string} html
 * @param {IHTMLTags} tags
 * @returns {IArticle[]}
 */
export const parseScholarArticle = (
  html: string,
  tags: IHTMLTags,
): IArticle[] => {
  const articles: IArticle[] = [];
  const $ = cheerio.load(html);
  const allResults = $(tags.results);
  allResults.each((_, div) => {
    const article = _parseScholarArticle($, div, tags);
    if (article && article.title !== "") articles.push(article);
  });
  return articles;
};
