import React, { useState, useEffect } from "react";
import { make_post_request } from "./Utility";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

const LeftPanel = (props) => {
   const { list, get_list_from_server } = props;
   const [width, set_width] = useState();

   useEffect(() => {
      const w = parseInt(localStorage.getItem("left_panel_width"));
      if (w) {
         set_width(w);
      } else {
         localStorage.setItem("left_panel_width", 25);
         set_width(15);
      }
   }, []);

   const add_list = async (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
         const list_name = e.target.value;
         if (/^[0-9a-zA-Z_-]+$/.test(list_name)) {
            if (!list.includes(list_name) && list_name !== "") {
               await make_post_request({
                  command: "add_list",
                  list_name: list_name,
               });
               await get_list_from_server();
               e.target.value = "";
            }
         }
      }
   };

   const delete_list_clicked = async (index) => {
      await make_post_request({
         command: "delete_list",
         list_name: list[index],
      });
      await get_list_from_server();
   };

   const resize_handler = (e) => {
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
            console.log(width);
            localStorage.setItem("left_panel_width", width);
            document.removeEventListener("mousemove", mousemove_handler);
         },
         { once: true }
      );
   };

   let list_render = [];
   list.forEach((item, index) => {
      list_render.push(
         <li key={index}>
            <Link to={`/${item}`} key={index}>
               {item}
            </Link>
            <FontAwesomeIcon
               icon={icons.faTrashAlt}
               onClick={() => delete_list_clicked(index)}
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
