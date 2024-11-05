import { v2 as cloudinary } from 'cloudinary';
import { ProductImageDto } from '../dtos/product-dto';

cloudinary.config({
    cloud_name:'ddpxi6wyh', 
    api_key: '589469279618447',
    api_secret: 'g6yTUeO77Vc2sYOHv0NxomRKU4g'
});

const uploader = async (file: Express.Multer.File) => {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
    
    const uploadFile = await cloudinary.uploader.upload(dataURI, {
        folder: "dumb_merch"
    });
    
    return {
        url: uploadFile.secure_url
    };
}

export default uploader;
