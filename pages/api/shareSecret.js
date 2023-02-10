import path from 'path';
import fs from 'fs';

/**
 * This function will read the secrets from our filesystem and check if a secret exists for the password supplied
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function checkPassword(secrets, password) {
    if (secrets.hasOwnProperty(password)) {
        return false;
    }
    return true;
}

function saveSecret(password, secret, secrets) {
    let filePath = path.join(process.cwd(), 'json') + '/secrets.json';
    secrets[password] = secret;
    let json = JSON.stringify(secrets);
    try {
        fs.writeFileSync(filePath, json);
        return null;
    } catch (e) {
        return {
            message: e.message
        }
    }

}

function getSecrets() {
    //TODO: instead of using the filesystem to store secrets, we should connect to either a cache or database
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json
    const fileContents = fs.readFileSync(jsonDirectory + '/secrets.json', 'utf8');
    return JSON.parse(fileContents);
}

export default function handler(req, res) {
    let password = req.body.password;
    let secret = req.body.secret;

    let secrets = getSecrets();

    //TODO: we are storing the passwords in plaintext, but we should consider adding some hashing/cryptographic encoding
    if (!checkPassword(secrets, password)) {
        return res.status(400).json({error: 'This password already exists, try another one'})
    }

    // at this stage, we have confirmed that the password can be used, so let's try to save the password
    const error = saveSecret(password, secret, secrets);

    if (error) {
        return res.status(500).json({error: error.message})
    }

    return res.status(200).json({});

}
