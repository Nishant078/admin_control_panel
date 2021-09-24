import "./App.css";
import { useState, useEffect } from "react";
import LeftPanel from "./LeftPanel";
import { make_post_request } from "./Utility";

function App() {
   const [list, set_list] = useState([]);
   useEffect(() => {
      get_list_from_server();
   }, []);

   const get_list_from_server = async () => {
      const data = await make_post_request({ command: "get_list" });
      if (data["status"] === "OK") set_list(data["list"]);
      console.log(data["list"]);
   };

   return <LeftPanel list={list} get_list_from_server={get_list_from_server} />;
}

export default App;
