import { posts } from '@/data/posts'
import { createPostState } from '@/features/store'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
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

const Post = ({post}:any) => {

    const router = useRouter()

    const dispatch = useDispatch()


    const [creates, setCreates] = useState<any>([]);
    
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

    const handleCreated = async(e:any) => {
        dispatch(createPostState({...creates,id: Date.now().toString()}))
        const response = await fetch('/api/posts',{
            method: 'POST',
            body:JSON.stringify({...creates,id: Date.now().toString()}),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json()
        console.log(data,creates)
    }


    if (router.isFallback) {
        return <div> Loading... </div>
    }

    return (
        <>
            <div className='main-component'>
                
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
                        <input type="text"  placeholder='Title'/>
                        <input type="text"  placeholder='Link Image'/>
                        <input type="text"  placeholder='Description'/>
                        <button>
                            Post
                        </button>
                    </div>

                </div>


                <div className="list-items">
                    <div className="item-posted" key={post.id}>
                        <h5> {post.title} </h5>
                        <img src={post.imgLink} alt="" />
                        {/* <Image src={post.imgLink} alt={post.id} width={100} height={100}/> */}
                        <h5> {post.description} </h5>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Post

export async function getStaticPaths() {
    return {
        paths: [
            {params:{postId:'13123123'}}
        ],
        fallback:true
    }
}   

export async function getStaticProps(props: { params: any }) {
    const {params} = props
    const  {postId} = params
    
    const post = posts.find((post) => {
        console.log(post.id,postId)
        return post.id == postId
    })
    console.log(`Regenerating Comment`)

    // Don't used when it is a static props instead use a serverprops
    // Don't call the api route within your own routes but only used in external routes
    // You can only call route that is not part of your own route like let say
    // route of the website is localhost:3000 then you must call fetch other route in like localhost:4000
    
    // const response = await fetch(
    //     `http://localhost:3000/api/posts/${params.postId}`
    // )
    // const data = await response.json()

    // console.log(data)

    // // For fall back true
    // if (!data.id) {
    //     return {
    //         notFound: true,
    //     }
    // }

    return {
        props: {
            post
        },
        revalidate:10
    }
} 