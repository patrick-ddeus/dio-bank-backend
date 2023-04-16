import { stripHtml } from 'string-strip-html';

export default function sanitizeObjects (obj) {
    for (const [key, value] of Object.entries(obj)) {
        obj[key] = stripHtml(value).result;
    }

    return obj;
}
