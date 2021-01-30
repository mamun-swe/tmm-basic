import React, { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Icon from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md'
import { Form } from 'react-bootstrap'

import HobbiCreateModal from '../modal/Hobbi'

import { removeItem } from '../../utils/helpers'

toast.configure({ autoClose: 2000 })
const PersonalActivities = ({ email, activities }) => {
    const [isLoading, setLoading] = useState(false)
    const [hobbies, setHobbies] = useState([])

    // Input states
    const [selectedHobbies, setSelectedHobbies] = useState([])
    const [isEmpty, setEmpty] = useState(false)

    // Hobbi create states
    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false)

    useEffect(() => {
        fetchHobbi()
    }, [])

    // Handle hobbie
    // const handleHobbie = event => {
    //     const newHobbi = event.target.value
    // const exHobbie = selectedHobbies.find((hobbi) => hobbi === newHobbi)
    // if (exHobbie) {
    //     const newArr = selectedHobbies.filter(e => e !== newHobbi)
    //     return setSelectedHobbies(newArr)
    // }
    // setSelectedHobbies([...selectedHobbies, newHobbi])
    // }

    // Fetch Hobbi
    const fetchHobbi = async () => {
        try {
            const response = await axios.get(`${api}admin/activity/index`)
            if (response.status === 200) {
                setHobbies(response.data.activities.hobbies)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    // Create Hobbi
    const createHobbi = async (data) => {
        try {
            setCreated(true)
            const response = await axios.post(`${api}admin/activity/store/hobbi`, data)
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


    // Add hobbi
    const addHobbi = async () => {
        try {
            console.log(selectedHobbies)
            // console.log(activities.hobbies)
            // setSelectedHobbies([...selectedHobbies, activities.hobbies])
            // console.log(selectedHobbies)

            // if (!selectedHobbies.length) return setEmpty(true)
            // const data = { email: email, hobbies: selectedHobbies }

            // setLoading(true)
            // const response = await axios.put(`${api}admin/user/profile/activity?field=hobbies`, data)
            // if (response.status === 201) {
            //     setLoading(false)
            //     toast.success(response.data.message)
            // }

        } catch (error) {
            if (error) {
                setLoading(false)
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


    const toggleCheckbox = event => {
        const item = event.target.value

        setSelectedHobbies(activities.hobbies)

        // const isAvailable = selectedHobbies.find(oldItem => oldItem === item)
        // if (isAvailable) {
        //     const freshItems = removeItem(selectedHobbies, item)
        //     setSelectedHobbies(freshItems)
        // } else {
        //     setSelectedHobbies([...selectedHobbies, item])
        // }


      


        // const exHobbie = selectedHobbies.find((hobbi) => hobbi === item)
        // if (exHobbie) {
        //     const index = selectedHobbies.indexOf(item)
        //     if (index > -1) { selectedHobbies.splice(index, 1) }
        // }
        // setSelectedHobbies([...selectedHobbies, item])

        // console.log(selectedHobbies);
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
                        <div className="col-6 col-sm-4 col-md-3" key={i}>
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
                                {isLoading ? <span>Adding...</span> : <span>Add Hobbies</span>}
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