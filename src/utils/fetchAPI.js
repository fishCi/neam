/*
 * @Author: zhaozheng1.zh 
 * @Date: 2017-09-28 14:59:05 
 * @Last Modified by: fishci
 * @Last Modified time: 2017-10-26 13:09:22
 */

import CONFIG from './config';

export function fetchPost(serviceId, jsonData, success, failure){
        jsonData.transaction_id = serviceId;
        jd = JSON.stringify(jsonData);
        console.log(jd);
        url =`${CONFIG.URL}?_fw_service_id=F30070011&jsonClass=java.util.HashMap&jsonData=${jd}`;
        fetch(url)
            .then((response) =>{
                console.log(JSON.stringify(response));
                return response.json()})
            .then((responseText) => success(responseText))
            .catch((error) => failure(error));
    };

    // fetchPost(serviceId, jsonData, success, failure) {
    //     let formData = new FormData();
    //     for(let key of Object.keys(jsonData)){
    //         if(key == 'jsonData'){
    //             formData.append(key,JSON.stringify(jsonData[key]))
    //         }else{
    //             formData.append(key,jsonData[key])
    //         }
    //     }
    //     let fetchOptions = {
    //         method: POST,
    //         body:formData,
    //         timeout:TIMEOUT
    //     }
    //     fetch(URL,fetchOptions)
    //         .then((response) => response.text())
    //         .then((responseText) => {
    //             const json = JSON.parse(responseText);
    //             success(json);
    //         })
    //         .catch((error) => {
    //             failure(error);
    //         });
    // }