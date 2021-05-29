import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://calculadora-servico.vercel.app/api'
})