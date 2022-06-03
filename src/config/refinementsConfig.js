// ------------------------------------------
// Configuration for refinements/facets
// ------------------------------------------

import { hitsConfig } from './hitsConfig';

// This const defines the refinements to be shown
// There are five possible types: hierarchical, price, colour, size, list
// Generally you should use type list if you are adding a new facet here
export const refinements = [
  {
    type: 'hierarchical',
    header: 'Categories',
    label: 'Catégorie',
    options: {
      attribute: [
        hitsConfig.hierarchicalCategoriesLvl0,
        hitsConfig.hierarchicalCategoriesLvl1,
        hitsConfig.hierarchicalCategoriesLvl2,
        hitsConfig.hierarchicalCategoriesLvl3,
      ],
      searchable: true,
    },
  },
  {
    type: 'price',
    header: 'Price',
    label: 'Price',
    options: {
      attribute: hitsConfig.price,
    },
  },
  {
    type: 'list',
    header: 'Marque',
    label: 'Marque',
    options: {
      attribute: hitsConfig.brand,
      searchable: true,
      limit: 6,
    },
  },
  {
    type: 'list',
    header: 'Condition',
    label: 'Condition',
    options: {
      attribute: hitsConfig.condition,
    },
  },
  {
    type: 'list',
    header: 'Fabriqué em',
    label: 'Fabriqué en',
    options: {
      attribute: hitsConfig.madeIn,
      limit: 8,
      searchable: true,
    },
  },
  {
    type: 'colour',
    header: 'Couleur',
    label: 'Couleur',
    options: {
      attribute: hitsConfig.colourHexa,
    },
  },
  {
    type: 'list',
    header: 'Gender',
    label: 'Gender',
    options: {
      attribute: hitsConfig.genderFilter,
    },
  },
  {
    type: 'size',
    header: 'Sizes',
    label: 'Size',
    options: {
      attribute: hitsConfig.sizeFilter,
      limit: 8,
    },
  },
  {
    type: 'promotion',
    header: 'Promotion',
    label: 'Promotion',
    options: {
      attribute: hitsConfig.sale,
    },
  },
];

// This const defines the labels used in price refinements
export const refinementPriceLabels = {
  moreThan: 'More than',
  lessThan: 'Less than',
};
