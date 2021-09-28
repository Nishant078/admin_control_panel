import React from "react";
import { make_post_request } from "./Utility";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

const LeftPanel = (props) => {
   const { list, get_list_from_server } = props;
   const add_list = async (e) => {
      if (e.key === "Enter") {
         const list_name = $("#list_name_input").val();
         if (/^[0-9a-zA-Z_-]+$/.test(list_name)) {
            if (!list.includes(list_name) && list_name !== "") {
               await make_post_request({
                  command: "add_list",
                  list_name: list_name,
               });
               await get_list_from_server();
               $("#list_name_input").val("");
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
      <div className="admin-left">
         <ul className="admin-listitem">{list_render}</ul>
         <br key="br" />
         <input
            key="list_name_input"
            id="list_name_input"
            type="text"
            placeholder="List Name"
            onKeyPress={add_list}
         />
      </div>
   );
};

export default LeftPanel;
