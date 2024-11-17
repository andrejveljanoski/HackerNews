import { toast } from "vue3-toastify";

export type HighlightResult = {
  value: string;
  matchLevel: string;
  matchedWords: string[];
};

export type Post = {
  title: string;
  url: string;
  author: string;
  points: number;
  story_text: string | null;
  comment_text: string | null;
  _tags: string[];
  num_comments: number;
  objectID: string;
  created_at: string;
  nbHits: number;
  text?: string;
  _highlightResult: {
    title: HighlightResult;
    url: HighlightResult;
    author: HighlightResult;
  };
  children?: Post[];
};

export const fetchPosts = async (
  query: string,
  page: number,
  tags?: string,
  numericFilters?: string,
  sort: "byPopularity" | "byDate" = "byPopularity"
) => {
  try {
    let url = `https://hn.algolia.com/api/v1/${
      sort === "byDate" ? "search_by_date" : "search"
    }?query=${encodeURIComponent(query)}&page=${page}&hitsPerPage=10`;

    if (tags) {
      url += `&tags=${tags}`;
    }

    if (numericFilters) {
      url += `&numericFilters=${encodeURIComponent(numericFilters)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { items: data.hits, totalResults: data.nbHits };
  } catch (error) {
    console.error("Error fetching posts:", error);
    toast.error("Failed to fetch posts. Please try again later.");
    throw error;
  }
};

export const fetchPostDetails = async (postId: string) => {
  console.log("Fetching post details for post ID:", postId);
  try {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/items/${postId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { post: data, comments: data.children };
  } catch (error) {
    console.error("Error fetching post details:", error);
    toast.error("Failed to fetch post details. Please try again later.");
  }
};
