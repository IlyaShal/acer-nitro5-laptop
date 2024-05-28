import {Router} from 'express'
import {getVideosController} from './getVideosController'
import {createVideoController} from './createVideoController'
import {findByIdVideoController} from './findVideoController'
import {deleteVideoController} from './deleteVideoController'

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findByIdVideoController)
videosRouter.delete('/:id', deleteVideoController)
// ...

// не забудьте добавить роут в апп