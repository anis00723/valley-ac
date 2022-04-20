import { prisma } from 'server/prisma';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { getBaseUrl } from 'pages/_app';

const FILE_PATH = './public/images/';

export const config = {
  api: {
    bodyParser: false,
  },
};

const allowedFileTypes = ['image/jpeg', 'image/png'];

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm({
    uploadDir: FILE_PATH,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    const { file } = files;

    if (Array.isArray(file)) {
      return res.status(400).json({
        success: false,
        error: 'Multiple files not supported',
      });
    }

    // filter file types
    if (!allowedFileTypes.includes(file.mimetype ?? '')) {
      return res.status(400).json({
        success: false,
        error: 'File type not allowed',
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
    }

    if (!file.originalFilename) {
      return res.status(400).json({
        success: false,
        error: 'No file name',
      });
    }

    const dbFile = await prisma.image.create({
      data: {
        storedFileName: file.newFilename,
        originalFileName: file.originalFilename,
        path: `${FILE_PATH}${file.newFilename}`,
      },
    });

    return res.send({
      success: true,
      filePath: `${getBaseUrl()}/api/image/${dbFile.storedFileName}`,
      fileName: dbFile.storedFileName,
      location: dbFile.path,
    });
  });
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  req.method === 'POST'
    ? post(req, res)
    : req.method === 'PUT'
    ? res.status(404).send('')
    : req.method === 'DELETE'
    ? res.status(404).send('')
    : req.method === 'GET'
    ? res.status(404).send('')
    : res.status(404).send('');
};
