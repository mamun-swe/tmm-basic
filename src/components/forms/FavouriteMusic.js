import React, { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Icon from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md'
import { Form } from 'react-bootstrap'

import MusicCreateModal from '../modal/Music'

toast.configure({ autoClose: 2000 })
const FavouriteMusic = ({ email }) => {
    // const [isLoading, setLoading] = useState(false)
    const [musics, setMusics] = useState([])

    // Input states
    const [selectedMusics, setSelectedMusics] = useState([])

    // Interest create states
    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false)

    useEffect(() => {
        fetchMusics()
    }, [])

    // Handle musics
    const handleMusic = event => {
        const newMusic = event.target.value
        const exMusic = selectedMusics.find((music) => music === newMusic)
        if (exMusic) {
            const newArr = selectedMusics.filter(e => e !== newMusic)
            return setSelectedMusics(newArr)
        }
        setSelectedMusics([...selectedMusics, newMusic])
    }

    // Fetch mesics
    const fetchMusics = async () => {
        try {
            const response = await axios.get(`${api}admin/activity/index`)
            if (response.status === 200) {
                setMusics(response.data.activities.musics)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    // Create Music
    const createMusic = async (data) => {
        try {
            setCreated(true)
            const response = await axios.post(`${api}admin/activity/store/music`, data)
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



    // Check states
    const checkState = () => {
        console.log(selectedMusics)
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
                <div ><p className="section-title">Favourite Music</p></div>
            </div>

            {/* Section body */}
            <div className="section-body">
                <div className="row">
                    {musics && musics.map((music, i) =>
                        <div className="col-6 col-sm-4 col-md-3" key={i}>
                            <Form.Group controlId={i}>
                                <Form.Check
                                    type="checkbox"
                                    label={music}
                                    value={music}
                                    onChange={handleMusic}
                                />
                            </Form.Group>
                        </div>
                    )}

                    {musics && musics.length ?
                        <div className="col-12 text-right">
                            <button type="button" className="btn shadow-none" onClick={checkState}>Add Music</button>
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