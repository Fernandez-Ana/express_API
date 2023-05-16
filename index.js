import express from "express";
import fs from 'node:fs/promises'

const app = express();
const port = 3006;

app.get('/', (req, res) => {
    res.send('Welcome')
})

// LEV 1
app.get('/status', (req, res) => {
    res.status(200).send('OK')
})

// LEV 2
// const response = await fetch('https://jsonplaceholder.typicode.com/posts');
// const json = await response.json()
// app.get('/posts', (req, res) => {
//     res.send(json)
// })

// LEV 3
//wird nicht benötigt, dadurch habe ich nur die Ids raus bekommen
// const id = json.map((element) => {
//     return element.id
// })
// console.log(id);

// app.get(`/posts/:id`, (req, res) => {
//     fetch(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`)
//         .then(response => response.json())
//         .then(request => res.send(request));
// })

// LEV 4 


app.get(`/posts`, async (req, res) => {

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)

        const json = await response.json()

        await fs.writeFile('./post.json', JSON.stringify(json, null, 2))

        const postFile = await fs.readFile('./post.json', 'utf8');
        const formattedData = JSON.parse(postFile);

        res.send(formattedData)

    } catch (error) {
        console.log('Uuuuppppsss');
    }
})

app.get(`/posts/:id`, async (req, res) => {

    try {
        const postArr = await fs.readFile('./post.json', 'utf8')
        const postParse = JSON.parse(postArr);
        const singlePost = postParse.find((element) => {
            return element.id === Number(req.params.id)
        })

        res.send(singlePost)
    }
    catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})