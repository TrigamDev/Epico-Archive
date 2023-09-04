export async function post(url: string, body: any) {
    const baseUrl = window.location.origin.split(":").slice(0, 2).join(":");
    try {
        const res = await fetch(`${baseUrl}:5050/api/${url}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        return data;
    } catch (err) { console.log(err); }
};

export async function get(url: string) {
    const baseUrl = window.location.origin.split(":").slice(0, 2).join(":");
    try {
        const res = await fetch(`${baseUrl}:5050/api/${url}`, {
            method: 'GET', headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        return data;
    } catch (err) { console.log(err); }
}