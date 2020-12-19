import { GameVariations } from '../types';
// replace with API
const texts = [
  `
    Praesent pharetra justo in nunc pretium, vel malesuada ante congue.
    nisi elementum finibus sed ac erat. Vestibulum vel sagittis dolor.
  `,
  `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Proin dignissim diam ac lorem volutpat, placerat posuere augue aliquam.
  `,
  "Lorem ipsum dolor sit amet"
];

const quotes = [
  "You can observe a lot just by watching.",
  "Be the chief but never the lord."
];

const dictionary = [
  "acatalepsy",
  "acater",
  "acaters",
  "acates",
  "acatour",
  "acatours",
  "acaudal",
  "acaudate",
  "acauline",
  "acaulose",
  "accable",
  "accede",
  "acceded",
  "accedence",
  "accedences",
  "acceder",
  "acceders",
  "accedes",
  "acceding",
  "accelerant",
  "accelerate",
  "accend",
  "accension",
  "accensions",
  "accent",
  "accented",
  "accenting",
  "accentor",
  "accentors",
  "accents",
  "accentual",
  "accentuate",
];

export const randomText = (): string => {
  return texts[Math.floor(Math.random() * texts.length)];
};

export const randomQuote = (): string => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const randomWords = (): string => {
  const list = [];
  for (let i = 0; i < 6; i++) {
    list.push(dictionary[Math.floor(Math.random() * dictionary.length)]);
  }
  return list.join(' ');
};

export const getTextByGameVariation = (variation: GameVariations): string => {
  switch(variation) {
  case 'text': return randomText();
  case 'quote': return randomQuote();
  default: return randomWords();
  }
};
