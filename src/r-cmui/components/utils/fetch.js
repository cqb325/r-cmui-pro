export default async (url = '', data = {}, type = 'GET', fail) => {
    type = type.toUpperCase();
    let dataStr = ''; // 数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += `${key}=${data[key]}&`;
    });
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    if (type === 'GET') {
        if (dataStr !== '') {
            url = `${url}?${dataStr}`;
        }
        if (url.indexOf('?') > -1) {
            url += `&_=${new Date().getTime()}`;
        } else {
            url += `?_=${new Date().getTime()}`;
        }
    }

    const requestConfig = {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        mode: 'cors',
        cache: 'force-cache',
        credentials: 'include'
    };

    if (type == 'POST') {
        requestConfig.body = dataStr;
    }
    try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        if (fail) {
            fail(error);
        }
    }
};


export async function fetchText (url = '', data = {}) {
    let dataStr = ''; // 数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += `${key}=${data[key]}&`;
    });
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    if (dataStr !== '') {
        url = `${url}?${dataStr}`;
    }
    if (url.indexOf('?') > -1) {
        url += `&_=${new Date().getTime()}`;
    } else {
        url += `?_=${new Date().getTime()}`;
    }

    const requestConfig = {
        method: 'GET',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        mode: 'cors',
        cache: 'force-cache',
        credentials: 'include'
    };

    try {
        const response = await fetch(url, requestConfig);
        const responseText = await response.text();
        return responseText;
    } catch (error) {
        console.error(error);
    }
}
