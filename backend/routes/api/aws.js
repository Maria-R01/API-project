const AWS = require('aws-sdk');
const uuid = require('uuid');
const BUCKET_NAME = process.env.S3_BUCKET;
const S3_LOCATION = `https://${BUCKET_NAME}.s3.amazonaws.com/`;
const ALLOWED_EXTENSIONS = new Set(["pdf", "png", "jpg", "jpeg", "gif", "mp3"]);
const s3 = new AWS.S3({
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET
});
function getUniqueFilename(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const uniqueFilename = uuid.v4().replace(/-/g, '');
    return `${uniqueFilename}.${ext}`;
}
function uploadFileToS3(file, acl = 'public-read') {
    return new Promise((resolve, reject) => {
        const ext = file.name.split('.').pop();
        const uniqueFilename = getUniqueFilename(file.name);
        const params = {
            Bucket: BUCKET_NAME,
            Key: uniqueFilename,
            Body: file.data,
            ACL: acl,
            ContentType: file.mimetype
        };
        s3.upload(params, (err, data) => {
            if (err) {
                reject({ errors: err.message });
            } else {
                resolve({ url: `${S3_LOCATION}${uniqueFilename}` });
            }
        });
    });
}
function removeFileFromS3(imageUrl) {
    const key = imageUrl.split('/').pop();
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: BUCKET_NAME,
            Key: key
        };
        s3.deleteObject(params, (err, data) => {
            if (err) {
                reject({ errors: err.message });
            } else {
                resolve(true);
            }
        });
    });
}