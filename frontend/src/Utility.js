export const make_post_request = async (body) => {
   const request_list_options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
   };
   const response = await fetch("/api", request_list_options);
   const data = await response.json();
   return data;
};
