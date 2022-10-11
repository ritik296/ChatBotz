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
                let senderToken = cred["sender-token"];
                let reciverToken = cred["reciver-token"];

                fs.readFile("DataBase/Profile.json", "utf-8", (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        data = JSON.parse(data);
                        let detail = {"name": data[senderToken]["name"], "img": data[senderToken]["image-url"]};
                        console.log(detail.name, " ", detail["sender-image"])
                        if (!detail) {
                            res.status({ 404: "some error occured" });
                        } else {
                            data[reciverToken]["comments"]["comment-list"].splice(0, 0,{"sender-name": detail.name,
                                                                                        "time": !cred.time
                                                                                            ? new Date()
                                                                                            : cred.time,
                                                                                        "sender-image": !detail.img
                                                                                            ? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                                                                                            : detail.img,
                                                                                        "text": cred.text,
                                                                                        "protection": !cred.protection
                                                                                            ? "public"
                                                                                            : cred.protection,
                                                                                        "file": !cred.file
                                                                                            ? ""
                                                                                            : cred.file,
                                                                                        "attached-email": !cred.email
                                                                                            ? ""
                                                                                            : cred.email,
                                                                                        "sender-token": senderToken,});
        
                            data[reciverToken]["comments"]["total"]++ ;
        
                            let parseData = JSON.stringify(data);
        
                            fs.writeFile("DataBase/Profile.json", parseData, (err) => {
                                if (err) throw err;
                                console.log("Profile created");
                                res.status(200).json({ ok: "Comment posted" });
                            });
                        }
                    }
                }); 
            }
        });
    } else {
        res.status(500).json({ error: "Invalid request method" });
    }
}