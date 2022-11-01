import { Express, Request, Response } from "express";
import { createUserHandler } from './controller/user.controller'
import validateRequest from './middleware/validateRequest'
import {createUserSchema} from './schema/user.schema'

export default function(app:Express) {
 
    app.get('/healthcheck', (req: Request, res:Response) => res.sendStatus(200))

// Register user

app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
// POST /api/user

// Login
// POST /api/sessions

// GET the user's sessions
// GET /api/sessions

// Logout
// DELETE /api/sessions

// GET /api/posts /api/posts/postId

}