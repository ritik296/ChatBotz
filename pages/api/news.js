export default async function handler(req, res) {

    let data = await fetch(`https://newsapi.org/v2/everything?q=${req.query.q}&apiKey=5e8fc64fe18445be9d6fdd76593fed2f`).then((responce)=>{
        return responce.json()
    }).then((data)=>{
        console.log(data.status)
        res.status(200).json(data)
    }).catch((error)=>{
        console.error(error);
        res.status(500).json(error)
    })
    // console.log(data)
}

let get = (query)=>{
    
}