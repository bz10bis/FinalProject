/**
 * Created by Julien on 17/07/2018.
 */
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const express = require('express');
const app = express();
const listeningport = 3001;


const htmlcode = "<form action='/upload' enctype='multipart/form-data' method='post'><input type='text' name='title'><input type='file' name='file'><input type='submit' value='Upload'></form>";

app.get('/', function(req, res) {
    res.send(htmlcode);
});

app.use(cors());

app.post('/upload', function(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let old_path = files.file.path;
        let new_path = path.join(__dirname, '/uploads/', files.file.name);
        fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if(err) {
                        console.log(err);
                        res.status(500);
                        res.json({'success': false});
                    } else {
                        console.log("file upload at: " + new_path);
                        res.status(200);
                        res.json({'success': true})
                    }
                })
            });
        });
    })
});

app.listen(listeningport, function() {
    console.log("app listening on port " + listeningport);
});