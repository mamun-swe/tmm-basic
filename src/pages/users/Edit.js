import React, { useState, useEffect } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import { Images } from '../../utils/Images'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useParams } from 'react-router-dom'


import PrimaryInfoForm from '../../components/forms/PrimaryInfo'
import PictureAndDescUpdateForm from '../../components/forms/ProfilePictureDescription'
import BasicAndLifestyleUpdateForm from '../../components/forms/BasicAndLifestyle'
import ContactInfoCreateForm from '../../components/forms/ContactInformation'
import HobbiForm from '../../components/forms/Hobbi'
import InterestForm from '../../components/forms/Interests'
import MusicForm from '../../components/forms/FavouriteMusic'

toast.configure({ autoClose: 2000 })
const Edit = () => {
    const { email } = useParams()
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        // Fetch User
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${api}admin/user/show/${email}`)
                if (response.status === 200) {
                    setLoading(false)
                    setUser(response.data.user)
                    console.log(response.data.user)
                }
            } catch (error) {
                if (error) {
                    console.log(error.response)
                    toast.warn(error.response.data.message)
                }
            }
        }

        fetchUser()
    }, [email])

    // if loading
    if (isLoading) return (<div><p>Loading...</p></div>)


    return (
        <div className="user-edit">
            <div className="card">
                <div className="card-header bg-white p-4">
                    <div className="d-flex">
                        <div>
                            <h4 className="mb-0">User Edit</h4>
                            <p className="mb-0"><Link to="/">Go Back</Link> to see registered users.</p>
                        </div>
                        <div className="ml-auto">
                            <img src={Images.Logo} className="img-fluid" alt="Company logo" />
                        </div>
                    </div>
                </div>
                <div className="card-body p-4">
                    {/* Primary info */}
                    <PrimaryInfoForm email={email} user={user} />
                </div>
            </div>

            {/* Profile Picture & Description form */}
            <PictureAndDescUpdateForm email={email} />

            {/* Basic and lifestyle information form */}
            <BasicAndLifestyleUpdateForm email={email} basicandlifeinfo={user.basicAndLifestyleInformation ? user.basicAndLifestyleInformation : null} />

            {/* Contact information form */}
            <ContactInfoCreateForm email={email} contact={user.contactInformation ? user.contactInformation : null} />

            {/* Personal activities */}
            <div className="card my-lg-4">
                <div className="card-header bg-white">
                    <h6 className="mb-0">Personal Activities</h6>
                </div>
                <div className="card-body p-4">
                    <div className="row">

                        {/* Hobbi create form */}
                        <div className="col-12 col-lg-6 pr-lg-4 border-bottom pb-4 mb-4">
                            <HobbiForm email={email} activities={user.personalActivities ? user.personalActivities : null} />
                        </div>

                        {/* Interests create form */}
                        <div className="col-12 col-lg-6 pl-lg-4 border-bottom pb-4 mb-4">
                            <InterestForm email={email} />
                        </div>

                        {/* Music create form */}
                        <div className="col-12 col-lg-6 pl-lg-4 border-bottom pb-4 mb-4">
                            <MusicForm email={email} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
