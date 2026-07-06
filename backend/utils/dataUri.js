import DataUriParser from 'datauri/parser.js'
import path from "path"

const parser = new DataUriParser()

const getDataUri = (file)=>{
    const extName = path.extname(file.originalname).toString();  // when we upload any file its ext name(.png) --> gets converted to string format 
    return parser.format(extName,file.buffer).content;  // convert our image into base64 format  so that image can upload to the cloudinary
};

export default getDataUri;
