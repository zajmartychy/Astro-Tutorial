export const prerender = false;

export async function GET() {
    const result = await fetch(`https://swapi.dev/api/planets/`)
    const product = await result.json();

    if (!product) {
        return new Response(null, {
            status: 404,
            statusText: 'Not found'
        });
    }

    return new Response(
        JSON.stringify(product,undefined,"\t"), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    }
    );
}