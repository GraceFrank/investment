import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({});

const limits = { fileSize: 1024 * 1024 * 5 };

const fileFilter = (req, file, cb) => {
  console.log(file);
  const suportedFileTypes = [ '.jpg', '.jpeg', '.png', '.doc', '.docx', '.pdf' ];
  const ext = path.extname(file.originalname);
  if (suportedFileTypes.includes(ext)) cb(null, true);
  else cb(new Error('File type is not supported'), false);
};

const imageFilter = (req, file, cb) => {
  const suportedFileTypes = [ '.jpg', '.jpeg', '.png' ];
  const ext = path.extname(file.originalname);
  if (suportedFileTypes.includes(ext)) cb(null, true);
  else cb(new Error('File type is not supported'), false);
};

export const uploadImage = multer({ storage, limits, fileFilter: imageFilter });
export const uploadFile = multer({ storage, limits, fileFilter });
