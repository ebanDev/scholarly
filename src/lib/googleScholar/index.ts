import { IArticle, IHTMLTags } from "../interfaces";

import { parseScholarArticle } from "./search";

/**
 * A class to interact with Google Scholar.
 * @class GoogleScholar
  */
class GoogleScholar {
  baseUrl = "https://scholar.google.com";
  searchTags: IHTMLTags = {
    results: ".gs_r",
    title: ".gs_ri h3 a",
    url: ".gs_ri h3 a",
    authors: ".gs_ri .gs_a",
    footers: ".gs_ri .gs_fl a",
    description: ".gs_ri .gs_rs",
    pdf: ".gs_ggsd a",
  };

  userTags: IHTMLTags = {
    results: ".gsc_a_tr",
    title: ".gsc_a_t a",
    url: ".gs_ri h3 a",
    authors: ".gs_gray",
    year: ".gsc_a_y",
    citations: ".gsc_a_c",
  };

  /**
   * Search Google Scholar for articles.
   * @param query string
   * @returns Promise<IArticle[]>
   */
  search = async (query: string): Promise<IArticle[]> => {
    let articles: IArticle[] = [];
    if (query === "") {
      throw new Error("Query cannot be empty!");
    }
    const searchUrl = encodeURI(`/scholar?hl=en&q=${query}`);
    const response = await fetch(this.baseUrl + searchUrl);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: string = await response.text();
    articles = parseScholarArticle(data, this.searchTags);
    return articles;
  };
}

const googleScholar = new GoogleScholar();
export default googleScholar;