import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileHase = crypto.randomBytes(10).toString('HEX')
      const fileName = `${fileHase}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}
