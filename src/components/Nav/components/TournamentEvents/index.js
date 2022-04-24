import { useState, memo } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { mainPageSelector } from "../../../MainLayout/selectors";

import classes from "./TournamentEvents.module.css";

export const TournamentEvents = ({ tournament, handleSelectedTournament }) => {
   // const [checked, setChecked] = useState(false);
   const { tournaments } = useSelector(mainPageSelector);
   // const id = useParams();

   // const params = Object.keys(tournaments).reduce((str, tour) => {
   //    if (tournaments[tour].isSelected) {
   //       str
   //          ? (str += "," + tournaments[tour].tournament_id)
   //          : (str += tournaments[tour].tournament_id);
   //    }
   //    return str;
   // }, "");

   // console.log(1);
   // console.log(params);

   return (
      <NavLink
         to={`tournaments`}
         className={classes.link}
         onClick={() => handleSelectedTournament(tournament.tournament_id)}
      >
         <label className={classes.label}>
            <div>
               <span className={classes.tournament}>
                  {tournament.tournament_name}
               </span>
               <span className={classes.amount}>
                  ({tournament.events.length})
               </span>
            </div>
            <div className={classes.checkboxWrapper}>
               <input
                  className={classes.input}
                  type="checkbox"
                  checked={tournament.isSelected}
                  onChange={() =>
                     handleSelectedTournament(tournament.tournament_id)
                  }
               />
               <span className={classes.customCheckbox}></span>
            </div>
         </label>
      </NavLink>
   );
};
