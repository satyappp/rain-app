import { useState } from "react";
import {decode as atob, encode as btoa} from 'base-64'
const username="universityofaizu_pahari_satyabrata";
const password="xxQ12AI32s";
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

const getToken = async ()=>
{
    const response = await fetch('https://login.meteomatics.com/api/v1/token', {
            method: 'GET', headers: headers
        })
    const data = await response.json()
    const token = data.access_token;
    return token;
}

// const getToken = ()=>{
//     return new Promise( (resolve, reject) =>{
//         const token = fetchToken();
//         setTimeout(()=>{
//             if (token !== undefined) resolve(token);
//             else reject(new Error());
//         }, 2000);
//     })
// };

export default getToken;