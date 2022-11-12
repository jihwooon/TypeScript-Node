import { Express, Request, Response } from "express";
import { createUserHandler } from './controller/user.controller'
import validateRequest from './middleware/validateRequest'
import {createUserSchema, createUserSessionSchema } from './schema/user.schema'
import { createUserSessionHandler } from './controller/session.controller'

export default function(app:Express) {

    /**
    * @openapi
    * /healthcheck:
    *  get:
    *     tags:
    *     - Healthcheck
    *     description: Responds if the app is up and running
    *     responses:
    *       200:
    *         description: App is up and running
    */
    app.get('/healthcheck', (req: Request, res:Response) => res.sendStatus(200))


    /**
     * @openapi
     * '/api/users':
     * post:
     *  tags:
     *  - User
     *      summary: Register a user
     *      requestBody:
     *        required: true
     *        content:
     *          application:/json:
     *              schema:
     *                 $ref: '#/components/schemas/CreateUserInput'
     *      responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *              schema:
     *                 $ref: '#/components/schemas/CreateUserResponse'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

    // POST /api/sessions
    app.post('/api/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler);
    
    // Login

    
    // POST /api/user
    

    // GET the user's sessions
// GET /api/sessions

// Logout
// DELETE /api/sessions

// GET /api/posts /api/posts/postId

}