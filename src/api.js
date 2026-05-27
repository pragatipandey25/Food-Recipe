const API_BASE = import.meta.env.VITE_API_BASE || "";

export const getToken = () => localStorage.getItem("authToken");
export const setToken = (t) => {
  if (t) localStorage.setItem("authToken", t);
};
export const clearToken = () => localStorage.removeItem("authToken");

async function request(path, { method = "GET", body, headers = {} } = {}) {
  if (!API_BASE) throw new Error("No API_BASE configured");

  const token = getToken();
  const res = await fetch(API_BASE + path, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (e) {
    throw new Error(`Invalid JSON response (${res.status})`);
  }

  if (!res.ok) {
    const message = (json && json.message) || res.statusText || "Request failed";
    const err = new Error(message);
    err.status = res.status;
    err.body = json;
    throw err;
  }

  return json;
}

export const apiPost = (path, body) => request(path, { method: "POST", body });
export const apiGet = (path) => request(path, { method: "GET" });

export default { API_BASE, request, apiPost, apiGet, getToken, setToken, clearToken };
