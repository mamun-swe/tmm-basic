import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import Icon from 'react-icons-kit'
import { Form } from 'react-bootstrap'
import { ic_add } from 'react-icons-kit/md'
import 'react-toastify/dist/ReactToastify.css'

import CuisineCreateModal from '../modal/Cuisine'

toast.configure({ autoClose: 2000 })
const FavouriteCuisine = ({ email, header, activities }) => {
    const [isLoading, setLoading] = useState(false)
    const [cuisines, setCuisine] = useState([])

    // Input states
    const [selectedCuisine, setSelectedCuisine] = useState([])
    const [isEmpty, setEmpty] = useState(false)

    // Interest create states
    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false)

    // get cuisine
    const getCuisine = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/activity/index`, header)
            if (response.status === 200) {
                setCuisine(response.data.activities.cuisines)
            }
        } catch (error) {
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
    }, [header])

    useEffect(() => {
        getCuisine()
        setSelectedCuisine(activities.favouriteCuisine)
    }, [header, activities, getCuisine])


    // Create Cuisine
    const createCuisine = async (data) => {
        try {
            setCreated(true)
            const response = await axios.post(`${api}admin/activity/store/cuisine`, data, header)
            if (response.status === 201) {
                getCuisine()
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
    const checkedCuisines = cuisine => {
        if (activities) {
            const activity = activities.favouriteCuisine.find(data => data === cuisine)
            if (activity)
                return activity
            return false
        }
    }

    // Handle checkbox with toggle
    const toggleCheckbox = event => {
        const item = event.target

        if (item.checked === true) {
            setSelectedCuisine([...selectedCuisine, item.value])
            setEmpty(false)
        } else {
            const findItem = selectedCuisine.filter(e => e !== item.value)
            setSelectedCuisine([])
            setSelectedCuisine(findItem)
        }
    }

    // Add cuisine
    const addCuisine = async () => {
        try {
            if (!selectedCuisine.length) return setEmpty(true)
            const data = { email: email, favouriteCuisine: selectedCuisine }

            setLoading(true)
            const response = await axios.put(`${api}admin/user/profile/activity?field=favouriteCuisine`, data, header)
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
                <div >
                    <p className="section-title">
                        {isEmpty ? <span className="text-danger">Select first</span> : <span>Favourite cuisine</span>}
                    </p>
                </div>
            </div>

            {/* Section body */}
            <div className="section-body">
                <div className="row">
                    {cuisines && cuisines.map((cuisine, i) =>
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={i}>
                            <Form.Group controlId={cuisine}>
                                <Form.Check
                                    type="checkbox"
                                    label={cuisine}
                                    value={cuisine}
                                    onChange={toggleCheckbox}
                                    defaultChecked={checkedCuisines(cuisine)}
                                />
                            </Form.Group>
                        </div>
                    )}

                    {cuisines && cuisines.length ?
                        <div className="col-12 text-right">
                            <button type="button" className="btn shadow-none" onClick={addCuisine} disabled={isLoading}>
                                {isLoading ? 'Adding...' : 'Add cuisines'}
                            </button>
                        </div>
                        : null}
                </div>
            </div>

            {/* Modals */}
            {/* Interest Create */}
            {show ?
                <CuisineCreateModal
                    show={show}
                    newdata={createCuisine}
                    isCreate={created}
                    onHide={() => setShow(false)}
                />
                : null}
        </div>
    );
}

export default FavouriteCuisine;
const customStyles = {
    smBtn: {
        width: 33,
        height: 34,
    }
}