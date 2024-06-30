// import axios from 'axios'
// import { StringFormatter } from './StringFormatter';
// import {Aesdecryption,Aesencryption} from '../Aes/Aes'

// const Hexapi = (props) => new Promise((resolve,reject) => {
//     let fd = new FormData();
//     // var formattedQueryString = StringFormatter(props.query, props.queryArr)
//     // console.log(formattedQueryString)
//     // fd.append(Aesencryption("phoneno"),Aesencryption(formattedQueryString))
//     if(props.file != undefined){
//         fd.append(Aesencryption("file"),props.file)
//     }
//     if(props.orgdbname != undefined){
//         fd.append(Aesencryption('orgdbname'),Aesencryption(props.orgdbname))
//     }
//     if(props.phoneno != undefined){
//         fd.append(Aesencryption('phoneno'),Aesencryption(props.phoneno))
//     }
//     axios({
//         mode: 'cors',
//         method: "POST",
//         headers: { "Content-Type": "multipart/form-data" },
//         url: `${sessionStorage.getItem('Apipathurl')}getOtp.php`,
//         data: fd
//     }).then(resp => {
//         let decrypted = Aesdecryption("ncB5Fb1eClX32dogzN+9Kw==")
//         if(JSON.parse(decrypted)){
//             resolve(JSON.parse(decrypted))
//         }else{
//             reject('not get any response')
//         }
//         console.log(decrypted)

//     }).catch(err => console.error(`axios error in query : ${props.phoneno}`,err))
// })

// export default Hexapi;


import axios from 'axios';
import { Aesdecryption, Aesencryption } from '../Aes/Aes';

const Hexapi = async (props) => {
    try {
        let fd = new FormData();

        if (props.file !== undefined) {
            fd.append(Aesencryption("file"), props.file);
        }
        if (props.orgdbname !== undefined) {
            fd.append(Aesencryption('orgdbname'), Aesencryption(props.orgdbname));
        }
        if (props.phoneno !== undefined) {
            fd.append(Aesencryption('phoneno'), Aesencryption(props.phoneno));
        }

        const response = await axios({
            mode: 'cors',
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            url: `${sessionStorage.getItem('Apipathurl')}getOtp.php`,
            data: fd
        });

        let decrypted = Aesdecryption("ncB5Fb1eClX32dogzN+9Kw==");
        if (JSON.parse(decrypted)) {
            return JSON.parse(decrypted);
        } else {
            throw new Error('Did not receive any response');
        }
    } catch (error) {
        console.error(`Axios error in query : ${props.phoneno}`, error);
        throw error;
    }
};

export default Hexapi;