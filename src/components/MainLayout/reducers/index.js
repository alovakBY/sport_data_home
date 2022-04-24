import { handleActions } from "redux-actions";

import * as actions from "../actions";
import { parseGroupMarkets } from "../../../utils/parseGroupMarkets";
import { getEventsByTournaments } from "../../../utils/getEventsByTournaments";

const defaultState = {
   events: [],
   tournaments: {},
};

export const mainPageReducer = handleActions(
   {
      [actions.SET_EVENTS]: (state, { payload }) => {
         console.log(payload);
         //  закончили стейт по турнирам
         const events = payload.map((event) => {
            return {
               ...event,
               markets: parseGroupMarkets(event.group_markets),
            };
         });
         const tournaments = getEventsByTournaments(events, state.tournaments);
         // console.log(tournaments);
         return { ...state, events, tournaments };
      },
      [actions.UPDATE_EVENTS]: (state, { payload }) => {
         const oldEvents = [...state.events];
         const oldTournaments = { ...state.tournaments };
         const updatedEvents = [...payload];

         const events = updatedEvents.reduce((result, updateEvent) => {
            const oldEvent = oldEvents.find((oldEv) => {
               return updateEvent.id === oldEv.id;
            });

            if (oldEvent && !updateEvent.data) {
               result.push(oldEvent);
            }
            if (oldEvent && updateEvent.data) {
               const updatedEvent = {
                  ...oldEvent,
                  digest_type: updateEvent.digest_type,
                  data: updateEvent.data,
                  group_markets:
                     updateEvent.group_markets || oldEvent.group_markets,
                  markets: updateEvent.group_markets
                     ? parseGroupMarkets(updateEvent.group_markets)
                     : oldEvent.markets,
               };
               // console.log(updatedEvent);
               result.push(updatedEvent);
            }
            if (!oldEvent) {
               const newEvent = {
                  ...updateEvent,
                  markets: parseGroupMarkets(updateEvent.group_markets),
               };
               result.push(newEvent);
            }
            return result;
         }, []);

         const tournaments_without_events = Object.keys(oldTournaments).reduce(
            (result, tournament) => {
               result[tournament] = {
                  ...oldTournaments[tournament],
                  events: [],
               };
               return result;
            },
            {}
         );

         const tournaments = getEventsByTournaments(
            events,
            tournaments_without_events
         );

         return { ...state, events, tournaments };
      },
      [actions.SET_SELECTED_TOURNAMENT]: (state, { payload }) => {
         const id = payload;
         // const copy = state.tournaments;
         // console.log(copy[payload]);
         // const up = {
         //    ...copy[payload],
         //    isSelected: !copy[payload].isSelected,
         // };
         const up = {
            ...state.tournaments,
            [id]: {
               ...state.tournaments[id],
               isSelected: !state.tournaments[id].isSelected,
            },
         };
         return {
            ...state,
            tournaments: up,
         };
      },
   },
   defaultState
);
