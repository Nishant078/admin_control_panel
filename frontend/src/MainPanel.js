import React from "react";

const MainPanel = (props) => {
   const { match } = props;
   if (!match.params.list_name) {
      return (
         <div className="admin-main">
            Please select the list.
         </div>
      );
   } else {
      return (
         <div className="admin-main">
            {match.params.list_name}
         </div>
      );
   }
};

export default MainPanel;
