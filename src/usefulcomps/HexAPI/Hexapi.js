import axios from 'axios';
import { StringFormatter } from './StringFormatter';
import { Aesdecryption, Aesencryption } from '../Aes/Aes';


const Hexapi = async (props) => {
    console.log(props,"------------")
    try {
        let fd = new FormData();
        const formattedQueryString = StringFormatter(props.query, props.queryArr);
        console.log(formattedQueryString);
        fd.append(Aesencryption("Query"), Aesencryption(formattedQueryString));

        if (props.file !== undefined) {
            fd.append('file', props.file);
        }

        const response = await axios({
            mode: 'cors',
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            url: `${props.Apipathurl}fetchrsdataV4.php`,
            data: fd
        });

        let decrypted = Aesdecryption(response.data);
        if (JSON.parse(decrypted)) {
            return JSON.parse(decrypted);
        } else {
            throw new Error('Did not receive any response');
        }
    } catch (error) {
        console.error(`Axios error in query : ${props.query}`, error);
        throw error;
    }
};

export default Hexapi;
