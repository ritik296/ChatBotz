import * as fs from "fs";

export default async function handler(req, res) {
    if (req.method === "POST") {
        let yourContact = req.body.yourContact;
        let otherContact = req.body.otherContact;
        let userToken;
        let senderToken;
        let yourName;
        let otherName = req.body.name;
        fs.readFile(`DataBase/User.json`, "utf-8", (err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Unable to hand shake with database",
                });
            } else {
                data = JSON.parse(data);

                // console.log(data[yourContact]);
                yourName = data[yourContact]["name"];
                userToken = data[yourContact]["token"];

                if (!(otherContact in data)) {
                    // console.log("not in data");

                    senderToken = tokenGenerator();

                    let obj = {
                        [otherContact]: {
                            name: null,
                            contact: otherContact,
                            dob: null,
                            password: null,
                            token: senderToken,
                        },
                    };

                    // console.log(obj);

                    let z = Object.assign(data, obj);

                    let newd = JSON.stringify(z);

                    fs.writeFile("DataBase/User.json", newd, (err) => {
                        // Error checking
                        if (err) throw err;
                        console.log("New contact add from user prospective");
                    });
                } else {
                    senderToken = data[otherContact]["token"];
                }

                fs.readFile(
                    "DataBase/ContactList.json",
                    "utf-8",
                    (err, contacts) => {
                        if (err) {
                            res.status(400).json({
                                error: "Unable to hand shake with database",
                            });
                        } else {
                            contacts = JSON.parse(contacts);
                            // console.log(contacts[userToken])

                            contacts[userToken].push({
                                name: !otherName ? otherContact : otherName,
                                message: "last message is here",
                                time: "16:00",
                                count: 0,
                                token: senderToken,
                            });

                            if (!contacts[senderToken]) {
                                let obj = {
                                    [senderToken]: [],
                                };
                                contacts = Object.assign(contacts, obj);
                            }
                            contacts[senderToken].push({
                                name: yourName,
                                message: "last message is here",
                                time: "16:00",
                                count: 0,
                                token: userToken,
                            });

                            let newContactDetails = JSON.stringify(contacts);
                            fs.writeFile(
                                "DataBase/ContactList.json",
                                newContactDetails,
                                (err) => {
                                    if (err) throw err;
                                    console.log("Contact Added in contact-list");
                                    fs.readFile(
                                        `DataBase/Chat.json`,
                                        "utf-8",
                                        (err, data1) => {
                                            if (err)
                                                res.status(400).json({
                                                    error: "Unable to hand shake with database",
                                                });
                                            else {
                                                data1 = JSON.parse(data1);
                                                let senderObj = {
                                                    [senderToken]: {
                                                        total: 0,
                                                        messages: [],
                                                    },
                                                };

                                                let reciverObjNotExist = {
                                                    [senderToken]: {
                                                        [userToken]: {
                                                            total: 0,
                                                            messages: [],
                                                        },
                                                    },
                                                };

                                                let reciverObjExist = {
                                                    [userToken]: {
                                                        total: 0,
                                                        messages: [],
                                                    },
                                                };

                                                data1[userToken] =
                                                    Object.assign(
                                                        data1[userToken],
                                                        senderObj
                                                    );
                                                if (senderToken in data1) {
                                                    data1[senderToken] =
                                                        Object.assign(
                                                            data1[senderToken],
                                                            reciverObjExist
                                                        );
                                                } else {
                                                    data1 = Object.assign(
                                                        data1,
                                                        reciverObjNotExist
                                                    );
                                                }

                                                let newDetails =
                                                    JSON.stringify(data1);

                                                    // console.log("second");
                                                    // console.log(data1[userToken]);
                                                    // console.log(data1[senderToken]);
                                                    fs.writeFile("DataBase/Chat.json", newDetails, (err) => {
                                                        if (err) throw err;
                                                        console.log("Added In chat");
                                                    })
                                                }
                                                // res.status(200).json({"your view": data1[userToken], "other view": data1[senderToken]});
                                        }
                                    );
                                }
                            );
                            res.status(200).json({
                                ok: "contact sucessfully added",
                            });
                        }
                    }
                );
            }
        });
    } else {
        res.status(500).json({ error: "Invalid request method" });
    }
}

const tokenGenerator = () => {
    let token =
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2);
    return token;
};
