import "./App.scss";
import { useEffect, useReducer } from "react";
import LeftPanel from "./LeftPanel";
import MainPanel from "./MainPanel";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ACTION, reducer, set_dispatch } from "./GlobalState";

const App = (props) => {
   const [state, dispatch] = useReducer(reducer, { list: [] });

   useEffect(() => {
      set_dispatch(dispatch);
      dispatch({ type: ACTION.get_list });
   }, []);

   return (
      <div className="admin-section">
         <Router>
            <LeftPanel state={state} dispatch={dispatch} />
            <Route path="/" exact component={MainPanel} />
            <Route path="/:list_name" component={MainPanel} />
         </Router>
      </div>
   );
};

export default App;
