import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import Icon from 'react-icons-kit'
import { Form } from 'react-bootstrap'
import { ic_add } from 'react-icons-kit/md'
import 'react-toastify/dist/ReactToastify.css'

import MusicCreateModal from '../modal/Music'

toast.configure({ autoClose: 2000 })
const FavouriteMusic = ({ email, header, activities }) => {
    const [isLoading, setLoading] = useState(false)
    const [musics, setMusics] = useState([])

    // Input states
    const [selectedMusics, setSelectedMusics] = useState([])
    const [isEmpty, setEmpty] = useState(false)

    // Interest create states
    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false)

    // Fetch mesics
    const fetchMusics = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/activity/index`, header)
            if (response.status === 200) {
                setMusics(response.data.activities.musics)
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
        fetchMusics()
        setSelectedMusics(activities.favouriteMusic)
    }, [header, fetchMusics])


    // Create Music
    const createMusic = async (data) => {
        try {
            setCreated(true)
            const response = await axios.post(`${api}admin/activity/store/music`, data, header)
            if (response.status === 201) {
                fetchMusics()
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
    const checkedMusics = music => {
        if (activities) {
            const activity = activities.favouriteMusic.find(data => data === music)
            if (activity)
                return activity
            return false
        }
    }

    // Handle checkbox with toggle
    const toggleCheckbox = event => {
        const item = event.target

        if (item.checked === true) {
            setSelectedMusics([...selectedMusics, item.value])
            setEmpty(false)
        } else {
            const findItem = selectedMusics.filter(e => e !== item.value)
            setSelectedMusics([])
            setSelectedMusics(findItem)
        }
    }



    // Add music
    const addMusic = async () => {
        try {
            if (!selectedMusics.length) return setEmpty(true)
            const data = { email: email, favouriteMusic: selectedMusics }

            setLoading(true)
            const response = await axios.put(`${api}admin/user/profile/activity?field=favouriteMusic`, data, header)
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
                        {isEmpty ? <span className="text-danger">Select music first</span> : <span>Favourite Music</span>}
                    </p>
                </div>
            </div>

            {/* Section body */}
            <div className="section-body">
                <div className="row">
                    {musics && musics.map((music, i) =>
                        <div className="col-6 col-sm-4 col-md-3" key={i}>
                            <Form.Group controlId={music}>
                                <Form.Check
                                    type="checkbox"
                                    label={music}
                                    value={music}
                                    onChange={toggleCheckbox}
                                    defaultChecked={checkedMusics(music)}
                                />
                            </Form.Group>
                        </div>
                    )}

                    {musics && musics.length ?
                        <div className="col-12 text-right">
                            <button type="button" className="btn shadow-none" onClick={addMusic} disabled={isLoading}>
                                {isLoading ? 'Adding...' : 'Add Music'}
                            </button>
                        </div>
                        : null}
                </div>
            </div>

            {/* Modals */}
            {/* Interest Create */}
            {show ?
                <MusicCreateModal
                    show={show}
                    newdata={createMusic}
                    isCreate={created}
                    onHide={() => setShow(false)}
                />
                : null}
        </div>
    );
}

export default FavouriteMusic;
const customStyles = {
    smBtn: {
        width: 33,
        height: 34,
    }
}