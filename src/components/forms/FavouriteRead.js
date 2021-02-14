import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import Icon from 'react-icons-kit'
import { Form } from 'react-bootstrap'
import { ic_add } from 'react-icons-kit/md'
import 'react-toastify/dist/ReactToastify.css'

import ReadCreateModal from '../modal/Read'

toast.configure({ autoClose: 2000 })
const FavouriteRead = ({ email, header, activities }) => {
    const [isLoading, setLoading] = useState(false)
    const [reads, setReads] = useState([])

    // Input states
    const [selectedReads, setSelectedReads] = useState([])
    const [isEmpty, setEmpty] = useState(false)

    // Interest create states
    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false)

    // Fetch reads
    const getReads = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/activity/index`, header)
            if (response.status === 200) {
                setReads(response.data.activities.reads)
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
        getReads()
        setSelectedReads(activities.favouriteReads)
    }, [header, getReads])


    // Create Read
    const createRead = async (data) => {
        try {
            setCreated(true)
            const response = await axios.post(`${api}admin/activity/store/read`, data, header)
            if (response.status === 201) {
                getReads()
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
    const checkedReads = read => {
        if (activities) {
            const activity = activities.favouriteReads.find(data => data === read)
            if (activity)
                return activity
            return false
        }
    }

    // Handle checkbox with toggle
    const toggleCheckbox = event => {
        const item = event.target

        if (item.checked === true) {
            setSelectedReads([...selectedReads, item.value])
            setEmpty(false)
        } else {
            const findItem = selectedReads.filter(e => e !== item.value)
            setSelectedReads([])
            setSelectedReads(findItem)
        }
    }



    // Add read
    const addRead = async () => {
        try {
            if (!selectedReads.length) return setEmpty(true)
            const data = { email: email, favouriteReads: selectedReads }

            setLoading(true)
            const response = await axios.put(`${api}admin/user/profile/activity?field=favouriteReads`, data, header)
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
                        {isEmpty ? <span className="text-danger">Select first</span> : <span>Favourite Reads</span>}
                    </p>
                </div>
            </div>

            {/* Section body */}
            <div className="section-body">
                <div className="row">
                    {reads && reads.map((read, i) =>
                        <div className="col-6 col-sm-4 col-md-3" key={i}>
                            <Form.Group controlId={read}>
                                <Form.Check
                                    type="checkbox"
                                    label={read}
                                    value={read}
                                    onChange={toggleCheckbox}
                                    defaultChecked={checkedReads(read)}
                                />
                            </Form.Group>
                        </div>
                    )}

                    {reads && reads.length ?
                        <div className="col-12 text-right">
                            <button type="button" className="btn shadow-none" onClick={addRead}>
                                {isLoading ? 'Adding...' : 'Add Read'}
                            </button>
                        </div>
                        : null}
                </div>
            </div>

            {/* Modals */}
            {/* Interest Create */}
            {show ?
                <ReadCreateModal
                    show={show}
                    newdata={createRead}
                    isCreate={created}
                    onHide={() => setShow(false)}
                />
                : null}
        </div>
    );
}

export default FavouriteRead;
const customStyles = {
    smBtn: {
        width: 33,
        height: 34,
    }
}