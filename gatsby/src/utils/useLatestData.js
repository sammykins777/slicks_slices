import { useEffect, useState } from 'react';

const gql = String.raw;

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slice masters
  const [slicemasters, setSlicemasters] = useState();
  //   use a side effect to fetch the data from the sanity graphql emndpoing

  useEffect(function () {
    // when the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
              hotSlices {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // check for errors
        // set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log('Shooot');
        console.log(err);
      });
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}
