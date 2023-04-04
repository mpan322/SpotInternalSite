export function postToAPIFunc(func: string, endpoint: string, data?: Object) {

    // replace with process.env
    const URL = `https://europe-west2-fir-hosting-test-344dc.cloudfunctions.net/${func}/${endpoint}`;
    return fetch(URL, {
        "method": "POST",
        mode: "cors",
        "body": JSON.stringify(data),
    });
}
