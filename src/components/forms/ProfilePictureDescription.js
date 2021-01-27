import React, { useState } from 'react'
import './style.scss'
import CKEditor from 'ckeditor4-react'
import { Images } from '../../utils/Images'

const ProfilePictureDescription = ({ email }) => {
    const [isImage, setImage] = useState()
    const [isUpload, setUpload] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [previewURL, setPreviewURL] = useState(null)
    const [description, setDescription] = useState({ value: null, error: null })

    // Image onChange
    const imageChangeHandeller = async (event) => {
        try {
            setUpload(true)
            // let file = event.target.files[0]
            setPreviewURL(URL.createObjectURL(event.target.files[0]))
            // let formData = new FormData()
            // formData.append('image', file)
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }

    }

    // Submit form
    const handleSubmit = async (event) => {
        event.preventDefault()

        // Check description null or not
        if (description.value === null || description.value === "") return setDescription({ error: true })

        const data = {
            email: email,
            description: description.value
        }

        setLoading(true)
        console.log(data)
    }

    return (
        <div>
            <div className="card my-lg-4">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Profile Picture */}
                            <div className="col-12 col-lg-4 text-center py-4 pt-lg-5">
                                {/* Image Container */}
                                <div className="img-container text-center">
                                    <div className="image rounded-circle border">
                                        {previewURL ?
                                            <img src={previewURL} className="img-fluid" alt="..." />
                                            : isImage ?
                                                <img src={isImage} className="img-fluid" alt="..." />
                                                : <img src={Images.Blank} className="img-fluid" alt="..." />}
                                        <div className="overlay">
                                            <div className="flex-center flex-column">
                                                <input type="file" className="upload" onChange={imageChangeHandeller} />
                                                {isUpload ?
                                                    <p className="mb-0">Uploading...</p>
                                                    : <p className="mb-0">Change <br /> Picture</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Short Description */}
                            <div className="col-12 col-lg-8">
                                {description.error ? <p className="text-danger">Short description is required.</p> : <p>Short description.</p>}
                                <CKEditor
                                    data={description.value ? description.value : "Write about of you"}
                                    onReady={editor => editor}
                                    onChange={evt => setDescription({ value: evt.editor.getData(), error: null })}
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="text-right pt-3">
                            <button
                                type="submit"
                                className="btn shadow-none"
                                disabled={isLoading}
                            >
                                {isLoading ? <span>Adding...</span> : <span>Add</span>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfilePictureDescription;