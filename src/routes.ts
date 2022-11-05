import { Express, Request, Response } from "express";
import { createUserHandler } from './controller/user.controller'
<<<<<<< HEAD
import validateRequest from './middleware/validateRequest'
import {createUserSchema, createUserSessionSchema } from './schema/user.schema'
import { createUserSessionHandler } from './controller/session.controller'
=======
import { validateRequest, requiresUser } from './middleware'
import { createUserSchema, createUserSessionSchema } from './schema/user.schema'
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from './controller/session.controller'
import { createPostSchema, updatePostSchema, deletePostSchema } from './schema/post.schema'
import { createPostHandler, deletePostHandler, getPostHandler, updatePostHandler } from './controller/post.controller'
>>>>>>> 87eaa14 (route를 수정하라)

export default function(app:Express) {
 
    app.get('/healthcheck', (req: Request, res:Response) => res.sendStatus(200))

<<<<<<< HEAD
    // Register user
    app.post('/api/users', validateRequest(createUserSchema), createUserHandler);
=======
    app.post(
        '/api/users',
        validateRequest(createUserSchema),
        createUserHandler
    );
>>>>>>> 87eaa14 (route를 수정하라)

    // POST /api/sessions
    app.post('/api/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler);
    
    // Login

    
    // POST /api/user
    

    // GET the user's sessions
// GET /api/sessions

// Logout
// DELETE /api/sessions

// GET /api/posts /api/posts/postId

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
