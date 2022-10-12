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
                let requestToken = cred["sender-token"];
                let userToken = cred["requester-token"];
                let status;
                // console.log(data[userToken]["follower-list"], "\n", requestToken);
                if(data[userToken]["follower-list"].includes(requestToken)){
                    status = "true";
                }
                else {
                    for(let i=0; i<data[userToken]["follow-request"].length; i++){
                        if(data[userToken]["follow-request"][i]["token"] == requestToken){
                            status = "pendding";
                            break;
                        }
                    }
                }

                res.status(200).json({"ok": !status ? "false": status});
            }
        });
    } else {
        res.status(500).json({ error: "Invalid request method" });
    }
}

// {
//     "sender-token": "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
//     "requester-token": "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
// }