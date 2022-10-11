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
                let requestToken = cred["request-token"];
                let userToken = cred["user-token"];
                let accept = !cred["accept"] ? false : true;

                fs.readFile("DataBase/Profile.json", "utf-8", (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        data = JSON.parse(data);

                        for(let i=0; i<data[userToken]["follow-request"].length ; i++){
                            if(data[userToken]["follow-request"][i]["token"] == requestToken){
                                data[userToken]["follow-request"].splice(i, 1);
                            }
                        }

                        if(accept) {
                            data[userToken]["follower-list"].splice(0, 0, requestToken);
                            data[userToken]["follower-count"]++ ;
                        }
        
                        let parseData = JSON.stringify(data);
    
                        fs.writeFile("DataBase/Profile.json", parseData, (err) => {
                            if (err) throw err;
                            console.log("Profile created");
                            res.status(200).json({ok: "Request accepted"});
                        });     
                    }
                });
            }
        });
    } else {
        res.status(500).json({ error: "Invalid request method" });
    }
}

// {
//     "request-token": "itmvmh43cy99w2vhnqfazjwi4cfdskbxjdfiikdae3z",
//     "user-token": "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
//     "accept": true
// }