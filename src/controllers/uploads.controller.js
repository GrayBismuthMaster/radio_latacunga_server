const fs = require('fs');
require('dotenv').config({path: 'variables.env'})
export const uploadProfile = async (req, res) => {
    if(process.env.NODE_ENV !== 'production'){
        console.log('Esta en desarrollo');
        
        fs.renameSync(req.file.path, `${req.file.destination}/${req.file.filename}.${req.file.mimetype.split('/')[1]}`);
        const url = `${process.env.DEV_HOST}:${process.env.DEV_PORT}/public/img/profile/${req.file.filename}.${req.file.mimetype.split('/')[1]}`;
        console.log(url);
        console.log(req.file)
        res.status(200).json({url});
    }else{
        fs.renameSync(req.file.path, `${req.file.destination}/${req.file.filename}.${req.file.mimetype.split('/')[1]}`);
        const url = `${process.env.PROD_HOST}:${process.env.PROD_PORT}/public/img/profile/${req.file.filename}.${req.file.mimetype.split('/')[1]}`;
        console.log(url);
        console.log(req.file)
        res.status(200).json({url});
    }
}