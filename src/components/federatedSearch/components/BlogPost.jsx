// Render the blog post in federated search
import { memo } from 'react';

// Algolia
import { connectHits } from 'react-instantsearch-dom';
import { useRecoilValue } from 'recoil';

import { contentArticlesConfig } from '@/config/hitsConfig';

import { ArrowRight } from '@/assets/svg/SvgIndex';

import get from 'lodash/get';

const ArticlesItems = ({ hits }) => {
  const { name, url, address, regions } = useRecoilValue(contentArticlesConfig);
  return (
    <div className="articles__wrapper">
      <h3 className="articles__title">Magasins</h3>
      {hits.map((hit, index) => {
        return (
          <a href={get(hit, url)} key={index} className="articles__item">
            <div className="image-wrapper">
              <div className="overlay"></div>
            </div>
            <div className="infos">
              <p className="title">{get(hit, name)}</p>
              <ArrowRight />
              {/* <div className="button">
                <a href={get(hit, url)} className="button-nav">
                  Visitez le magasin
                </a>
              </div> */}
            </div>
            <div className="line"></div>
          </a>
        );
      })}
    </div>
  );
};

const Articles = connectHits(ArticlesItems);
export default memo(Articles);
