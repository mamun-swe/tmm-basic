import React from 'react'
import './style.scss'
import { useForm } from 'react-hook-form'
import Modal from 'react-bootstrap/Modal'

const Music = (props) => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => props.newdata(data)

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="md"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h6 className="mb-0">Create movie type</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Movie type */}
                        <div className="form-group mb-3">
                            {errors.movieType && errors.movieType.message ? (
                                <small className="text-danger">{errors.movieType && errors.movieType.message}</small>
                            ) : <small>Movie type*</small>
                            }

                            <input
                                type="text"
                                name="movieType"
                                placeholder="Enter movie type"
                                className={errors.movieType ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                ref={register({
                                    required: "Movie type is required."
                                })}
                            />
                        </div>


                        {/* Submit Button */}
                        <div className="text-right">
                            <button
                                type="submit"
                                className="btn shadow-none"
                                disabled={props.isCreate}
                            >
                                {props.isCreate ? <span>Creating...</span> : <span>Create</span>}
                            </button>
                        </div>

                    </form>
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default Music;