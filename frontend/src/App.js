import "./App.scss";
import { useState, useEffect } from "react";
import LeftPanel from "./LeftPanel";
import { make_post_request } from "./Utility";
import MainPanel from "./MainPanel";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = (props) => {
   const [list, set_list] = useState([]);
   useEffect(() => {
      get_list_from_server();
   }, []);

   const get_list_from_server = async () => {
      const data = await make_post_request({ command: "get_list" });
      if (data["status"] === "OK") set_list(data["list"]);
   };

   return (
      <div>
         <Router>
            <LeftPanel
               list={list}
               get_list_from_server={get_list_from_server}
            />
            <br />
            <Route path="/" exact component={MainPanel} />
            <Route path="/:list_name" component={MainPanel} />
         </Router>
      </div>
   );
};

export default App;
