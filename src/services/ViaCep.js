import axios from 'axios';

const ViaCep= axios.create({
    baseURL:'https://viacep.com.br/ws/',
  })
 export default ViaCep;