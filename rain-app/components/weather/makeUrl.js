// INPUT EXAMPLE
// start_date : 2024-03-07T00:00:00Z
// interval: 7
// longtitute, latitude: 35.333

//OUTPUT EXAMPLE
// "api.meteomatics.com/2024-03-07T00:00:00Z--2024-03-10T00:00:00Z:PT1H/t_2m:C/52.520551,13.461804/json"
import getToken from "./getToken";


const formatDate = (date)=>{
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = `${formattedDate}T00:00:00Z`;
    return formattedTime;
}
const  makeUrl = async (latitude, longitude, startDate, interval,dateFormat="json")=>{
    formattedStartDate = formatDate(startDate);
    formattedEndDate = formatDate(new Date(startDate.getTime() + interval*24*60*60*1000));

    try {
        const token = await getToken();
        let url = `https://api.meteomatics.com/${formattedStartDate}--${formattedEndDate}:PT24H/t_2m:C,t_max_2m_24h:C,t_min_2m_24h:C/${longitude},${latitude}/${dateFormat}`
        url += `?access_token=${token}`
        url = encodeURI(url);
        console.log(encodeURI(url));
        return url;
    } catch (e) {
        console.log("トークン取れなかった");
        return null;
    }
};

export default makeUrl;