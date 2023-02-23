import { createPostState } from '@/features/store'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// export const useChange = (initialValue: any) => {
//     const [value,setValue] = useState(initialValue)
//     const datas = {
//         value,
//         onChange: (e:any) => {
//             setValue(e.target.value)
//         }
//     }
// }

const Post = () => {

    const [editPost,setEditPost] = useState({
        id:'',
        title:'',
        imgLink:'',
        description:''
    })

    const [posts,setPosts] = useState([])
    const state = useSelector((state:any) => state.poster.value)
    const dispatch = useDispatch()

    const fetchPosts = async () => {
        const response = await fetch('/api/posts')
        const data = await response.json()
        console.log(data)
        setPosts(data)
    }

    useEffect(() => {
        fetchPosts()
    },[])

    const [creates, setCreates] = useState<any>([]);
    const [edits, setEdits] = useState<any>([]);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        let value: string | HTMLOptionsCollection;
        if (event.target.tagName === 'SELECT') {
            const selectElement = event.target as HTMLSelectElement;
            value = selectElement.options[selectElement.selectedIndex].value;
        } else {
            value = event.target.value;
        }
        setCreates((values: any) => ({...values, [name]: value}));
    };

    const handleEdit = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        let value: string | HTMLOptionsCollection;
        if (event.target.tagName === 'SELECT') {
            const selectElement = event.target as HTMLSelectElement;
            value = selectElement.options[selectElement.selectedIndex].value;
        } else {
            value = event.target.value;
        }
        setEditPost((values: any) => ({...values, [name]: value}));
    };

    const handleCreated = async (e:any) => {
        
        dispatch(createPostState({...creates,id: Date.now().toString()}))
        const response = await fetch('/api/posts',{
            method: 'POST',
            body:JSON.stringify({...creates,id: Date.now().toString()}),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json()
        console.log(data,creates)
    }

    const deletePosts = async (postId:any) => {
        console.log(postId)

        const response = await fetch(`/api/posts/${postId}`,{
            method: 'DELETE',
        })
        const data = await response.json()
        console.log(data)

        fetchPosts()
    }

    const editPosts = async (item:any) => {
        setEditPost(item)
    }

    const savePosts = async () => {
        console.log(editPost.id)

        const response = await fetch(`/api/posts/${editPost.id}`,{
            method: 'PUT',
            body:JSON.stringify({...editPost}),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json()
        console.log(data)

        fetchPosts()
    }

    return (
        <>
            <div className='main-component'>

                <div className="loading-button">
                    <button onClick={fetchPosts}>
                        Load Posts
                    </button>
                </div>
                
                <div className="process-items">

                    <div className="creating-items">
                        <input type="text"  
                            onChange={handleChange} 
                            placeholder='Title'
                            name='title'    
                        />
                        <input type="text"  
                            onChange={handleChange} 
                            placeholder='Link Image'
                            name='imgLink'    
                        />
                        <input type="text"  
                            onChange={handleChange} 
                            placeholder='Description'
                            name='description'    
                        />
                        <button onClick={handleCreated}>
                            Post
                        </button>
                    </div>
                    <div className="editing-items">
                        <input type="text" name='title' value={editPost.title} onChange={handleEdit} placeholder='Title'/>
                        <input type="text" name='imgLink' value={editPost.imgLink} onChange={handleEdit} placeholder='Link Image'/>
                        <input type="text" name='description' value={editPost.description} onChange={handleEdit} placeholder='Description'/>
                        <button onClick={e => savePosts()}>
                            Save Edit
                        </button>
                    </div>

                </div>


                <div className="list-items">
                    {posts.map((item: any,index: number) => {
                        return (
                            <div className='static-post' key={item.id}>
                                <Link href={`/post/${item.id}`}>
                                    <div className="item-posted" key={item.id}>
                                        <h5> {item.title} </h5>
                                        {/* <Image 
                                            src={item.imgLink}
                                            alt={item.id}
                                            width={100}
                                            height={100}
                                        /> */}
                                        <img src={item.imgLink} alt="" />

                                        {/* <Image src={post.imgLink} alt={post.id} width={100} height={100}/> */}

                                        <h5> {item.description} </h5>
                                    </div>
                                </Link>
                                <div className="buttons">
                                    <button onClick={e => deletePosts(item.id)}>
                                        Delete
                                    </button>
                                    <button onClick={e => editPosts(item)}>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Post


