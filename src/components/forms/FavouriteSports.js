import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import Icon from 'react-icons-kit'
import { Form } from 'react-bootstrap'
import { ic_add } from 'react-icons-kit/md'
import 'react-toastify/dist/ReactToastify.css'

import SportCreateModal from '../modal/Sport'

toast.configure({ autoClose: 2000 })
const FavouriteSports = ({ email, header, activities }) => {
    const [isLoading, setLoading] = useState(false)
    const [sports, setSports] = useState([])

    // Input states
    const [selectedSports, setSelectedSports] = useState([])
    const [isEmpty, setEmpty] = useState(false)

    // Interest create states
    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false)

    // get sports
    const getSports = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/activity/index`, header)
            if (response.status === 200) {
                setSports(response.data.activities.sports)
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
        getSports()
        setSelectedSports(activities.sports)
    }, [header, getSports])


    // Create Sport
    const createSport = async (data) => {
        try {
            setCreated(true)
            const response = await axios.post(`${api}admin/activity/store/sport`, data, header)
            if (response.status === 201) {
                getSports()
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
    const checkedSports = read => {
        if (activities) {
            const activity = activities.sports.find(data => data === read)
            if (activity)
                return activity
            return false
        }
    }

    // Handle checkbox with toggle
    const toggleCheckbox = event => {
        const item = event.target

        if (item.checked === true) {
            setSelectedSports([...selectedSports, item.value])
            setEmpty(false)
        } else {
            const findItem = selectedSports.filter(e => e !== item.value)
            setSelectedSports([])
            setSelectedSports(findItem)
        }
    }

    // Add sport
    const addFavouriteSport = async () => {
        try {
            if (!selectedSports.length) return setEmpty(true)
            const data = { email: email, sports: selectedSports }

            setLoading(true)
            const response = await axios.put(`${api}admin/user/profile/activity?field=sports`, data, header)
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
                        {isEmpty ? <span className="text-danger">Select first</span> : <span>Favourite sports</span>}
                    </p>
                </div>
            </div>

            {/* Section body */}
            <div className="section-body">
                <div className="row">
                    {sports && sports.map((read, i) =>
                        <div className="col-6 col-sm-4 col-md-3" key={i}>
                            <Form.Group controlId={read}>
                                <Form.Check
                                    type="checkbox"
                                    label={read}
                                    value={read}
                                    onChange={toggleCheckbox}
                                    defaultChecked={checkedSports(read)}
                                />
                            </Form.Group>
                        </div>
                    )}

                    {sports && sports.length ?
                        <div className="col-12 text-right">
                            <button type="button" className="btn shadow-none" onClick={addFavouriteSport} disabled={isLoading}>
                                {isLoading ? 'Adding...' : 'Add sports'}
                            </button>
                        </div>
                        : null}
                </div>
            </div>

            {/* Modals */}
            {/* Interest Create */}
            {show ?
                <SportCreateModal
                    show={show}
                    newdata={createSport}
                    isCreate={created}
                    onHide={() => setShow(false)}
                />
                : null}
        </div>
    );
}

export default FavouriteSports;
const customStyles = {
    smBtn: {
        width: 33,
        height: 34,
    }
}