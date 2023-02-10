import path from 'path';
import {promises as fs} from 'fs';

/**
 * This function will read the secrets from our filesystem and check if a secret exists for the password supplied
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    let password = req.body.password;

    //TODO: instead of using the filesystem to store secrets, we should connect to either a cache or database
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/secrets.json', 'utf8');
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

}
