import express from "express"
import * as authController from "../controller/auth.mjs"
import { isAuth } from "../middleware/auth.mjs"
import { config } from "../config.mjs"

const router = express.Router()

const FRONTEND_URL = config.FE_URL.FRONTEND_URL

router.get("/login", (req, res) => {
    res.redirect(`${FRONTEND_URL}/login`)
})

router.get("/signup", (req, res) => {
    res.redirect(`${FRONTEND_URL}/signup`)
})

// 회원가입
// http://127.0.0.1:8080/auth/signup (POST)
router.post("/signup", authController.signup)

// 로그인
// http://127.0.0.1:8080/auth/login (POST)
router.post("/login", authController.login)

// 로그인 유지 체크
// http://127.0.0.1:8080/auth/me (get)
router.get("/me", isAuth, authController.me)

export default router


