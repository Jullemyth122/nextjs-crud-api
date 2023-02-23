import { posts } from "@/data/posts";

export default function handler(req,res) {
    const { postId } = req.query;

    if (req.method === 'GET') {
        const post = posts.find(
            (post) => post.id === postId)
        res.status(200).json(post);
    } 
    else if (req.method === 'DELETE') {
        const deleteComment = posts.find(
            (post) => post.id === (postId))

        const index = posts.findIndex(post => post.id === (postId));
        posts.splice(index,1);
        
        res.status(200).json(deleteComment)
    }
    else if (req.method === 'PUT') {
        const { title, imgLink, description } = req.body;
        const post = posts.find(post => post.id === postId);
        
        if (post) {
            post.title = title || post.title;
            post.imgLink = imgLink || post.imgLink;
            post.description = description || post.description;

            res.status(200).json(post);
        } else {
            res.status(404).json({ message: `Post with id ${postId} not found` });
        }
    }

}