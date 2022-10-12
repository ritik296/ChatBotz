import * as fs from "fs";

export default async function handler(req, res) {
    if (req.method == "POST") {
        fs.readFile("DataBase/Profile.json", "utf-8", (err, data) => {
            if (err) {
                res.status(500).json({
                    error: "Unable to handshake with server",
                });
            } else {
                data = JSON.parse(data);
                let cred = req.body;
                let yourToken = cred["your-token"];
                let notification = [];
                // console.log(data[userToken]["follower-list"], "\n", requestToken);
                fs.readFile("DataBase/Profile.json", "utf-8", (err, detail) => {
                    if (err) throw err;
                    else {
                        detail = JSON.parse(detail);
                        for(let i=0; i<data[yourToken]["follow-request"].length; i++){
                            let token = data[yourToken]["follow-request"][i]["token"];
                            let time = data[yourToken]["follow-request"][i]["time"];
                            let name = detail[token]["name"];
                            let email = detail[token]["email"];
                            let imageUrl = detail[token]["image-url"];

                            notification.push({"name": name, "email": email, "img": imageUrl, "sender-token": token, "time": time});
                        }
                        res.status(200).json({"notification": notification});
                    } 
                });
            }
        });
    } else {
        res.status(500).json({ error: "Invalid request method" });
    }
}

// {
//     "your-token": "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
// }