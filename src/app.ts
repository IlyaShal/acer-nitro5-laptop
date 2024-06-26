import express from 'express'
import cors from 'cors'
import {getVideosController} from './videos/getVideosController'
import {SETTINGS} from "./settings";
import {setDB} from "./db/db";
import {videosRouter} from "./videos";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version:'1.0'})
})
app.delete('/testing/all-data', (req, res) => {
    //
    setDB()
    res.sendStatus(204)
})
// app.post(['/', '/:id'], req, (req, res) => {
//     const params = req.params;
//     const id = req.params.id;
//     const queryParams = req.query;
// })
app.use(SETTINGS.PATH.VIDEOS, videosRouter)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)