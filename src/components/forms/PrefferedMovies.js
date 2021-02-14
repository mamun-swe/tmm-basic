import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import Icon from 'react-icons-kit'
import { Form } from 'react-bootstrap'
import { ic_add } from 'react-icons-kit/md'
import 'react-toastify/dist/ReactToastify.css'

import MovieCreateModal from '../modal/Movie'

toast.configure({ autoClose: 2000 })
const PrefferedMovies = ({ email, header, activities }) => {
    const [isLoading, setLoading] = useState(false)
    const [movies, setMovies] = useState([])

    // Input states
    const [selectedMovies, setSelectedMovies] = useState([])
    const [isEmpty, setEmpty] = useState(false)

    // Interest create states
    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false)

    // get movies
    const getMovies = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/activity/index`, header)
            if (response.status === 200) {
                setMovies(response.data.activities.movies)
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
        getMovies()
        setSelectedMovies(activities.preferredMovies)
    }, [header, getMovies])


    // Create Movie
    const createMovie = async (data) => {
        try {
            setCreated(true)
            const response = await axios.post(`${api}admin/activity/store/movie`, data, header)
            if (response.status === 201) {
                getMovies()
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
    const checkedMovies = read => {
        if (activities) {
            const activity = activities.preferredMovies.find(data => data === read)
            if (activity)
                return activity
            return false
        }
    }

    // Handle checkbox with toggle
    const toggleCheckbox = event => {
        const item = event.target

        if (item.checked === true) {
            setSelectedMovies([...selectedMovies, item.value])
            setEmpty(false)
        } else {
            const findItem = selectedMovies.filter(e => e !== item.value)
            setSelectedMovies([])
            setSelectedMovies(findItem)
        }
    }

    // Add movie
    const addMovie = async () => {
        try {
            if (!selectedMovies.length) return setEmpty(true)
            const data = { email: email, preferredMovies: selectedMovies }

            setLoading(true)
            const response = await axios.put(`${api}admin/user/profile/activity?field=preferredMovies`, data, header)
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
                        {isEmpty ? <span className="text-danger">Select first</span> : <span>Preffered Movies</span>}
                    </p>
                </div>
            </div>

            {/* Section body */}
            <div className="section-body">
                <div className="row">
                    {movies && movies.map((read, i) =>
                        <div className="col-6 col-sm-4 col-md-3" key={i}>
                            <Form.Group controlId={read}>
                                <Form.Check
                                    type="checkbox"
                                    label={read}
                                    value={read}
                                    onChange={toggleCheckbox}
                                    defaultChecked={checkedMovies(read)}
                                />
                            </Form.Group>
                        </div>
                    )}

                    {movies && movies.length ?
                        <div className="col-12 text-right">
                            <button type="button" className="btn shadow-none" onClick={addMovie}>
                                {isLoading ? 'Adding...' : 'Add Movies'}
                            </button>
                        </div>
                        : null}
                </div>
            </div>

            {/* Modals */}
            {/* Interest Create */}
            {show ?
                <MovieCreateModal
                    show={show}
                    newdata={createMovie}
                    isCreate={created}
                    onHide={() => setShow(false)}
                />
                : null}
        </div>
    );
}

export default PrefferedMovies;
const customStyles = {
    smBtn: {
        width: 33,
        height: 34,
    }
}