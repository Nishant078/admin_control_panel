import "./App.css";
import { useState, useEffect } from "react";
import $ from "jquery";

function App() {
   const [list, set_list] = useState([]);
   useEffect(() => {
      get_list_from_server();
   }, []);

   let get_list_from_server = async () => {
      const request_list_options = {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ command: "get_list" }),
      };
      const response = await fetch("/api", request_list_options);
      const data = await response.json();
      console.log(data);
      if (data["status"] === "OK") set_list(data["list"]);
   };

   let submitButtonClicked = (e) => {
      let list_name = $("#text").val();
      if (!list.includes(list_name)) {
         fetch("/api", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               command: "add_list",
               list_name: list_name,
            }),
         });
      }
      get_list_from_server();
   };

   return (
      <>
         {list.map((item, index) => {
            return <p key={index}>{item}</p>;
         })}
         <input id="text" type="text" placeholder="List Name" />
         <input
            id="xyz"
            type="button"
            value="submit"
            onClick={submitButtonClicked}
         />
      </>
   );
}

export default App;
