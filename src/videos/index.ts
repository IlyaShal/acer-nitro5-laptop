import {Router} from 'express'
import {getVideosController} from './getVideosController'
import {getByIdVideosController} from './getVideosController'
import {createVideoController} from './createVideoController'
import {findByIdVideoController} from './findVideoController'
import {deleteByIdVideoController} from './deleteVideoController'
import {putByIdVideoController} from "./putVideosController";

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
// videosRouter.get('/:id', getByIdVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findByIdVideoController)
videosRouter.put('/:id', putByIdVideoController)
videosRouter.delete('/:id', deleteByIdVideoController)
// ...

// не забудьте добавить роут в апп