import { memo } from 'react';

// Algolia's imports
import { connectHits } from 'react-instantsearch-dom';

// Component import
import { ChevronRight } from '@/assets/svg/SvgIndex';
import Price from '@/components/price/price.jsx';

// Recoil import
import { hitAtom } from '@/config/hitsConfig';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { hitsConfig } from '@/config/hitsConfig';
import { personaSelectedAtom } from '@/config/personaConfig';
import { queryAtom } from '@/config/searchboxConfig';

// React-router import
import { useNavigate } from 'react-router-dom';

import get from 'lodash/get';

const Hits = ({ hits }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);

  const personaSelected = useRecoilValue(personaSelectedAtom);
  const query = useRecoilValue(queryAtom);

  // Get hit attribute from config file
  const { objectID, image, productName, hierarchicalCategoriesLvl5, category } =
    hitsConfig;

  return (
    <div className="products">
      <div className="products__header">
        {personaSelected !== '' && query === '' ? (
          <h3 className="products__title">Recommended for you</h3>
        ) : (
          <h3 className="products__title">Products</h3>
        )}
      </div>
      <ul className="products__items">
        {hits.length ? (
          hits.map((hit) => {
            return (
              <li key={hit[objectID]} className="products__item">
                <div
                  className="image-wrapper"
                  onClick={() => {
                    hitState(hit);
                    navigate(`/search/${hit[objectID]}`);
                  }}
                >
                  <img src={get(hit, image)} alt="" />
                </div>
                <div className="infos">
                  <p className="brand">
                    {Categ(
                      get(hit, hierarchicalCategoriesLvl5),
                      get(hit, category)
                    )}
                  </p>
                  <p className="name">{get(hit, productName)}</p>
                  <p className="price">
                    <Price hit={hit} />
                  </p>
                </div>
              </li>
            );
          })
        ) : (
          <span className="no-results__infos">No Results Found</span>
        )}
      </ul>
      <div className="products__btn" onClick={() => {}}>
        <ChevronRight />
        <p onClick={() => navigate('/search')}>SHOW ALL PRODUCTS</p>
      </div>
    </div>
  );
};

const Products = connectHits(Hits);

export default memo(Products);

const Categ = (c, i) => {
  if (c) {
    const newCateg = c.split('>');
    console.log(newCateg[5]);
    return newCateg[5];
  } else if (i) {
    return i;
  } else {
    return '';
  }
};
