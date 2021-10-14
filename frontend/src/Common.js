import { createContext } from "react";

export const Context = createContext();

export let dispatch;
export const set_dispatch = (d) => {
   dispatch = d;
};

export const reducer = (state, action) => {
   switch (action.type) {
      case ACTION.set_list: {
         const new_state = { ...state, list: action.payload };
         return new_state;
      }

      case ACTION.add_list: {
         const list_name = action.payload;
         const new_state = { ...state, list: [...state.list, list_name] };
         return new_state;
      }

      case ACTION.delete_list: {
         const list_name = action.payload;
         const new_list = state.list.filter((item) => item !== list_name);
         const new_state = { ...state, list: new_list };
         return new_state;
      }

      default:
         console.log(`action type ${action.type} is not supported`);
   }
};

export const ACTION = {
   set_list: "set_list",
   add_list: "add_list",
   delete_list: "delete_list",
};

export const api = {
   make_post_request: async (body) => {
      const request_list_options = {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(body),
      };
      try {
         const response = await fetch("/api", request_list_options);
         const data = await response.json();
         return data;
      } catch (e) {
         console.log("Unsuccessful post request : ", body);
         console.log(e);
      }
   },

   get_list_from_server: async () => {
      const data = await api.make_post_request({ command: "get_list" });
      if (data) {
         let list = [];
         if (data["status"] === "OK") list = data["list"];
         if (list !== []) dispatch({ type: ACTION.set_list, payload: list });
         else console.log("unable to get list from server");
      } else console.log("unable to get list from server");
   },

   add_list: async (list_name) => {
      let response = await make_post_request({
         command: "add_list",
         list_name: list_name,
      });
      if (response["status"] === "OK")
         dispatch({ type: ACTION.add_list, payload: list_name });
      else console.log("failed to add_list :", list_name);
   },

   delete_list: async (list_name) => {
      let response = await make_post_request({
         command: "delete_list",
         list_name: list_name,
      });
      if (response["status"] === "OK")
         dispatch({ type: ACTION.delete_list, payload: list_name });
      else console.log("failed to delete list :", list_name);
   },
};

const make_post_request = async (body) => {
   const request_list_options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
   };
   const response = await fetch("/api", request_list_options);
   const data = await response.json();
   return data;
};
