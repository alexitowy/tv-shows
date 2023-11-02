export interface Shows {
  id: string;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  officialSite: string;
  image: Record<string, string>;
}
