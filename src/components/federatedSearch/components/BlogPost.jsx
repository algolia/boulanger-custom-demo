// Render the blog post in federated search
import { memo } from 'react';

// Algolia
import { connectHits } from 'react-instantsearch-dom';
import { useRecoilValue } from 'recoil';

import { contentArticlesConfig } from '@/config/hitsConfig';

import get from 'lodash/get';

const ArticlesItems = ({ hits }) => {
  const { name, url, address, regions } = useRecoilValue(contentArticlesConfig);
  return (
    <div className="articles__wrapper">
      <h3 className="articles__title">Magasins</h3>
      {hits.map((hit, index) => {
        console.log(hit);
        return (
          <div key={index} className="articles__item">
            <div className="image-wrapper">
              <p className="date">{get(hit, name)}</p>
              <img
                src="https://dynl.mktgcdn.com/p/EVspjJGcxy6y6RRolfQs8rl6Xu5X7HJpGGAC71NucEg/600x292.jpg"
                alt=""
              />
              <div className="overlay"></div>
            </div>
            <div className="infos">
              <p className="title">{get(hit, address)}</p>
              <p className="subtitle">{get(hit, regions)}</p>
              <div className="button">
                <a href={get(hit, url)} className="button-nav">
                  Visitez le magasin
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Articles = connectHits(ArticlesItems);
export default memo(Articles);
