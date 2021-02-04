import React, { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import CKEditor from 'ckeditor4-react'
import { toast } from 'react-toastify'
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md'
import { Images } from '../../utils/Images'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({ autoClose: 2000 })
const ProfilePictureDescription = ({ email, profileimages, olddescription, updated }) => {
    const [show, setShow] = useState(false)
    const [isUpload, setUpload] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [description, setDescription] = useState({ value: null, error: null })

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 1000)
    }, [])

    // Image onChange & upload
    const imageChangeHandeller = async (event) => {
        try {
            setUpload(true)
            let file = event.target.files[0]
            let formData = new FormData()
            formData.append('image', file)
            if (file) {
                const response = await axios.put(`${api}admin/user/profile-picture/${email}/update`, formData)
                if (response.status === 201) {
                    updated(true)
                    setUpload(false)
                    toast.success(response.data.message)
                }
            }
        } catch (error) {
            if (error) {
                toast.warn(error.response.data.message)
            }
        }

    }

    // Submit form
    const handleSubmit = async (event) => {
        event.preventDefault()

        // Check description null or not
        if (description.value === null || description.value === "") return setDescription({ error: true })

        try {
            const data = { description: description.value }

            setLoading(true)
            const response = await axios.put(`${api}admin/user/profile/description/${email}/update`, data)
            if (response.status === 201) {
                updated(true)
                setLoading(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    return (
        <div>
            <div className="card my-lg-4">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Profile Picture */}
                            <div className="col-12 col-lg-6 text-center py-4 pt-lg-5">
                                <div className="d-flex justify-content-center">
                                    {/* Clear image */}
                                    <div className="img-container text-center">
                                        <div className="image border">
                                            {profileimages && profileimages.blurImage ?
                                                <img src={profileimages.blurImage} className="img-fluid" alt="..." />
                                                : <img src={Images.Blank} className="img-fluid" alt="..." />}
                                        </div>
                                    </div>

                                    {/* Blur image */}
                                    <div className="img-container text-center">
                                        <div className="image border">
                                            {profileimages && profileimages.clearImage ?
                                                <img src={profileimages.clearImage} className="img-fluid" alt="..." />
                                                : <img src={Images.Blank} className="img-fluid" alt="..." />}
                                        </div>
                                    </div>

                                    {/* Image upload Container */}
                                    <div className="img-container text-center">
                                        <div className="image border">
                                            <input type="file" className="upload" onChange={imageChangeHandeller} />
                                            <div className="flex-center flex-column">
                                                {isUpload ?
                                                    <p className="mb-0">Uploading...</p>
                                                    : <Icon icon={ic_add} size={30} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Short Description */}
                            {show ?
                                <div className="col-12 col-lg-6">
                                    {description.error ? <p className="text-danger">Short description is required.</p> : <p>Short description.</p>}

                                    <CKEditor
                                        data={olddescription ? olddescription : description.value ? description.value : 'Write about of you'}
                                        onReady={editor => editor}
                                        onChange={evt => setDescription({ value: evt.editor.getData(), error: null })}
                                    />

                                </div>
                                : null}

                        </div>

                        {/* Submit button */}
                        <div className="text-right pt-3">
                            <button
                                type="submit"
                                className="btn shadow-none"
                                disabled={isLoading}
                            >
                                {isLoading ? <span>Adding...</span> : <span>Add Description</span>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfilePictureDescription;