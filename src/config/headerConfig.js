// ------------------------------------------
// Configuration for the header
// ------------------------------------------
import { atom } from 'recoil';

// This const defines the logo shown on the header
export const logoUrl = 'https://www.boulanger.com/etc.clientlibs/aem-site-desktop/wpk.app/resources/assets/svg/logo-boulanger-full.svg';

// ------------------------------------------
// This const defines the navigation aspect of the header
// The name is for display purposes for each navigation title
// The filter is the value to filter on to show results for the linked category page
// The filter value should directly correspond to the attribute you're filtering on
// See categoryConfig to define the attribute matching these values correctly
// The url should be the lower case URL friendly version of the filter value
// ------------------------------------------
export const linksHeader = atom({
  key: 'linksHeader', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      name: 'Gros électroménager',
      type: 'filter',
      filter: '',
      url: '/search',
    },
    {
      name: 'Cuisine cuisson',
      type: 'filter',
      filter: 'Mens',
      url: '/mens',
    },
    {
      name: 'Maison Entretien',
      type: 'filter',
      filter: 'Womens',
      url: '/womens',
    },
    {
      name: 'Beauté Santé',
      type: 'filter',
      filter: 'Womens',
      url: '/womens',
    },
    {
      name: 'Objets connectés',
      type: 'filter',
      filter: 'Womens',
      url: '/womens',
    },
    {
      name: 'Smartphone Téléphonie',
      type: 'filter',
      filter: 'Womens',
      url: '/womens',
    },
    {
      name: 'Informatique Tablette',
      type: 'filter',
      filter: 'Womens',
      url: '/womens',
    },
    {
      name: 'Image Son',
      type: 'filter',
      filter: 'Womens',
      url: '/womens',
    },
    // This uses context from the Algolia dashboard, configured using Visual Editor
    {
      name: 'Accessories',
      type: 'context',
      context: 'accessories',
      url: '/accessories',
    },
  ],
});

export const selectorNavigationRef = atom({
  key: 'selectorNavigationRef', // unique ID (with respect to other atoms/selectors)
  default: '',
})

export const categorySelectionAtom = atom({
  key: 'categorySelectionAtom',
  default: null
})

// This is the state of the 'state' from SearchInCategory.jsx
// It is used to persist the category underline on refresh
// export const searchCategoryStateAtom = atom({
//   key: 'searchCategoryStateAtom',
//   default: null
// })