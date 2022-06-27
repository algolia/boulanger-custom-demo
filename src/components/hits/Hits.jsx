// Component for displaying hits in teh

import { useState, useEffect } from 'react';

// Import framer-motion for animation on hits
import { motion, AnimatePresence } from 'framer-motion';
import { framerMotionTransition } from '@/config/animationConfig';

import { Highlight } from 'react-instantsearch-dom';

import { Heart } from '@/assets/svg/SvgIndex';

import { badgeCriteria } from '@/config/badgeConfig';

// In case of img loading error
import { logoUrl as placeHolderError } from '@/config/headerConfig';

import get from 'lodash/get';

import { framerMotionHits } from '@/config/animationConfig';

// Recoil import
import { hitAtom } from '@/config/hitsConfig';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hitsConfig } from '@/config/hitsConfig';

// React-router import
import { useNavigate } from 'react-router-dom';
import Badge from './Badge';

//Import hook for store ID into local storage
import useStoreIdToLocalStorage from '@/hooks/useStoreObjectIdToLocalStorage';

// import Price component
import Price from '@/components/price/price.jsx';

const Hit = ({ hit, setSrpIsLoaded }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);
  const [isHovered, setIsHovered] = useState(false);

  // Get hit attribute from config file
  const {
    objectID,
    image,
    imageAlt,
    category,
    productName,
    hierarchicalCategoriesLvl0,
    details,
    sale,
  } = hitsConfig;

  const [shouldShowRankingInfo, setShouldShowRankingInfo] = useState(false);
  useEffect(() => {
    setSrpIsLoaded(true);

    // return () => setSrpIsLoaded(false);
  }, [hit]);

  const RankingFormulaOverlay = ({ hit }) => {
    return (
      <motion.div
        layout
        variants={framerMotionHits}
        initial={framerMotionHits.initial}
        exit={framerMotionHits.exit}
        animate={framerMotionHits.animate}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="ranking-formula"
      >
        {Object.entries(hit._rankingInfo).map((entry) => (
          <p>
            {entry[0]} {JSON.stringify(entry[1])}
          </p>
        ))}
      </motion.div>
    );
  };

  const promoted = hit?._rankingInfo?.promoted;

  return (
    <motion.li
      layout
      variants={framerMotionHits}
      initial={framerMotionHits.initial}
      exit={framerMotionHits.exit}
      animate={framerMotionHits.animate}
      transition={framerMotionHits.transition}
      className={`${promoted ? 'promotedItems' : ''} srpItem`}
    >
      <div
        className="button-ranking-container"
        onClick={() => setShouldShowRankingInfo(!shouldShowRankingInfo)}
      >
        <button className="ranking-formula-button"></button>
        <p>Click to see Ranking</p>
      </div>
      <AnimatePresence>
        {shouldShowRankingInfo && <RankingFormulaOverlay hit={hit} />}
      </AnimatePresence>
      <>
        <motion.div
          className="srpItem__imgWrapper"
          onMouseLeave={(e) => {
            setIsHovered(false);
          }}
          onMouseOver={(e) => {
            !shouldShowRankingInfo && setIsHovered(true);
          }}
          onClick={() => {
            hitState(hit);
            navigate(`/search/${hit[objectID]}`);
            useStoreIdToLocalStorage(hit[objectID]);
          }}
        >
          {isHovered && get(hit, imageAlt) !== undefined ? (
            <img
              key={1}
              className={
                shouldShowRankingInfo ? 'secondImage-opacity' : 'secondImage'
              }
              src={get(hit, imageAlt)}
              alt={get(hit, category)}
              onError={(e) => (e.currentTarget.src = placeHolderError)}
            />
          ) : (
            <img
              className={
                shouldShowRankingInfo
                  ? 'mainImage-opacity'
                  : 'mainImage-visible'
              }
              src={
                get(hit, image)
                  ? get(hit, image)
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK4bLUXQEreZbv1jVFF_YG_XSK_ZZsfqBQ1uIHXUpq7o3L6fmTNAsIPTqCgUcnhGuPIm0&usqp=CAU'
              }
              key={2}
              alt={get(hit, category)}
              onError={(e) => (e.currentTarget.src = placeHolderError)}
            />
          )}
          {badgeCriteria(hit) !== null && !shouldShowRankingInfo && (
            <Badge title={badgeCriteria(hit)} />
          )}
          <div className="srpItem__imgWrapper__heart">
            <Heart />
          </div>
        </motion.div>
        <div className="srpItem__infos">
          <h3>
            <Highlight hit={hit} attribute={productName} />
          </h3>
          <div className="detail-price">
            {detailHits(
              get(hit, hierarchicalCategoriesLvl0),
              get(hit, details)
            )}
            <div className="srpItem__infos__down">
              <p className="price">
                <Price hit={hit} />
              </p>
            </div>
          </div>
          {get(hit, sale) && (
            <div className="promotion-item">
              <p>Promotion</p>
            </div>
          )}
        </div>
      </>
    </motion.li>
  );
};

export { Hit };

const detailHits = (categ, details) => {
  switch (categ) {
    case 'Confort à la maison':
      return (
        <ul className="details-srp">
          <li>{filterArrayForSonore(details)}</li>
          {details.map((d) => {
            if (d['Poids net']) {
              return (
                <>
                  <li>
                    <span>Poids:</span> {d['Poids net']} Kg{' '}
                  </li>
                </>
              );
            }
            if (
              d['Largeur produit (cm)'] !== undefined &&
              d['Hauteur produit (cm)'] !== undefined &&
              d['Profondeur produit (cm)'] !== undefined
            ) {
              return (
                <>
                  <li>
                    <span>LxHxP::</span>
                    {d['Largeur produit (cm)']} X{d['Hauteur produit(cm)']} X{' '}
                    {d['Profondeur produit (cm)']}
                  </li>
                </>
              );
            }
          })}
          <li>{filterArrayForEnergy(details)}</li>
        </ul>
      );
    case 'Loisirs à la maison':
      return (
        <ul className="details-srp">
          <li>{filterArrayForSonore(details)}</li>
          <li>{tailleEcran(details)}</li>
          <li>{technologie(details)}</li>
          <li>{filterArrayForEnergy(details)}</li>
        </ul>
      );
    case 'Les activités Nomades':
      return (
        <ul className="details-srp">
          <li>{tailleEcran(details)}</li>
          <li>{couleur(details)}</li>
          <li>{resolution(details)}</li>
        </ul>
      );
    case 'Accessoires et consommables':
      return (
        <ul className="details-srp">
          <li>{utilisation(details)}</li>
          <li>{type(details)}</li>
        </ul>
      );
    case 'Maison & Objets connectés':
      return (
        <ul className="details-srp">
          <li>{utilisation(details)}</li>
          <li>{lePlus(details)}</li>
        </ul>
      );
    default:
      return '';
  }
};

const filterArrayForSonore = (d) => {
  const newArraySonore = d.filter((obj) => obj.hasOwnProperty('Niveau sonore'));
  if (newArraySonore[1]) {
    return (
      <div>
        <span>Bruit:</span> {newArraySonore[0]['Niveau sonore']}
      </div>
    );
  }
};

const filterArrayForEnergy = (d) => {
  const newArrayEnergy = d.filter((obj) =>
    obj.hasOwnProperty('Classe énergétique')
  );
  if (newArrayEnergy.length && newArrayEnergy[1] !== undefined) {
    return;
    <div>
      <span>Energie:</span> {newArrayEnergy[1]['Classe énergétique']}
    </div>;
  }
  if (newArrayEnergy.length && newArrayEnergy[1] === undefined) {
    return (
      <div>
        <span>Energie:</span> {newArrayEnergy[0]['Classe énergétique']}
      </div>
    );
  } else {
    return '';
  }
};

const tailleEcran = (d) => {
  const newArrayEcran = d.filter((obj) =>
    obj.hasOwnProperty("Taille de l'écran")
  );
  if (newArrayEcran[0]) {
    return (
      <div>
        <span>Taille écran:</span> {newArrayEcran[0]["Taille de l'écran"]}
      </div>
    );
  }
};

const technologie = (d) => {
  const newArrayEcran = d.filter((obj) => obj.hasOwnProperty('Technologie'));
  if (newArrayEcran[1]) {
    return (
      <div>
        <span>Téchnologie:</span> {newArrayEcran[0]['Technologie']}
      </div>
    );
  }
};

const couleur = (d) => {
  const newArrayEcran = d.filter((obj) => obj.hasOwnProperty('Couleur'));
  if (newArrayEcran[0]) {
    return (
      <div>
        <span>Couleur:</span> {newArrayEcran[0]['Couleur']}
      </div>
    );
  }
};

const resolution = (d) => {
  const newArrayEcran = d.filter((obj) =>
    obj.hasOwnProperty("Résolution de l'écran")
  );
  if (newArrayEcran[0]) {
    return (
      <div>
        <span>Résolution:</span> {newArrayEcran[0]["Résolution de l'écran"]}
      </div>
    );
  }
};

const utilisation = (d) => {
  const newArrayEcran = d.filter((obj) => obj.hasOwnProperty('Utilisation'));
  if (newArrayEcran[0]) {
    return (
      <div>
        <span>Utilisation:</span> {newArrayEcran[0]['Utilisation']}
      </div>
    );
  }
};

const type = (d) => {
  const newArrayEcran = d.filter((obj) => obj.hasOwnProperty('Type'));
  if (newArrayEcran[0]) {
    return (
      <div>
        <span>Type:</span> {newArrayEcran[0]['Type']}
      </div>
    );
  }
};
const lePlus = (d) => {
  const newArrayEcran = d.filter((obj) => obj.hasOwnProperty('Le +'));
  if (newArrayEcran[0]) {
    return (
      <div>
        <span>Les plus:</span> {newArrayEcran[0]['Le +']}
      </div>
    );
  }
};
