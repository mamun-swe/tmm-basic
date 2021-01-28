import React, { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Icon from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md'
import { Form } from 'react-bootstrap'

import InterestCreateModal from '../modal/Interest'

toast.configure({ autoClose: 2000 })
const Interests = ({ email }) => {
    // const [isLoading, setLoading] = useState(false)
    const [interests, setInterests] = useState([])

    // Input states
    const [selectedInterests, setSelectedInterests] = useState([])

    // Interest create states
    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false)

    useEffect(() => {
        fetchInterests()
    }, [])

    // Handle interests
    const handleInterests = event => {
        const newHobbi = event.target.value
        const exHobbie = selectedInterests.find((hobbi) => hobbi === newHobbi)
        if (exHobbie) {
            const newArr = selectedInterests.filter(e => e !== newHobbi)
            return setSelectedInterests(newArr)
        }
        setSelectedInterests([...selectedInterests, newHobbi])
    }

    // Fetch interests
    const fetchInterests = async () => {
        try {
            const response = await axios.get(`${api}admin/activity/index`)
            if (response.status === 200) {
                setInterests(response.data.activities.interests)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    // Create Interest
    const createInterests = async (data) => {
        try {
            setCreated(true)
            const response = await axios.post(`${api}admin/activity/store/interest`, data)
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



    // Check states
    const checkState = () => {
        console.log(selectedInterests)
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
                <div ><p className="section-title">Interests</p></div>
            </div>

            {/* Section body */}
            <div className="section-body">
                <div className="row">
                    {interests && interests.map((interest, i) =>
                        <div className="col-6 col-sm-4 col-md-3" key={i}>
                            <Form.Group controlId={i}>
                                <Form.Check
                                    type="checkbox"
                                    label={interest}
                                    value={interest}
                                    onChange={handleInterests}
                                />
                            </Form.Group>
                        </div>
                    )}

                    {interests && interests.length ?
                        <div className="col-12 text-right">
                            <button type="button" className="btn shadow-none" onClick={checkState}>Add Interests</button>
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