import {Response, Request} from 'express'
import {OutputErrorsType, VideoDBType} from '../input-output-types/video-types'
import {db} from '../db/db'
import {InputVideoType, Resolutions} from '../input-output-types/video-types'
import { addDays } from "date-fns"
import {kMaxLength} from "node:buffer";
import {boolean} from "zod";
const videoTitleValidation = (errors: OutputErrorsType, title: any) => {
    if(!title || !title?.trim() || !(typeof title === "string") || title.length > 40 || title.length < 0) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'title'
        })
    }
}

const videoAuthorValidation = (errors: OutputErrorsType, author: any) => {
        if(!author || !author?.trim() || !(typeof author === "string") || author.length > 20 || author.length < 0) {
            errors.errorsMessages.push({
                message: 'error!!!!', field: 'author'
            })
        }
}

const availableResolutionsTitleValidation = (errors: OutputErrorsType, availableResolutions: any) => {
    if (!Array.isArray(availableResolutions)
        || !availableResolutions.every(resolution => typeof resolution === "string")
        || availableResolutions.find(p => !Resolutions[p as Resolutions])
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolution'
        })
    }
}

const inputValidation = (video: Partial<InputVideoType>) => {
    const errors: OutputErrorsType = { // объект для сбора ошибок
        errorsMessages: []
    }
// ...

    videoAuthorValidation(errors, video.author)
    videoTitleValidation(errors, video.title)
    availableResolutionsTitleValidation(errors, video.availableResolutions)
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