import {Response, Request} from 'express'
import {OutputErrorsType, OutputVideoType} from '../input-output-types/video-types'
import {db} from '../db/db'
import {InputVideoType, Resolutions} from '../input-output-types/video-types'

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

    // если всё ок - добавляем видео
    const newVideo: OutputVideoType /*VideoDBType*/ = {
        ...req.body,
        createdAt: new Date().toISOString(),
        id: Date.now() + Math.random(),
        canBeDownload: false,
        minAgeRestriction: null,
        publicationDate: new Date().toISOString(),

        // ...
    }// as unknown as OutputVideoType
    db.videos = [...db.videos, newVideo]

    console.log(newVideo)

    res
        .status(201)
        .send(newVideo)
}