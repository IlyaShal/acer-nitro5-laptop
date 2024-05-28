import {Request, Response} from 'express'
import {createVideoController} from "./createVideoController";
import {db} from '../db/db'


export const putByIdVideoController = (req: Request, res: Response<any, any>,) => {
    const videos = db.videos // получаем видео из базы данных
    const videoId = req.params.id
    const video = db.videos.find(video => video.id.toString() === videoId)


    if(!video ){
        return res.sendStatus(404)
    }
    else {
        return res
            .status(204)
            .send(video) // отдаём видео в качестве ответа
    }

}

// не забудьте добавить эндпоинт в апп