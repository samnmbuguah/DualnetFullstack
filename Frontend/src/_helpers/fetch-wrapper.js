import { store, authActions } from "_store";
import Swal from "sweetalert2";

export const api_url = "http://localhost:3042";
// export const api_url = "http://dualnet.ch";


function request(method) {
  return async (url, body) => {
    const headers = authHeader(url);
    if (body) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }
    const response = await fetch(url, { method, headers, body });
    return handleResponse(response);
  };
}

function authHeader(url) {
  const {
    auth: { user },
  } = store.getState();
  const token = user && user.length > 0 ? user[0].accessToken : false;
  const isLoggedIn = !!token;
  const isApiUrl = url.startsWith(api_url);
  return isLoggedIn && isApiUrl ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(response) {
  const text = await response.text();
  const data = text && JSON.parse(text);

  if (!response.ok) {
    const {
      auth: { user },
    } = store.getState();
    const token = user && user.length > 0 ? user[0].accessToken : false;
    const isLoggedIn = !!token;

    if ([401, 403].includes(response.status) && isLoggedIn) {
      store.dispatch(authActions.logout());
    }

    const error = (data && data.msg) || response.statusText;
    Swal.fire("Error", data.msg ?? "Server error", "error");
    throw error;
  }

  return data;
}

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
  api_url: api_url,
};
