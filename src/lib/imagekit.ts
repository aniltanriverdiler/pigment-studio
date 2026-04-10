import ImageKit, { toFile } from "@imagekit/nodejs";

let _client: InstanceType<typeof ImageKit> | null = null;

// this is the singleton pattern which is used to create a single instance of the ImageKit client
// so that you don't accidentally create multiple instances of the client
function getClient() {
  if (!_client) {
    _client = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    });
  }
  return _client;
}

// this is the function that will be used to upload the image to ImageKit
// it will take the buffer of the image and the file name and the folder and the mime type
// and it will return the url of the image and the file id of the image
export async function uploadBufferImageKit(params: {
  buffer: Buffer;
  fileName: string;
  folder: string;
  mimeType: string;
}) {
  const client = getClient();
  const file = await toFile(params.buffer, params.fileName, {
    type: params.mimeType,
  });

  const result = await client.files.upload({
    file,
    fileName: params.fileName,
    folder: params.folder,
    useUniqueFileName: true,
  });

  return { url: result.url!, fileId: result.fileId! };
}
