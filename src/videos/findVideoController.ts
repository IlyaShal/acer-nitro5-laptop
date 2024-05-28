import {Request, Response} from 'express'
import {db} from '../db/db'

// export class VideoController {
//     static async getVideo(req: Request, res: Response) {
//         const videoRepository = getVideosController(videosRouter);
//         const { id } = req.params;
//
//     //1 найти видео в бд
//     //2 замапить видео
//         //3 вернуть видео
//
//     // const video = vd.find -> возвращает видео
//     try {
//         const video = videoRepository.find(id);
//         if (video) {
//             res.json(video);
//         } else {
//             res.status(404).json({ message: 'Video not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// } // отдаём видео в качестве ответа


export const findByIdVideoController = (req: Request, res: Response<any, any>,) => {

    const videoId = req.params.id
    const video = db.videos.find(video => video.id.toString() === videoId) // получаем видео из базы данных

    if(!video ){
        return res.sendStatus(404)
    } else {
         return res
            .status(200)
            .send(video) // отдаём видео в качестве ответа
    }

}

// не забудьте добавить эндпоинт в апп