// This builds the banner that is rendered in searchresultspage
// The queryRuleCustomData widget displays custom data from Rules.
// You use this widget to display banners or recommendations returned by Rules, and that match search parameters.

import { QueryRuleCustomData } from 'react-instantsearch-dom';

const Banner = () => {
  return (
    <QueryRuleCustomData>
      {({ items }) =>
        items.map((item) => {
          return (
            item.type === 'bannerSrp' && (
              <div
                key={item.title}
                className="banner-srp"
                // NB Inline style is necessary here due to how background images work
                style={{
                  backgroundImage: `url(${item.banner})`,
                }}
                onClick={() => (window.location.href = item.link)}
              >
                <div className="banner-srp__infos">
                  {/* <h3>{item.title}</h3> */}
                  {/* <p>{item.content}</p> */}
                </div>
              </div>
            )
          );
        })
      }
    </QueryRuleCustomData>
  );
};

export default Banner;
