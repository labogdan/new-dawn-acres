import React, { useEffect, useState } from "react";

import { TakeShapeAbout } from "./about";

export interface TakeShapeInterface {
  position?: string;
  pickupLocation: string;
  onUpdatePickupDate: (onUpdatePickupDate: string) => void;
}

export const TakeShape: React.FC<TakeShapeInterface> = ({position, pickupLocation, onUpdatePickupDate}) => {
  const [isFetched, setIsFetched] = useState(false);
  const [dynamicContent, setDynamicContent] = useState();

  const aboutQuery = JSON.stringify({
    query: `
    query {
      getCalendarList {
        items {
          _id
          pickupDate
          pickupLocation
        }
        total
      }
    }
      `,
  });



  const queryData = async () => {
    let query;

    switch (position) {
      default:
        query = null;
        break;
      case "about":
        query = aboutQuery;
        break;
    }
  //@ts-ignore
    const response = await fetch(process.env.REACT_APP_TAKESHAPE_ENDPOINT, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TAKESHAPE_API}`,
      },
      method: "POST",
      body: query,
    });

    const responseJson = await response.json();
    return responseJson.data;
  };

  const fetchData = async () => {
    const res = await queryData();
    setDynamicContent(res);
  };
//@ts-ignore
  useEffect(() => {
    let mounted = true;
    fetchData().then(r => {
      if (mounted) {
        setIsFetched(true);
      }
    });
    // eslint-disable-next-line no-return-assign
    return () => (mounted = false);
  }, [isFetched]);

  if (!dynamicContent) {
    return null;
  }
  if (position === "about") {
    return (
      <>
        <TakeShapeAbout 
          content={dynamicContent} 
          pickupLocation={pickupLocation}
          onUpdatePickupDate={onUpdatePickupDate}
        />
      </>
    );
  
  }
  return <></>;
};
