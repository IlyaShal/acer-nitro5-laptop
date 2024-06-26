import {Request, Response} from 'express'
import {db} from '../db/db'

export const getVideosController = (req: Request, res: Response<any, any>,) => {
    const videos = db.videos // получаем видео из базы данных

    res
        .status(200)
        .send(videos) // отдаём видео в качестве ответа
}

export const getByIdVideosController = (req: Request, res: Response<any, any>,) => {
    const videos = db.videos // получаем видео из базы данных
    const videoId = req.params.id
    const video = db.videos.find(video => video.id.toString() === videoId)
    if(!video ){
        return res.sendStatus(404)
    }
    else {
        return res
            .status(200)
            .send(video) // отдаём видео в качестве ответа
    }
}

// не забудьте добавить эндпоинт в апп