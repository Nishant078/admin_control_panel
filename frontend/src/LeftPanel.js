import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { ACTION } from "./GlobalState";

const LeftPanel = (props) => {
   const { state, dispatch } = props;
   const { list } = state;
   const [width, set_width] = useState();

   useEffect(() => {
      let w = parseFloat(localStorage.getItem("left_panel_width"));
      if (!w) {
         localStorage.setItem("left_panel_width", 15);
         w = 15;
      }
      set_width(w);
   }, []);

   useEffect(() => {
      localStorage.setItem("left_panel_width", width);
   }, [width]);

   const add_list = async (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
         const list_name = e.target.value;
         if (/^[0-9a-zA-Z_-]+$/.test(list_name) && !list.includes(list_name)) {
            dispatch({ type: ACTION.add_list, payload: list_name });
            e.target.value = "";
         }
      }
   };

   const resize_handler = (e) => {
      e.preventDefault();
      const drag_start_pos = e.clientX;
      let drag_start_width = width;
      const mousemove_handler = (e) => {
         let change_in_x =
            ((e.clientX - drag_start_pos) /
               document.documentElement.clientWidth) *
            100;
         set_width(drag_start_width + change_in_x);
      };
      document.addEventListener("mousemove", mousemove_handler);
      document.addEventListener(
         "mouseup",
         (e) => {
            document.removeEventListener("mousemove", mousemove_handler);
         },
         { once: true }
      );
   };

   let list_render = [];
   state.list &&
      state.list.forEach((item, index) => {
         list_render.push(
            <li key={index}>
               <Link to={`/${item}`} key={index}>
                  {item}
               </Link>
               <FontAwesomeIcon
                  icon={icons.faTrashAlt}
                  onClick={() =>
                     dispatch({ type: ACTION.delete_list, payload: index })
                  }
               />
            </li>
         );
      });

   return (
      <>
         <div className="admin-left-panel" style={{ width: `${width}%` }}>
            <ul className="admin-list-items">{list_render}</ul>
            <br key="br" />
            <input
               key="list_name_input"
               id="list_name_input"
               type="text"
               placeholder="List Name"
               onKeyPress={add_list}
            />
         </div>
         <div
            className="admin-left-panel-resize"
            style={{ width: "10px", backgroundColor: "#989898" }}
            onMouseDown={resize_handler}
         />
      </>
   );
};

export default LeftPanel;
