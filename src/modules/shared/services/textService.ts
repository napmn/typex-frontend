// replace with API
const texts = [
  // `
  //   Praesent pharetra justo in nunc pretium, vel malesuada ante congue.
  //   nisi elementum finibus sed ac erat. Vestibulum vel sagittis dolor.
  // `,
  // `
  //   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //   Proin dignissim diam ac lorem volutpat, placerat posuere augue aliquam.
  // `,
  "Lorem ipsum dolor sit amet"
];


export const randomText = ():string => {
  return texts[Math.floor(Math.random() * texts.length)];
};
