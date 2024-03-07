// INPUT EXAMPLE
// start_date : 2024-03-07T00:00:00Z
// interval: 7
// longtitute, latitude: 35.333

//OUTPUT EXAMPLE
// "api.meteomatics.com/2024-03-07T00:00:00Z--2024-03-10T00:00:00Z:PT1H/t_2m:C/52.520551,13.461804/json"
// import token from "./getToken";
import getToken from "./getToken";

// const  makeUrl = (latitude, longitude, start_date, interval,format="json")=>{
//     getToken().then(()=>
//     {
//        url = "https://api.meteomatics.com/2024-03-07T00:00:00Z--2024-03-10T00:00:00Z:PT1H/t_2m:C/52.520551,13.461804/json";            
//         // url = `https://api.meteomatics.com/2024-03-07T00:00:00Z--2024-03-10T00:00:00Z:PT1H/t_2m:C/${latitude},${longitude}/${format}`
//         url += `?access_token=${token}`
//         console.log(url);
//         return url;
//     }).catch(e => console.log("トークン取れなかった"))
// };

const  makeUrl = async (latitude, longitude, start_date, interval,format="json")=>{
    try {
        const token = await getToken();
        let url = "https://api.meteomatics.com/2024-03-07T00:00:00Z--2024-03-10T00:00:00Z:PT24H/t_2m:C/52.520551,13.461804/json";            
        // url = `https://api.meteomatics.com/2024-03-07T00:00:00Z--2024-03-10T00:00:00Z:PT1H/t_2m:C/${latitude},${longitude}/${format}`
        url += `?access_token=${token}`
        console.log(url);
        return url;
    } catch (e) {
        console.log("トークン取れなかった");
        return null;
    }
};
// const  makeUrl = async (latitude, longitude, start_date, interval,format="json")=>{
//     getToken().then((token)=>
//     {
//         url = "https://api.meteomatics.com/2024-03-07T00:00:00Z--2024-03-10T00:00:00Z:PT1H/t_2m:C/52.520551,13.461804/json";            
//         // url = `https://api.meteomatics.com/2024-03-07T00:00:00Z--2024-03-10T00:00:00Z:PT1H/t_2m:C/${latitude},${longitude}/${format}`
//         url += `?access_token=${token}`
//         console.log(url);
//         return url;
//     }).catch(e => console.log("トークン取れなかった"))
// };

export default makeUrl;