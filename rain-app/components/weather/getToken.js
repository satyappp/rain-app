import { useState } from "react";
const username="tokyoinstituteoftechnology_uemura_ryota";
const password="YE1rbx801L";
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