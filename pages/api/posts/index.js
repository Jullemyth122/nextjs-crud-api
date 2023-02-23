// import { posts } from "@/data/posts";

// export default function handler(req: { method: string; body: { posts: any; }; },res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any[]): void; new(): any; }; }; }) {
//     if (req.method === 'GET') {
//         res.status(200).json(posts)
//     } else if (req.method === 'POST') {
//         const posts = req.body.posts
//         const newPosts = {
//             id: Date.now().toString,

//         }
//         posts.push(newPosts);
//         res.status(201).json(newPosts);
//     } else if (req.method === 'DELETE') {

//     }
// }
import { posts } from "@/data/posts";

export default function handler(req,res) {
    if (req.method === 'GET') {
        res.status(200).json(posts)
    } else if (req.method === 'POST') {
        const { title,imgLink,description,id } = req.body
        // console.log(posts)
        const newPosts = req.body
        // const newComment = {
        //     id:parseInt(Date.now()),
        //     text:posts
        // }
        // comments.push(newComment);
        // res.status(201).json(newComment);
        // const newPost = {
        //     id: Date.now().toString(),
        //     ...req.body
        // }
        // const updatedPosts = [...posts, newPost];
        posts.push(newPosts)
        // console.log(posts)
        res.status(201).json(newPosts);
    } else if (req.method === 'DELETE') {

    }
}
