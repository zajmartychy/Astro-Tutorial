import type { APIRoute } from "astro"
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    let req_headers = {};
    /*     let hdrs = new Array();
        for (let header of request.headers) {
          hdrs.push(header);
        } */
    request.headers.forEach((val, key) => req_headers[key] = val);
    return new Response(JSON.stringify({
      body: body,
      req_hdrs: req_headers
    }, undefined, 4), {
      status: 200,
      headers: [
        ["Content-Type", "application/json"],
        ["Custom-Header", "ABC-123"]]
    })
  }
  return new Response(null, { status: 400 });
}

export const ALL: APIRoute = async ({ request }) => {
  const req = request;
  let req_headers = {};
  req.headers.forEach((val, key) => req_headers[key] = val);
  var globs = import.meta.glob("../*");
  var m1 = await globs["../404.astro"]();

  return new Response(JSON.stringify({
    method: req.method,
    req_headers: req_headers,
    body: m1
  }, undefined, "\t"), {
    headers: [
      ["Content-Type", "application/json"],
      ["Custom-Header", "ABC-123"]]
  }
  )
}
