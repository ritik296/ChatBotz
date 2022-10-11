import * as fs from "fs";

export default function handler(req, res) {
    fs.readFile("DataBase/ContactList.json", "utf-8", (err, conData) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            let yourToken = req.query.yourToken;
            let otherToken = req.query.otherToken;
            console.log(yourToken)
            console.log(otherToken)
            conData = JSON.parse(conData);

            for (let i = 0; i < conData[yourToken].length; i++) {
                if (conData[yourToken][i]["token"] == otherToken) {
                    conData[yourToken][i]["count"] = 0;
                    break;
                }
            }

            let parsedConData = JSON.stringify(conData);

            fs.writeFile("DataBase/ContactList.json", parsedConData, (err) => {
                if (err) throw err;
                console.log("Cotact List Updated");
            });
            res.status(200).json({ "ok": "Message count reset successfully" });
        }
    });
}
