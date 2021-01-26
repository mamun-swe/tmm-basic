import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const ProfilePictureDescription = ({ email }) => {
    const { register, handleSubmit, errors } = useForm()

    // Submit form
    const onSubmit = async (data) => {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

            </form>
        </div>
    );
}

export default ProfilePictureDescription;