import React from 'react'
import appwriteService from '../appwrite/config.js'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (

        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="w-full h-48 object-cover rounded-lg">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} />
                    <h2 className="text-xl font-semibold">{title}</h2>
                </div>
            </div>
        </Link>

    )
}

export default PostCard
