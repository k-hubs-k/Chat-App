import fs from "fs";

const UploadFile = (file, name, callback) => {
  let write = fs.createWriteStream(name);
  let read = fs.createReadStream(file);
  fs.stat(file, (err, stat) => {
    if (err) throw err;
    let total = stat.size;
    let progress = 0;
    read.on("data", (chunk) => {
      progress += chunk.length;
      console.log("Uploading : ", Math.round(100 * (progress / total)), "%");
    });
  });

  read.pipe(write);
  write.on("finish", () => {
    console.log("Uploaded...");
    callback(null, { Succes: "done" });
  });
};

export default UploadFile;
