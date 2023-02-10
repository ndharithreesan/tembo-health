import path from 'path';
import {promises as fs} from 'fs';
import os from 'os';

/**
 * This function will read the secrets from our filesystem and check if a secret exists for the password supplied
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    let password = req.body.password;

    try {
        //TODO: instead of using the filesystem to store secrets, we should connect to either a cache or database
        let path = os.tmpdir() + '/tembo_secrets.json';
        const fileContents = await fs.readFile(path, 'utf8');
        let secrets = JSON.parse(fileContents);

        if (Object.keys(secrets).length === 0) {
            return res.status(500).json({error: 'No secrets added yet'})
        } else if (!secrets.hasOwnProperty(password)) {
            return res.status(400).json({error: 'No secret for that password'})
        }

        const response = {
            error: null,
            secret: secrets[password]
        }

        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({error: e.message})
    }


}
