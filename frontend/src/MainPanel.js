import React from "react";

const MainPanel = (props) => {
   const { match } = props;
   if (!match.params.list_name) {
      return (
         <div className="main-panel" style={{ backgroundColor: "lightblue" }}>
            Please select the list.
         </div>
      );
   } else {
      return (
         <div className="main-panel" style={{ backgroundColor: "lightblue" }}>
            {match.params.list_name}
         </div>
      );
   }
};

export default MainPanel;
