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
                let followerToken = cred["follower-token"];
                let followedToken = cred["followed-token"];

                fs.readFile("DataBase/Profile.json", "utf-8", (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        data = JSON.parse(data);

                        data[followedToken]["follow-request"].splice(0, 0, {"token": followerToken, "time": new Date()});
        
                        let parseData = JSON.stringify(data);
    
                        fs.writeFile("DataBase/Profile.json", parseData, (err) => {
                            if (err) throw err;
                            console.log("Profile created");
                            res.status(200).json({ok: "follow request sended"});
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
//     "follower-token": "itmvmh43cy99w2vhnqfazjwi4cfdskbxjdfiikdae3z",
//     "followed-token": "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
// }