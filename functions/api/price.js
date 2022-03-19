export async function onRequestGet() {
  let response = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=bnb&tsyms=USD`,
    {
      cf: {
        cacheTtl: 5,
        cacheEverything: true,
      },
    }
  );

  response = new Response(response.body, response);

  // Set cache control headers to cache on browser for 25 minutes
  response.headers.set("Cache-Control", "max-age=1500");
  return response;
}
