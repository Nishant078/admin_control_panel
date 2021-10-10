import { createContext } from "react";
import { make_post_request } from "./Utility";

export const context = createContext();

let dispatch;
export const set_dispatch = (d) => (dispatch = d);

export const reducer = (state, action) => {
   switch (action.type) {
      case ACTION.get_list:
         get_list_from_server().then((list) => {
            dispatch({ type: ACTION.set_list, payload: list });
         });
         return state;

      case ACTION.set_list: {
         const new_state = { ...state, list: action.payload };
         return new_state;
      }

      case ACTION.add_list: {
         const list_name = action.payload;
         make_post_request({
            command: "add_list",
            list_name: list_name,
         });
         const new_state = { ...state, list: [...state.list, list_name] };
         return new_state;
      }

      case ACTION.delete_list: {
         let delete_index = action.payload;
         make_post_request({
            command: "delete_list",
            list_name: state.list[delete_index],
         });
         state.list.splice(delete_index, 1);
         let new_state = { ...state, list: [...state.list] };
         return new_state;
      }

      default:
         console.log(`action type ${action.type} is not supported`);
   }
};

export const ACTION = {
   get_list: 0,
   set_list: 1,
   add_list: 2,
   delete_list: 3,
};

const get_list_from_server = async () => {
   const data = await make_post_request({ command: "get_list" });
   if (data["status"] === "OK") return data["list"];
   else return [];
};
