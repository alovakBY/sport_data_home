import { useState, memo } from "react";

import { EventsInCountry } from "../EventsInCountry";

import arrow from "../../../../static/arrow.svg";

import classes from "./KindOfSport.module.css";

export const KindOfSport = ({
   sport,
   amount,
   tournamentsBySport,
   handleSelectedTournament,
}) => {
   const [isActive, setIsActive] = useState(false);

   // console.log(eventsBySport);

   const eventsInCountry = tournamentsBySport.reduce((result, tournament) => {
      // const country = event.data.country.name;
      const country = tournament.country;
      const amount = tournament.events.length;
      // result[country]
      //    ? (result[country] = [...result[country], tournament])
      //    : (result[country] = [tournament]);
      // return result;
      result[country]
         ? (result[country] = {
              ...result[country],
              tournaments: [...result[country].tournaments, tournament],
              amount: result[country].amount + amount,
           })
         : (result[country] = { tournaments: [tournament], amount: amount });
      return result;
   }, {});

   // console.log(eventsInCountry);

   const sortEventsInCountry =
      eventsInCountry &&
      Object.keys(eventsInCountry).sort((a, b) => {
         if (eventsInCountry[a].amount < eventsInCountry[b].amount) {
            return 1;
         }
         if (eventsInCountry[a].amount > eventsInCountry[b].amount) {
            return -1;
         }
         return 0;
      });

   return (
      <div className={classes.container}>
         <div onClick={() => setIsActive(!isActive)} className={classes.button}>
            <div className={classes.left}>
               <span className={classes.name}>{sport}</span>
               <span className={classes.amount}>({amount})</span>
            </div>
            <div className={classes.right}>
               <img
                  src={arrow}
                  className={`${!isActive && classes.arrowRotate}`}
               />
            </div>
         </div>
         {isActive && (
            <div>
               {sortEventsInCountry.map((country) => {
                  const amount = eventsInCountry[country].amount;
                  const tournamentInCountry =
                     eventsInCountry[country].tournaments;
                  return (
                     <EventsInCountry
                        key={country}
                        country={country}
                        amount={amount}
                        tournamentInCountry={tournamentInCountry}
                        handleSelectedTournament={handleSelectedTournament}
                     />
                  );
               })}
            </div>
         )}
      </div>
   );
};
