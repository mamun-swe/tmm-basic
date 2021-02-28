import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import Icon from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md'
import { Form } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import InterestCreateModal from '../modal/Interest'

toast.configure({ autoClose: 2000 })
const Interests = ({ email, header, activities }) => {
    const [isLoading, setLoading] = useState(false)
    const [interests, setInterests] = useState([])

    // Input states
    const [selectedInterests, setSelectedInterests] = useState([])
    const [isEmpty, setEmpty] = useState(false)

    // Interest create states
    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false)


    // Fetch interests
    const fetchInterests = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/activity/index`, header)
            if (response.status === 200) {
                setInterests(response.data.activities.interests)
            }
        } catch (error) {
            if (error) {
                if (error) {
                    toast.error(`${error.response.data.message}`, {
                        position: "bottom-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            }
        }
    }, [header])

    useEffect(() => {
        fetchInterests()
        setSelectedInterests(activities.interests)
    }, [header, fetchInterests])

    // Create Interest
    const createInterests = async (data) => {
        try {
            setCreated(true)
            const response = await axios.post(`${api}admin/activity/store/interest`, data, header)
            if (response.status === 201) {
                fetchInterests()
                setCreated(false)
                setShow(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setCreated(false)
                toast.warn(error.response.data.message)
            }
        }
    }

    // Active sellected options
    const checkedInterested = interest => {
        if (activities) {
            const activity = activities.interests.find(data => data === interest)
            if (activity)
                return activity
            return false
        }
    }

    // Handle checkbox with toggle
    const toggleCheckbox = event => {
        const item = event.target

        if (item.checked === true) {
            setSelectedInterests([...selectedInterests, item.value])
            setEmpty(false)
        } else {
            const findItem = selectedInterests.filter(e => e !== item.value)
            setSelectedInterests([])
            setSelectedInterests(findItem)
        }
    }


    // Check states
    const addInterest = async () => {
        try {
            if (!selectedInterests.length) return setEmpty(true)
            const data = { email: email, interests: selectedInterests }

            setLoading(true)
            const response = await axios.put(`${api}admin/user/profile/activity?field=interests`, data, header)
            if (response.status === 201) {
                setLoading(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                toast.warn(error.response.data.message)
            }
        }
    }

    return (
        <div className="section">
            {/* Section header */}
            <div className="section-header d-flex mb-3">
                <div className="pr-3">
                    <button
                        type="button"
                        style={customStyles.smBtn}
                        className="btn shadow-none rounded-circle p-1"
                        onClick={() => setShow(true)}
                    >
                        <Icon icon={ic_add} size={22} />
                    </button>
                </div>
                <div>
                    <p className="section-title">
                        {isEmpty ? <span className="text-danger">Please select Interests</span> : <span>Interests</span>}
                    </p>
                </div>
            </div>

            {/* Section body */}
            <div className="section-body">
                <div className="row">
                    {interests && interests.map((interest, i) =>
                        <div className="col-6 col-sm-6 col-lg-4" key={i}>
                            <Form.Group controlId={interest}>
                                <Form.Check
                                    type="checkbox"
                                    label={interest}
                                    value={interest}
                                    onChange={toggleCheckbox}
                                    defaultChecked={checkedInterested(interest)}
                                />
                            </Form.Group>
                        </div>
                    )}

                    {interests && interests.length ?
                        <div className="col-12 text-right">
                            <button
                                type="button"
                                className="btn shadow-none"
                                onClick={addInterest}
                                disabled={isLoading}
                            >{isLoading ? 'Adding...' : 'Add Interest'}</button>
                        </div>
                        : null}
                </div>
            </div>

            {/* Modals */}
            {/* Interest Create */}
            {show ?
                <InterestCreateModal
                    show={show}
                    newdata={createInterests}
                    isCreate={created}
                    onHide={() => setShow(false)}
                />
                : null}
        </div>
    );
}

export default Interests;
const customStyles = {
    smBtn: {
        width: 33,
        height: 34,
    }
}