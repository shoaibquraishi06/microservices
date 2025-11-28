
const ImageKit = require('imagekit');
const { v4: uuidv4 } = require("uuid")

const  IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/pn0zrpdep"
const IMAGEKIT_PUBLIC_KEY="public_2YGMwhPRqyGQ+4NdCnPxBI9HaNs="
const IMAGEKIT_PRIVATE_KEY="private_doZFsM1SdrXXyVGsGZ4NtHZIUpg="



 

const imagekit = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY || 'test_public',
    privateKey: IMAGEKIT_PRIVATE_KEY || 'test_private',
    urlEndpoint: IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/demo',
});

async function uploadImage({ buffer, folder = '/products' }) {
    const res = await imagekit.upload({
        file: buffer,
        fileName: uuidv4(),
        folder,
    });
    return {
        url: res.url,
        thumbnail: res.thumbnailUrl || res.url,
        id: res.fileId,
    };
}

module.exports = { imagekit, uploadImage };
