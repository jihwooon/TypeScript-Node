import { Express, Request, Response } from "express";
import { createUserHandler } from './controller/user.controller'
import { validateRequest, requiresUser } from './middleware'
import { createUserSchema, createUserSessionSchema } from './schema/user.schema'
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from './controller/session.controller'
import { createPostSchema, updatePostSchema, deletePostSchema } from './schema/post.schema'
import { createPostHandler, deletePostHandler, getPostHandler, updatePostHandler } from './controller/post.controller'

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

    // GET /api/sessions
    app.get("/api/sessions", requiresUser, getUserSessionsHandler)

    // Logout
    // DELETE /api/sessions
    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

    // Create a post
    app.post(
        "/api/posts",
        [requiresUser, validateRequest(createPostSchema)],
        createPostHandler
    );

    // Update a post
    app.put(
        "/api/posts/:postId",
        [requiresUser, validateRequest(updatePostSchema)],
        updatePostHandler
    );

    // Get a post
    app.get("/api/posts/:postId", getPostHandler);

    // Delete a post
    app.delete(
        "/api/posts/:postId",
        [requiresUser, validateRequest(deletePostSchema)],
        deletePostHandler
    );
}
