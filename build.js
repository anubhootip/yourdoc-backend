// require modules
const fs = require('fs');
const archiver = require('archiver');
const { exec } = require("child_process");

function executeCmd(cmd, cb) {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr:\n ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    cb?.();
  })
}

function archiveFrontend() {
  const frontEndZipOutputPathNFileName = __dirname + '/frontend_build.zip';
  const frontEndBuildFolderPath = __dirname + '/yourdoc_frontend/build/';

  if (!fs.existsSync(frontEndBuildFolderPath)) {
    console.error("Build folder doesn't exist!!");
    return 'failed';
  }

  // create a file to stream archive data to.
  const output = fs.createWriteStream(frontEndZipOutputPathNFileName);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function () {
    console.log('Data has been drained');
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory(frontEndBuildFolderPath, false);

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  return archive.finalize();

}

const NETLIFY_AUTH_TOKEN = process.argv.find(arg => arg.startsWith('NETLIFY_AUTH_TOKEN'))?.split('=')[1].trim();
const NETLIFY_API_URL = process.argv.find(arg => arg.startsWith('NETLIFY_API_URL'))?.split('=')[1].trim();

if (NETLIFY_API_URL && NETLIFY_AUTH_TOKEN) {
  (
    async () => {
      if ((await archiveFrontend()) === 'failed') {
        return;
      }

      const cmd = `curl --location '${NETLIFY_API_URL}' \
      --header 'Authorization: Bearer ${NETLIFY_AUTH_TOKEN}' \
      --header 'Content-Type: application/zip' \
      --data-binary '@frontend_build.zip'`;

      executeCmd(cmd);
    }
  )();
} else {
  console.error('Env variables missing!!')
}
