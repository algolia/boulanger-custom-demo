// ------------------------------------------
// Carousel Config
// ------------------------------------------

// ------------------------------------------
// The attribute is used as the filter to retreive the results for each carousel
// The attribute uses filter syntax https://www.algolia.com/doc/api-reference/api-parameters/filters/
// The title is used to show above each carousel to indicate what it shows
// ------------------------------------------
export const carouselConfig = [
  {
    context: 'home_carousel_rating',
    title: 'Nos meilleurs Articles',
  },
];

// Indicates how many records should be shown in an individual carousel
export const hitsPerCarousel = 10;
