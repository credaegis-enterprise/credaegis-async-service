
const authenticator = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    console.log(req.headers);
    if (apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }

}

module.exports = authenticator