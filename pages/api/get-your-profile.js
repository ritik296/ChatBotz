import * as fs from "fs"

export default async function handler(req, res) {
    if(req.method == 'POST'){
        fs.readFile("DataBase/Profile.json", "utf-8", (err, data) => {
            if (err) {
                res.status(500).json({"error": "Unable to handshake with server"});
            }
            else {
                data = JSON.parse(data);
                let cred = req.body
                let yourToken = cred["your-token"];

                if(!data[yourToken]){
                    res.status(300).json({"error": "You didn't created profile yet"});
                }
                else {
                    data = data[yourToken];
                    res.status(200).json(data);
                }
            }
        })
    }
    else {
        res.status(500).json({"error": "Invalid request method"});
    }
}


// {
//     "sender-token": "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
//     "reciver-token": "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
//     "time": "time",
//     "text": "jui"
// }