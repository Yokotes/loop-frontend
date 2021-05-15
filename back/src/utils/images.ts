import * as fs from "fs";

const PUBLIC_PATH = "../front/public/img/";

const loadImg = async (path: string, data: Blob) => {
  const imgData = await data.text();

  fs.open(PUBLIC_PATH + path, "w", (err, file) =>  {
    if (err) throw err;
    fs.writeSync(file, imgData);
  });
}

const deleteImg = (path: string) => {
  if (fs.existsSync(PUBLIC_PATH + path)) {
    fs.unlinkSync(PUBLIC_PATH + path);
  }
}

export { loadImg, deleteImg }