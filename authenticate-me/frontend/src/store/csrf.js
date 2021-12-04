import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }
    // call default window's fetch with url and options passed in
    const res = await window.fetch(url, options);

    // if res status is 400 or above, throw response as error
    if (res.status >= 400) throw res;

    // if res status is less than 400, return res to next promise chain
    return res;
}

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}