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

                if (data[followedToken]["follower-list"].includes(followerToken)){
                    res.status(200).json({"ok": "your already a follower"});
                }
                else {
                    if (data[followedToken]["profile-type"] == "private") {

                        data[followedToken]["follow-request"].splice(0, 0, {
                            token: followerToken,
                            time: new Date(),
                        });

                        let parseData = JSON.stringify(data);

                        fs.writeFile("DataBase/Profile.json", parseData, (err) => {
                            if (err) throw err;
                            console.log("Profile created");
                            res.status(200).json({ "ok": "request sended" });
                        });
                    }
                    else {
                        data[followedToken]["follower-list"].push(followerToken);
                        data[followedToken]["follower-count"] ++;

                        let parseData = JSON.stringify(data);

                        fs.writeFile("DataBase/Profile.json", parseData, (err) => {
                            if (err) throw err;
                            console.log("Profile created");
                            res.status(200).json({ "ok": "followed" });
                        });
                    }
                }
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
