import {Request, Response} from 'express'
import {db} from '../db/db'

export const deleteByIdVideoController = (req: Request, res: Response<any, any>) => {
    const videoId = req.params.id
    const videoIndex = db.videos.findIndex(video => video.id.toString() === videoId)

    // const videos = db.videos // получаем видео из базы данных

    if(videoIndex === -1){
        return res.sendStatus(404)
    } else {
        db.videos.splice(videoIndex, 1)
        return res
            .sendStatus(204)
             // отдаём видео в качестве ответа
    }
}

// не забудьте добавить эндпоинт в апп