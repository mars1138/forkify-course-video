 import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // if timeout finishes 1st, will result in rejected promise and trigger catch block below;
    // Forkify API will return back the data we send to it
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    console.log('getJSON res:', res);

    const data = await res.json();
    console.log('getJSON data:', data);

    if (!res.ok) throw new Error(`${data.message} (${res.status}😫)`);

    return data; // return resolved value of res.json() above
  } catch (err) {
    console.log('getJSON err:', err);
    throw err; // must throw error if we want error to be resolved in function that calls getJSON()
  }
};

// THESE SEPARATE FUNCTIONS HAVE BEEN REFACTORED INTO ONE FUNCTION, AJAX()
// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);

//     // if timeout finishes 1st, will result in rejected promise and trigger catch block below;
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     console.log('getJSON res:', res);

//     const data = await res.json();
//     console.log('getJSON data:', data);

//     if (!res.ok) throw new Error(`${data.message} (${res.status}😫)`);

//     return data; // return resolved value of res.json() above
//   } catch (err) {
//     console.log('getJSON err:', err);
//     throw err; // must throw error if we want error to be resolved in function that calls getJSON()
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     // if timeout finishes 1st, will result in rejected promise and trigger catch block below;
//     // Forkify API will return back the data we send to it
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status}😫)`);

//     return data; // return resolved value of res.json() above
//   } catch (err) {
//     throw err; // must throw error if we want error to be resolved in function that calls getJSON()
//   }
// };
