import React, { useState, useEffect, useCallback } from 'react'
import './style.scss'
import axios from 'axios'
import Icon from "react-icons-kit"
import { toast } from 'react-toastify'
import { api } from '../../../utils/api'
import { ic_lock } from 'react-icons-kit/md'
import 'react-toastify/dist/ReactToastify.css'
import { Images } from '../../../utils/Images'
import { loadC } from 'react-icons-kit/ionicons'
import { Link, useHistory, useParams } from 'react-router-dom'

import PrimaryInfoForm from '../../../components/forms/PrimaryInfo'
import PictureAndDescUpdateForm from '../../../components/forms/ProfilePictureDescription'
import BasicAndLifestyleUpdateForm from '../../../components/forms/BasicAndLifestyle'
import ContactInfoCreateForm from '../../../components/forms/ContactInformation'
import HobbiForm from '../../../components/forms/Hobbi'
import InterestForm from '../../../components/forms/Interests'
import MusicForm from '../../../components/forms/FavouriteMusic'
import PartnerPreferenceForm from '../../../components/forms/PartnerPreference'

import GhostLoader from '../../../components/ghostLoader/Index'

toast.configure({ autoClose: 2000 })
const Edit = () => {
    const history = useHistory()
    const { email } = useParams()
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [isLoggingOut, setLoggingOut] = useState(false)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })

    // Fetch User
    const fetchUser = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/user/show/${email}`, header)
            if (response.status === 200) {
                setUser(response.data.user)
                // console.log(response.data.user)
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
                toast.warn(error.response.data.message)
            }
        }
    }, [email])

    useEffect(() => {
        fetchUser()
    }, [email, header, fetchUser])

    // re fetch data after updated
    const reFetch = data => {
        if (data) {
            fetchUser()
        }
    }

    // Logout
    const doLogout = async () => {
        try {
            setLoggingOut(true)
            const response = await axios.get(`${api}admin/auth/logout`, header)
            if (response.status === 200) {
                localStorage.clear()
                setTimeout(() => {
                    history.push('/')
                }, 2000)
            }
        } catch (error) {
            if (error) {
                localStorage.clear()
                setTimeout(() => {
                    history.push('/')
                }, 2000)
            }
        }
    }

    // if loading to fetch data
    if (isLoading) return (
        <div className="user-edit">
            <GhostLoader />
        </div>
    )

    return (
        <div className="user-edit">
            <div className="card">
                <div className="card-header bg-white p-4">
                    <div className="d-flex">
                        <div>
                            <h4 className="mb-0">User Edit</h4>
                            <p className="mb-0">
                                <Link to="/dashboard">Go Back</Link>
                            to see registered users.</p>
                        </div>
                        <div className="ml-auto">
                            <img src={
                                Images.Logo
                            }
                                className="img-fluid"
                                alt="Company logo" />
                        </div>
                    </div>
                </div>
                <div className="card-body p-4">
                    {/* Primary info */}
                    <PrimaryInfoForm
                        email={email}
                        user={user}
                        updated={reFetch}
                        header={header}
                    />
                </div>
            </div>

            {/* Profile Picture & Description form */}
            <PictureAndDescUpdateForm
                email={email}
                profileimages={user.profilePicture ? user.profilePicture : null}
                olddescription={user.shortDescription ? user.shortDescription : null}
                updated={reFetch}
                header={header}
            />

            {/* Basic and lifestyle information form */}
            <BasicAndLifestyleUpdateForm
                email={email}
                basicandlifeinfo={user.basicAndLifestyleInformation ? user.basicAndLifestyleInformation : null}
                header={header}
            />

            {/* Contact information form */}
            <ContactInfoCreateForm
                email={email}
                contact={user.contactInformation ? user.contactInformation : null}
                header={header}
            />
            {/* Personal activities */}
            <div className="card my-lg-4">
                <div className="card-header bg-white">
                    <h6 className="mb-0">Personal Activities</h6>
                </div>
                <div className="card-body p-4">
                    <div className="row">
                        {/* Hobbi create form */}
                        <div className="col-12 col-lg-6 pr-lg-4 border-bottom pb-4 mb-4">
                            <HobbiForm
                                email={email}
                                activities={user.personalActivities ? user.personalActivities : null}
                                header={header}
                            />
                        </div>

                        {/* Interests create form */}
                        <div className="col-12 col-lg-6 pl-lg-4 border-bottom pb-4 mb-4">
                            <InterestForm email={email} header={header} />
                        </div>

                        {/* Music create form */}
                        <div className="col-12 col-lg-6 pl-lg-4 border-bottom pb-4 mb-4">
                            <MusicForm email={email} header={header} />
                        </div>

                    </div>
                </div>
            </div>

            {/* Partner preference */}
            <PartnerPreferenceForm
                email={email}
                updated={reFetch}
                preference={user.partnerPreference}
                header={header}
            />


            {/* Float logout button */}
            {isLoggingOut ? <Icon icon={loadC} className="spin" size={40} /> :
                <button
                    type="button"
                    className="btn float-logout-btn shadow-lg rounded-circle"
                    onClick={doLogout}
                >
                    <Icon icon={ic_lock} size={20} />
                </button>
            }
        </div>);
}

export default Edit;