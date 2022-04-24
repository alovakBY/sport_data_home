import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { mainPageSelector } from "../../components/MainLayout/selectors";

import classes from "./Tournament.module.css";

export const Tournaments = () => {
   const { tournaments } = useSelector(mainPageSelector);

   const activeTournaments = Object.keys(tournaments).reduce(
      (result, tournament) => {
         if (tournaments[tournament].isSelected) {
            result.push(tournaments[tournament]);
         }
         return result;
      },
      []
   );

   const a = activeTournaments.map((activeTournament) => {
      const events = activeTournament.events;

      const date = events.reduce((result, event) => {
         const date = event.data.time;
         // .split(" ")[0]
         // .split("-")
         // .reverse()
         // .join(".");
         result[date] ? result[date].push(event) : (result[date] = [event]);
         return result;
      }, {});

      const sortDate = Object.keys(date).sort((a, b) => {
         if (a < b) return -1;
         if (a > b) return 1;
         return 0;
      });

      console.log(date);

      return (
         <div className={classes.container}>
            <div className={classes.tournament}>
               {activeTournament.tournament_name}
            </div>
            {sortDate.map((el) => {
               return (
                  <div>
                     <div className={classes.date}>
                        {el.split(" ")[0].split("-").reverse().join(".")}
                     </div>
                     <div>
                        {date[el]
                           .sort((a, b) => {
                              if (a.data.name < b.data.name) return -1;
                              if (a.data.name > b.data.name) return 1;
                              return 0;
                           })
                           .map((event) => {
                              return (
                                 <div className={classes.event}>
                                    {event.data.name}
                                 </div>
                              );
                           })}
                     </div>
                  </div>
               );
            })}
         </div>
      );
   });

   console.log(a);

   // const a = active.map((el) => {
   //    return (
   //       <div className={classes.container}>
   //          <div className={classes.tournament}>
   //             {el.sport} » {el.tournament_name}
   //          </div>
   //          {el.events.map((event) => {
   //             return (
   //                <div className={classes.event}>
   //                   {event.data.name} {event.data.time}
   //                </div>
   //             );
   //          })}
   //       </div>
   //    );
   // });

   return <div>{a}</div>;
};
