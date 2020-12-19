export type TGameVariations = "text" | "quote" | "dictionary";

export type TGameType = {
  name: TGameVariations;
  verboseName: string;
  path: string;
};
