export function getFullURL(req: any) {
    return `${req.protocol}://${req.get('host')}${req.originalUrl}`
};

export function getBaseURL(req: any) {
    return `${req.protocol}://${req.get('host')}`
};