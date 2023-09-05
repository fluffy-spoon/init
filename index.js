const https = require('https');
const fs = require('fs');
const path = require('path');

await new Promise(resolve => {
    const folder = fs.mkdir(path.join(".github", "workflows"), {
        recursive: true
    });

    const file = fs.createWriteStream(path.join(folder, "fluffy-spoon.yml"));

    https.get("https://raw.githubusercontent.com/fluffy-spoon/init/main/.github/workflows/fluffy-spoon.yml", function(response) {
        response.pipe(file);

        file.on("finish", () => {
            file.close();
            console.log("Project has been set up! GitHub Actions file generated.");
            resolve();
        });
    });
});