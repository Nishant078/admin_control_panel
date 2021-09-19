import "./App.css";
import { useState, useEffect } from "react";
import $ from "jquery";

let get_list_from_server = async (set_list) => {
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
   let text_field_value = $("#text").val();
   fetch("/api", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ text_field_value: text_field_value }),
   });
};

function App() {
   const [list, set_list] = useState([]);
   useEffect(() => {
      get_list_from_server(set_list);
   }, []);

   return (
      <>
         {list.map((l) => {
            return <p>{l}</p>;
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
