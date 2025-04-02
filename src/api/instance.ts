import axios from "axios";

export const instance = axios.create({
    baseURL: "https://youtube-v31.p.rapidapi.com/",
    headers: {
      "X-RapidAPI-Key": "fb52cf540fmsh17fb9fbc488f397p194099jsna99591039e3c",
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
})
//6b375bd8bcmsh44e0b73aa91d1e5p1eb99cjsn3516d424f820
//fb52cf540fmsh17fb9fbc488f397p194099jsna99591039e3c