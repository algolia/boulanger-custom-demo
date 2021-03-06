// ------------------------------------------
// Configuration for personalisation accross the application
// ------------------------------------------
import { atom } from 'recoil';

// ------------------------------------------
// This const defines the personas available for personalisation
// The labels will show in a dropdown in the navigation
// The values are what is sent as the userToken to Algolia
// Add or remove objects to this array as you see fit
// Just make sure you have events and profiles for your values
// ------------------------------------------
export const personaConfig = [
  { value: 'anon', label: 'No Persona', description: 'Anonymous user' },
  {
    value: 'user-jack',
    label: 'Jack',
    description: 'Stephen James is a man who likes sports shoes',
  },
  {
    value: 'user-sylvain',
    label: 'Sylvain',
    description: 'Elizabeth is a woman who likes blue dresses',
  },
];

// Styles for persona selection dropdown, please ignore
export const styles = {
  container: () => ({
    border: 'none',
    position: 'relative',
    cursor: 'pointer',
  }),
  control: () => ({
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
  }),
  menu: () => ({
    position: 'absolute',
    marginTop: '1rem',
    background: 'white',
    width: '100%',
    zIndex: '10000',
    boxShadow: '0px 3px 5px 1px rgba(50, 50, 50, 0.25);',
    borderRadius: '0.3rem',
    padding: '0rem',
    cursor: 'pointer',
  }),
  menuList: () => ({}),
  input: () => ({
    position: 'absolute',
    width: '100%',
    cursor: 'pointer',
    '&input': {
      cursor: 'pointer',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorContainer: () => ({
    color: 'black',
    cursor: 'pointer',
  }),
  placeholder: () => ({
    fontFamily: "'Maven Pro', sans-serif",
    cursor: 'pointer',
  }),
  valueContainer: () => ({
    cursor: 'pointer',
  }),
  option: () => {
    return {
      textTransform: 'capitalize',
      fontFamily: "'Maven Pro', sans-serif",
      padding: '0.5rem',
      cursor: 'pointer',
      borderRadius: '0.3rem',
      fontSize: '0.8rem',
      '&:hover': {
        backgroundColor: 'black',
        color: 'white',
      },
    };
  },
  singleValue: () => ({
    fontFamily: "'Maven Pro', sans-serif",
    textTransform: 'capitalize',
    cursor: 'pointer',
    fontSize: '0.8rem',
  }),
  dropdownIndicator: () => ({
    color: 'black',
  }),
};

// Please ignore this atom
export const personaSelectedAtom = atom({
  key: 'personaSelected', // unique ID (with respect to other atoms/selectors)
  default: personaConfig[0].value, // default value (aka initial value)
});

// Please ignore this atom
export const isPersonaMenuOpen = atom({
  key: 'isPersonaMenuOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
