import jwt from "jsonwebtoken"
import { config } from "../config.mjs"
import * as authRepository from "../data/auth.mjs"


const AUTH_ERROR = { message: "인증에러" }

export const isAuth = async (req, res, next) => { // next 매개변수는 다음 미들웨어 authController.me로 넘어가게 한다.
    const authHeader = req.get("Authorization")
    console.log(authHeader)

    if(!authHeader || !authHeader.startsWith( "Bearer " )) {
        console.log("헤더 에러")
        return res.status(401).json(AUTH_ERROR)
    }
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDVmNWU4MWRlNTY1ZTk3YTY5ZmRmZiIsImlhdCI6MTc4MzAzODQyOCwiZXhwIjoxNzgzMTI0ODI4fQ.EKZj0NxBkwKx-KbfH40KoyJXpZi-KC24EooyL1fZhrg

    const token = authHeader.split(" ")[1]
    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if(error) {
            console.log("토큰에러")
            return res.status(401).json(AUTH_ERROR)
        }
        // console.log(decoded)
        const user = await authRepository.findById(decoded.id)
        if(!user) {
            console.log("해당 아이디 없음")
            return res.status(401).json(AUTH_ERROR)
        }
        console.log("user.id: ", user.id)
        console.log("user.userid: ", user.userid)
        req.id = user.id
        console.log(req.id)
        next()
    })

}