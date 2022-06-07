import { useRef, useEffect, useState } from 'react';
import { connectHits, Configure, Index } from 'react-instantsearch-dom';

// Import Framer Motion
import { motion } from 'framer-motion';

// React Router
import { useNavigate } from 'react-router-dom';

// Recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';

// Import configuration
import { mainIndex } from '@/config/algoliaEnvConfig';
import { hitsConfig, hitAtom } from '@/config/hitsConfig';
import { hitsPerCarousel } from '@/config/carouselConfig';
import { personaSelectedAtom } from '@/config/personaConfig';
import { segmentSelectedAtom } from '@/config/segmentConfig';

// In case of img loading error
import { logoUrl as placeHolderError } from '@/config/headerConfig';

import { framerMotionTransition } from '@/config/animationConfig';

import useScreenSize from '@/hooks/useScreenSize';

import get from 'lodash/get';

// import Price component
import Price from '@/components/price/price.jsx';
import { EmptyStar, FullStar } from '@/assets/svg/SvgIndex';

// Build the Carousel for use on the Homepage
const HomeCarousel = ({ context, title }) => {
  const index = useRecoilValue(mainIndex);
  const userToken = useRecoilValue(personaSelectedAtom);
  const segmentOptionalFilters = useRecoilValue(segmentSelectedAtom);

  const { tablet, mobile } = useScreenSize();
  return (
    <div className={`${mobile ? 'home-carousel-mobile' : 'home-carousel'}`}>
      <Index indexId={title} indexName={index}>
        <Configure
          hitsPerPage={hitsPerCarousel}
          ruleContexts={context}
          optionalFilters={segmentOptionalFilters}
          userToken={userToken}
        />
        <CustomHitsCarousel title={title} />
      </Index>
    </div>
  );
};

// This carousel is used inside of HomeCarousel
const Carousel = ({ hits, title }) => {
  // Handle carousel effects when grabbing it
  const [width, setWidth] = useState(0);

  // Navigate is used by React Router
  const navigate = useNavigate();

  // Hits are imported by Recoil
  const hitState = useSetRecoilState(hitAtom);
  const { objectID, image, productName, rating, category, sale } = hitsConfig;

  // Used by Framer Motion
  const carousel = useRef();
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [hits]);
  return (
    <>
      <h3>{title}</h3>
      {/* This div declares the outer reference for the framer motion */}
      <motion.div
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* This div declares the parameters for the carousel dragging effect */}
        <motion.div
          // ADD THAT TO NEW FILE ABOUT ANIMATION IN CONFIG
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragTransition={
            ({
              min: 0,
              max: 100,
              velocity: 0,
              power: 1,
              bounceStiffness: 10,
              bounceDamping: 1,
            },
            framerMotionTransition)
          }
          className="inner-carousel"
        >
          {/* Display the hits in the carousel */}
          {hits.map((hit, i) => {
            return (
              <motion.div key={i} className="item">
                <div className="carousel__imageWrapper">
                  <img
                    src={get(hit, image)}
                    alt={get(hit, productName)}
                    onError={(e) => (e.currentTarget.src = placeHolderError)}
                  />
                </div>
                <div
                  className="item__infos"
                  onClick={() => {
                    hitState(hit);
                    // navigate to the product show page
                    navigate(`/search/${hit[objectID]}`);
                  }}
                >
                  <Rating ratingInfos={get(hit, rating)} />
                  {get(hit, sale) && (
                    <div className="promo-item">
                      <p>Promotion</p>
                    </div>
                  )}
                  <p className="category">{get(hit, category)}</p>
                  <p className="name">{get(hit, productName)}</p>
                  <p className="price">
                    <Price hit={hit} />
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
};
const CustomHitsCarousel = connectHits(Carousel);

export default HomeCarousel;

export const Rating = ({ ratingInfos }) => {
  if (ratingInfos > 0 && ratingInfos < 1) {
    return (
      <div className="rating_stars">
        <EmptyStar />
        <EmptyStar />
        <EmptyStar />
        <EmptyStar />
        <EmptyStar />
      </div>
    );
  }
  if (ratingInfos >= 1 && ratingInfos < 2) {
    return (
      <div className="rating_stars">
        <FullStar />
        <EmptyStar />
        <EmptyStar />
        <EmptyStar />
        <EmptyStar />
      </div>
    );
  }
  if (ratingInfos >= 2 && ratingInfos < 3) {
    return (
      <div className="rating_stars">
        <FullStar />
        <FullStar />
        <EmptyStar />
        <EmptyStar />
        <EmptyStar />
      </div>
    );
  }
  if (ratingInfos >= 3 && ratingInfos < 4) {
    return (
      <div className="rating_stars">
        <FullStar />
        <FullStar />
        <FullStar />
        <EmptyStar />
        <EmptyStar />
      </div>
    );
  }
  if (ratingInfos >= 4 && ratingInfos < 5) {
    return (
      <div className="rating_stars">
        <FullStar />
        <FullStar />
        <FullStar />
        <FullStar />
        <EmptyStar />
      </div>
    );
  }
  if (ratingInfos >= 5) {
    return (
      <div className="rating_stars">
        <FullStar />
        <FullStar />
        <FullStar />
        <FullStar />
        <FullStar />
      </div>
    );
  }
  // return (
  //   <div>
  //     <h1>{ratingInfos}</h1>
  //   </div>
  // );
};
