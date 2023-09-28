const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const url = "http://" + process.argv[2];
const localPath = process.argv[3];

const fetchPage = (url, localPath) => {

  request(url, (error, response, body) => {

    if (response.statusCode !== 200) {
      console.log("Sorry! The URL is invalid. Error:", response.statusCode);
      process.exit();
    }
 
    if (fs.existsSync(localPath)) {
      
      rl.question("Overwrite? y/n ", answer => {
        if (answer !== 'y') {
          console.log("Sounds good, cancelling... ");
          process.exit();
        }
        
        fs.writeFile(localPath, body, err => {
          if (err) {
            console.log("Oh no - filename/path is invalid!");
            process.exit();
          }
          console.log("Success! File written to: ", localPath);
          process.exit();
        });
      }
      );
    }
  });
};

fetchPage(url, localPath);