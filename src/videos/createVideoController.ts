import {Response, Request} from 'express'
import {OutputErrorsType, VideoDBType} from '../input-output-types/video-types'
import {db} from '../db/db'
import {InputVideoType, Resolutions} from '../input-output-types/video-types'
import { addDays } from "date-fns"


const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = { // объект для сбора ошибок
        errorsMessages: []
    }
// ...
    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolution'
        })
    }
    return errors
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<any /*OutputVideoType*/ | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    console.log('RENDER');
    if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors)
        return
    }
// Получаем текущую дату
 // let currentDate = new Date();

// Добавляем один день
 //   currentDate.setDate(currentDate.getDate() + 1);

// Преобразуем новую дату в строку в формате ISO
 //  let publicationDate = currentDate.toISOString();
    // если всё ок - добавляем видео
    const newVideo: VideoDBType /*VideoDBType*/ = {
        author: req.body.author,
        title: req.body.title,
        availableResolutions: req.body.availableResolutions,
        createdAt: new Date().toISOString(),
        id: Date.now() + Math.random(),
        canBeDownloaded: false,
        minAgeRestriction: null,
        //publicationDate: new Date().toISOString(),
        publicationDate: addDays(new Date(), 1).toISOString()

        // ...
    }// as unknown as OutputVideoType
    db.videos = [...db.videos, newVideo]

    console.log(201)
    console.log(newVideo)

    res
        .status(201)
        .send(newVideo)
}