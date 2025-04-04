import axios from "axios";

const currentDate: Date = new Date();
const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
const diff = currentDate.getTime() - startOfYear.getTime(); 
const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

const apiKeys = [
  "6b375bd8bcmsh44e0b73aa91d1e5p1eb99cjsn3516d424f820",
  "fb52cf540fmsh17fb9fbc488f397p194099jsna99591039e3c", 
  "abe9856403msh9787d810cdbc155p11c8fejsna2158926bde1" 
];

const getApiKeyForToday = () => {
  return apiKeys[dayOfYear % 3];
};

export const instance = axios.create({
  baseURL: "https://youtube-v31.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": getApiKeyForToday(),
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});
