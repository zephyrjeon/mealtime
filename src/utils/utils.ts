import fs from 'node:fs';

async function uploadFile(args: { file: File }) {
  const upload = await localBlob.uploadFile({ file: args.file });

  return upload;
}

const localBlob = {
  uploadFile: async (args: { file: File }) => {
    const blobName = `${Date.now()}_${args.file.name}`;
    const url = `/uploads/${blobName}`;
    const path = `./public/uploads/${blobName}`;

    // Ensure the directory exists
    if (!fs.existsSync('./public/uploads')) {
      fs.mkdirSync('./public/uploads');
    }

    const buffer = await args.file.arrayBuffer();
    const nodeBuffer = Buffer.from(buffer);

    fs.writeFileSync(path, nodeBuffer);

    return {
      url,
      blobName,
    };
  },
};

export const utils = {
  uploadFile,
};
