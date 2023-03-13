export * from './constants';

export const getFormBody = (params) => {
    let fromBody = [];

    for(let property in params) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(params[property]);

        fromBody(encodedKey + '=' + encodedValue);
    }
    return fromBody.join('&');
};