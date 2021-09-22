import "./App.css";
import { useState, useEffect } from "react";
import $ from "jquery";

let make_post_request = async (body) => {
   const request_list_options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
   };
   const response = await fetch("/api", request_list_options);
   const data = await response.json();
   return data;
};

function App() {
   const [list, set_list] = useState([]);
   useEffect(() => {
      get_list_from_server();
   }, []);

   let get_list_from_server = async () => {
      const data = await make_post_request({ command: "get_list" });
      console.log(data);
      if (data["status"] === "OK") set_list(data["list"]);
   };

   let add_list_clicked = async () => {
      let list_name = $("#list_name_input").val();
      if (!list.includes(list_name) && list_name !== "") {
         await make_post_request({ command: "add_list", list_name: list_name });
         await get_list_from_server();
         $("#list_name_input").val("");
      }
   };

   let delete_list_clicked = async (index) => {
      console.log(list[index]);
      await make_post_request({
         command: "delete_list",
         list_name: list[index],
      });
      await get_list_from_server();
   };

   return (
      <>
         {list.map((item, index) => {
            return (
               <div key={" " + index}>
                  <p key={index}>{item}</p>
                  <input
                     key={"delete list" + index}
                     type="button"
                     value="delete list"
                     onClick={() => delete_list_clicked(index)}
                  />
               </div>
            );
         })}
         <br key="br" />
         <input
            key="0"
            id="list_name_input"
            type="text"
            placeholder="List Name"
         />
         <input
            key="1"
            type="button"
            value="add list"
            onClick={add_list_clicked}
         />
      </>
   );
}

export default App;
