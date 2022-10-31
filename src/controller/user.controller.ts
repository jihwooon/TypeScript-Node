import {Request, Response} from 'express'
import { omit } from 'lodash'
import {createUser} from '../service/user.service'
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"))
    }catch(e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }
}

export async function createUserSessionHandler(req: Request, res: Response) {
    // validate the email and password

    // Create a session

    // Create access token

    // create refresh token

    // send refresh & access token back

}