import axios from 'axios'
import Cookies from 'js-cookie';


/**
 * Make request using Request promise module
 *
 * @param {String} url URL of the request
 * @param {String} method Method of the request to be made GET,POST,PUT etc
 * @param {Object} headers Headers of the request to be sent
 * @param {Object} body Body containing
 *
 * @returns {Promise<{success: boolean, data: {}, error: string}>}
 */
const makeAxiosRequest = async (url, method, headers = {}, body = '', auth = '') => {
    let response = {
        success: true,
        data: {},
        err: ''
    };
    let jwt = JSON.parse(Cookies.get('jwt'))
    headers.authorization = jwt
    let params = {
        url: url,
        method: method,
        headers: headers,
        data: body,
        json: true
    };
    console.log("params", params);
    if (auth !== "") {
        params.auth = auth;
    }
    try {
        let axiosResponse = await axios(params);
        response.data = axiosResponse.data;
    }
    catch (err) {
        let axiosError = err.response;
        response.success = false;
        response.err = axiosError;
    }

    return response
};

export default makeAxiosRequest