import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import axios from 'axios'
import Icon from 'react-icons-kit'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import { Form } from 'react-bootstrap'
import { ic_add } from 'react-icons-kit/md'
import 'react-toastify/dist/ReactToastify.css'
import HobbiCreateModal from '../modal/Hobbi'

toast.configure({ autoClose: 2000 })
const PersonalActivities = ({ email, activities, header }) => {
    const [isLoading, setLoading] = useState(false)
    const [hobbies, setHobbies] = useState([])

    // Input states
    const [selectedHobbies, setSelectedHobbies] = useState([])
    const [isEmpty, setEmpty] = useState(false)

    // Hobbi create states
    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false)

    // Fetch Hobbi
    const fetchHobbi = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/activity/index`, header)
            if (response.status === 200) {
                setHobbies(response.data.activities.hobbies)
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
        fetchHobbi()
        setSelectedHobbies(activities.hobbies)
    }, [header, fetchHobbi])

    // Create Hobbi
    const createHobbi = async (data) => {
        try {
            setCreated(true)
            const response = await axios.post(`${api}admin/activity/store/hobbi`, data, header)
            if (response.status === 201) {
                fetchHobbi()
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
    const checkedHobbi = hobbi => {
        if (activities) {
            const activity = activities.hobbies.find(data => data === hobbi)
            if (activity)
                return activity
            return false
        }
    }

    // Handle checkbox with toggle
    const toggleCheckbox = event => {
        const item = event.target

        if (item.checked === true) {
            setSelectedHobbies([...selectedHobbies, item.value])
        } else {
            const findItem = selectedHobbies.filter(e => e !== item.value)
            setSelectedHobbies([])
            setSelectedHobbies(findItem)
        }
    }

    // Add hobbi
    const addHobbi = async () => {
        try {
            if (!selectedHobbies.length) return setEmpty(true)
            const data = { email: email, hobbies: selectedHobbies }

            setLoading(true)
            const response = await axios.put(`${api}admin/user/profile/activity?field=hobbies`, data, header)
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
                        {isEmpty ? <span className="text-danger">Please select hobbies</span> : <span>Hobbies</span>}
                    </p>
                </div>
            </div>

            {/* Section body */}
            <div className="section-body">
                <div className="row">
                    {hobbies && hobbies.map((hobbie, i) =>
                        <div className="col-6 col-sm-6 col-lg-4" key={i}>
                            <Form.Group controlId={i}>
                                <Form.Check
                                    type="checkbox"
                                    label={hobbie}
                                    value={hobbie}
                                    onChange={toggleCheckbox}
                                    defaultChecked={checkedHobbi(hobbie)}
                                />
                            </Form.Group>
                        </div>
                    )}

                    {hobbies && hobbies.length ?
                        <div className="col-12 text-right">
                            <button type="button" className="btn shadow-none" onClick={addHobbi} disabled={isLoading}>
                                {isLoading ? 'Adding...' : 'Add Hobbies'}
                            </button>
                        </div>
                        : null}
                </div>
            </div>

            {/* Modals */}
            {/* Hobbi Create */}
            {show ?
                <HobbiCreateModal
                    show={show}
                    newdata={createHobbi}
                    isCreate={created}
                    onHide={() => setShow(false)}
                />
                : null}
        </div>
    );
}

export default PersonalActivities;

const customStyles = {
    smBtn: {
        width: 33,
        height: 34,
    }
}