import "./App.scss";
import React, { useEffect, useReducer } from "react";
import LeftPanel from "./LeftPanel";
import MainPanel from "./MainPanel";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Context, reducer, set_dispatch, api } from "./Common";

const App = (props) => {
   const [state, dispatch] = useReducer(reducer, { list: [] });

   useEffect(() => {
      set_dispatch(dispatch);
      api.get_list_from_server();
   }, []);

   return (
      <Context.Provider value={{ state }}>
         <div className="admin-section">
            <Router>
               <LeftPanel state={state} dispatch={dispatch} />
               <Route path="/" exact component={MainPanel} />
               <Route path="/:list_name" component={MainPanel} />
            </Router>
         </div>
      </Context.Provider>
   );
};

export default App;
