import React from "react";
import { make_post_request } from "./Utility";
import $ from "jquery";
import { Link } from "react-router-dom";

const LeftPanel = (props) => {
   const { list, get_list_from_server } = props;
   const add_list_clicked = async () => {
      const list_name = $("#list_name_input").val();
      if (!list.includes(list_name) && list_name !== "") {
         await make_post_request({ command: "add_list", list_name: list_name });
         await get_list_from_server();
         $("#list_name_input").val("");
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
         <div key={index}>
            <Link to={`/${item}`} key={index}>
               {item}
            </Link>
            <input
               key={"btn" + index}
               type="button"
               value="delete list"
               onClick={() => delete_list_clicked(index)}
            />
         </div>
      );
   });

   return (
      <div className="left-panel" style={{ backgroundColor: "pink" }}>
         {list_render}
         <br key="br" />
         <input
            key="list_name_input"
            id="list_name_input"
            type="text"
            placeholder="List Name"
         />
         <input
            key="btn"
            type="button"
            value="add list"
            onClick={add_list_clicked}
         />
      </div>
   );
};

export default LeftPanel;
