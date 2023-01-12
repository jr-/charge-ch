import { File } from '../../domain/models/file'
import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const fileHandler = (req: Request, _: Response, next: NextFunction) => {
  const { file } = req
  if (file !== undefined) {
    const mapFile: File =
    {
      name: file.filename,
      type: file.mimetype,
      content: file.buffer,
      size: file.size,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      extension: `${file.originalname.split('.').pop()}`
    }
    Object.assign(req.body, { file: mapFile })
  }

  next()
}
