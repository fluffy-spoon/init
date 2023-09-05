import https from 'https';
import fs from 'fs';
import path from'path';

await new Promise(async resolve => {
    const workflowDirectory = path.join(".github", "workflows");
    await new Promise(resolve => fs.mkdir(workflowDirectory, {
        recursive: true
    }, resolve));

    const file = fs.createWriteStream(path.join(workflowDirectory, "fluffy-spoon.yml"));
    https.get("https://raw.githubusercontent.com/fluffy-spoon/init/main/.github/workflows/fluffy-spoon.yml", function(response) {
        response.pipe(file);

        file.on("finish", () => {
            file.close();
            console.log("Project has been set up! GitHub Actions file generated.");
            resolve();
        });
    });
});