import React, { useContext } from "react";
import { Redirect } from "react-router";
import { Context } from "./Common";

const MainPanel = (props) => {
   const { match } = props;
   const { state } = useContext(Context);
   const list_name = match.params.list_name;
   if (!list_name) {
      return <div className="admin-main">Please select the list.</div>;
   } else {
      if (state.list.includes(list_name)) {
         return <div className="admin-main">{list_name}</div>;
      } else {
         return <Redirect to="/" />;
      }
   }
};

export default MainPanel;
