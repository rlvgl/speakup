import React, {useState, useEffect} from 'react'
import { Button, Typography } from '@mui/material'
import { getAllPosts, getPostByTag, createPost } from '../firebaseFunctions'
import { auth } from '../firebase'

const HomeScreen = () => {
    const [allPosts, setAllPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [createPostBool, setCreatePostBool] = useState(false)
    const [message, setMessage] = useState('')
    const [tags, setTags] = useState([])

    useEffect(async () => {
        setAllPosts(await getAllPosts())
    }, [])

    const searchByTag = async () => {
        setSearchTerm(cur => cur.trim())
        setAllPosts(await getPostByTag(searchTerm)) 
    }

    const sendPost = async () => {
        if (!auth.currentUser) {
            alert('Please Sign Up Before Posting')
        }
        // console.log(auth.currentUser)
        const name = auth.currentUser.displayName
        const email = auth.currentUser.email
        console.log(`Email: ${email}, name: ${name}, message: ${message}`)
        tags.forEach(tag => console.log(tag))
        
        await createPost({ name: auth.currentUser.displayName, email: auth.currentUser.email, message: message, tags, tags})
        setTags([])
        setMessage('')
    }

    const handleMessageChange = val => {
        setMessage(val)
    }

    const handleTagChange = val => {
        // val is e.target.value

        const tempTags = val.split(',')
        tempTags.forEach(tag => tag = tag.trim())
        setTags(tempTags)
    }

    const handleCreateToggle = () => {
        setCreatePostBool(cur => cur ? false : true)
    }

    return (
        <div className="home">
            <div className="searchbar">
                <input placeholder="Search by tags..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} ></input>
                <svg onClick={() => searchByTag()} className="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            {
                createPostBool && 
                <div className="create-post"> 
                    <div className="tags">
                        {
                            (tags.length > 0) &&
                            tags.map((tag, index) => {
                                return <Tag key={index} val={tag} />
                            })
                        }
                    </div>
                    <form>
                        <input className="tag-input" placeholder="Enter some tags" onChange={e => handleTagChange(e.target.value)}></input>
                        <textarea className="msg-input" placeholder="Talk about something" value={message} onChange={(e) => {handleMessageChange(e.target.value)}}></textarea>
                        <Button className="submit" variant="contained" onClick={sendPost}>
                            Let others know!
                            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </Button>
                    </form>
                </div>
            }

            
            <div className="posts">
            {
                allPosts.map((post, index) => {
                    return <Post key={index} postData={post} />
                })
            }
            {
                !allPosts.length &&
                <Typography variant="h3">No posts found</Typography>
            }
            </div>

            <div className="compose" onClick={() => handleCreateToggle()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>

        </div>
    )
}

const Post = ({postData}) => {
    return (
        <div className="post" style={{display: 'flex', flexDirection: 'column' }} >
           <Typography className="name" variant="h5">{postData.creator_name}</Typography>
           {/* <Typography className="email" variant="h6">{postData.creator}</Typography> */}
           <div className="tags">
               {
                   postData.tags && 
                   postData.tags.map((tag, index) => {
                       return <Tag val={tag} key={index} />
                   })
               }
           </div>
           <Typography className="message" variant="p">{postData.message}</Typography>
        </div>
    )
}

const Tag = ({val}) => {
    return (
        <div className="tag">
            <Typography variant="p">{val}</Typography>
        </div>
    )
}

export default HomeScreen