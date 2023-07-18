import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import multer from "multer";
import { makeId } from "../utils/index.js";
import path from "path"
import { File } from "../models/index.js";
import { unlinkSync } from "fs";

const router = Router()

async function uploadImage (req, res, next) {
    console.log(req.body)

    try {
        if(!req.file?.path) {
            return res.status(400).json({ error: '유효하지 않은 파일' }) 
        }

        // 파일 지우기
        // unlinkSync(req.file.path)

        console.log(req.file)

        const file = await File.create({
            original_name: req.file.originalname,
            type: req.file.mimetype, 
            urn: req.file.filename,
            path: req.file.path.replace('public', ''),
        })

        // 파일 삭제
        // if(condtion) {
        //     const name = path.resolve(
        //         process.cwd(),
        //         'public',
        //         'images',
        //         urn,
        //     )
        //     unlinkSync(name)
        // }

        return res.status(200).json(file)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: `public/images`,
        filename: (_, file, callback) => {
            const name = makeId(10)
            callback(null, name + path.extname(file.originalname))
        }
    }),
    fileFilter: (_, file, callback) => {
        const type = file.mimetype 
        if(type === 'image/jpeg' || type === 'image/png') return callback(null, true)
        callback(new Error('이미지가 아닙니다.'))
    }
})

router.post('/', isLoggedIn, upload.single('file'), uploadImage)

export default router