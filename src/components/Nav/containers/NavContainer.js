import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { KindOfSport } from "../components/KindOfSport";

import { mainPageSelector } from "../../MainLayout/selectors";
import * as actions from "../../MainLayout/actions";

import classes from "./NavContainer.module.css";

export const NavContainer = () => {
   // const { events } = useSelector(mainPageSelector);
   const dispatch = useDispatch();
   const { tournaments } = useSelector(mainPageSelector);

   // const kindsOfSport = Object.keys(tournaments).reduce(
   //    (result, tournament) => {
   //       const sport = tournaments[tournament].sport;
   //       // console.log([...tournaments[tournament].events]);
   //       result[sport]
   //          ? (result[sport] = [
   //               ...result[sport],
   //               ...tournaments[tournament].events,
   //            ])
   //          : (result[sport] = [...tournaments[tournament].events]);
   //       return result;
   //    },
   //    {}
   // );

   const kindsOfSport = Object.keys(tournaments).reduce(
      (result, tournament) => {
         const sport = tournaments[tournament].sport;
         const amount = tournaments[tournament].events.length;
         // console.log(result[sport]);
         result[sport]
            ? (result[sport] = {
                 ...result[sport],
                 tournaments: [
                    ...result[sport].tournaments,
                    tournaments[tournament],
                 ],
                 amount: result[sport].amount + amount,
              })
            : (result[sport] = {
                 tournaments: [tournaments[tournament]],
                 amount: amount,
              });
         // console.log([...tournaments[tournament].events]);
         // result[sport]
         //    ? (result[sport] = [
         //         ...result[sport],
         //         { ...tournaments[tournament] },
         //      ])
         //    : (result[sport] = [{ ...tournaments[tournament] }]);
         return result;
      },
      {}
   );

   // console.log(kindsOfSport);

   const handleSelectedTournament = (id) => {
      dispatch(actions.SET_SELECTED_TOURNAMENT(id));
      // console.log(id);
   };

   // const kindsOfSport = events.reduce((acc, event) => {
   //    const kindOfSport = event.data.sport.name;
   //    acc[kindOfSport]
   //       ? (acc[kindOfSport] = [...acc[kindOfSport], event])
   //       : (acc[kindOfSport] = [event]);
   //    return acc;
   // }, {});

   const sortKindsOfSportArr = Object.keys(kindsOfSport).sort((a, b) => {
      if (kindsOfSport[a].amount < kindsOfSport[b].amount) {
         return 1;
      }
      if (kindsOfSport[a].amount > kindsOfSport[b].amount) {
         return -1;
      }
      return 0;
   });

   return (
      <div className={classes.container}>
         <div className={classes.left}>
            {sortKindsOfSportArr.map((sport) => {
               // console.log(kindsOfSport[sport]);
               const amount = kindsOfSport[sport].amount;
               // console.log(amount);
               return (
                  <KindOfSport
                     tournamentsBySport={kindsOfSport[sport].tournaments}
                     key={sport}
                     sport={sport}
                     amount={amount}
                     handleSelectedTournament={handleSelectedTournament}
                  />
               );
            })}
         </div>
         <div></div>
      </div>
   );
};
