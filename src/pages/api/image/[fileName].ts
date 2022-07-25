import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/prisma';
import fs from 'fs';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fileName } = req.query;

  if (!fileName) {
    return res.status(400).json({
      success: false,
      error: 'No file name',
    });
  }

  const dbFile = await prisma.image.findUnique({
    where: {
      storedFileName: fileName as string,
    },
  });

  if (!dbFile) {
    return res.status(400).json({
      success: false,
      error: `No file with name '${fileName}'`,
    });
  }

  const file = fs.readFileSync(dbFile.path);
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': file.length,
  });
  return res.end(file);
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  req.method === 'POST'
    ? res.status(404).send('')
    : req.method === 'PUT'
      ? res.status(404).send('')
      : req.method === 'DELETE'
        ? res.status(404).send('')
        : req.method === 'GET'
          ? get(req, res)
          : res.status(404).send('');
};
