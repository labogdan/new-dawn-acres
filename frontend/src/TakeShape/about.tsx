import React from "react";

interface TakeShapeAboutInterface {
  content: any;
  pickupLocation: string;
  onUpdatePickupDate: (pickupDate: string) => void;
}

export const TakeShapeAbout: React.FC<TakeShapeAboutInterface> = ({ content, pickupLocation, onUpdatePickupDate }) => {

  //const pickupLocation = content?.getCalendarList?.items?.[0]?.pickupLocation || '';
  const locationsList = content?.getCalendarList?.items;

  //const pickupDate = '12-12-2012';

  const pickupDate = locationsList.find((item: { pickupLocation: string; }) => item.pickupLocation === pickupLocation).pickupDate;

  onUpdatePickupDate(pickupDate);


  console.log('IN TAKESHAPE');
  console.log(pickupLocation);
  console.log(pickupDate)

  return (
    <>
      <p>{content?.getCalendarList?.items?.[0]?.pickupDate}</p>
      <p>{pickupLocation}</p>
    </>
  );
};
