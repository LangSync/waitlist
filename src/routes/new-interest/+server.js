import { json } from '@sveltejs/kit';

// @ts-ignore
export async function POST({ request }) {

        const listId = "97fd984e4b";
          const apiKey = "895d5b542f345f5da0accaf3cb85c752-us21"; 
        const apiServer = "us21";

        const apiUrl = `https://${apiServer}.api.mailchimp.com/3.0/lists/${listId}/members`;
  let reqJson = await request.json();
  
  const body = JSON.stringify({
          email_address: reqJson.email,
          status: "subscribed",
            });


        const requestData = {
          method: "POST",
          headers: {
            Authorization: `Basic ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: body,
        };

    let res = await fetch(apiUrl, requestData);
    let r = await res.json();
          
        // console.log(r);

        return json({ r }, { status: res.status });

}
