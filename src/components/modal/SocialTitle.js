import React from 'react'
import './style.scss'
import { useForm } from 'react-hook-form'
import Modal from 'react-bootstrap/Modal'

const SocialTitle = (props) => {
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = data => {
        props.create(data)
    }

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
                        <h6 className="mb-0">Create title</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Name */}
                        <div className="form-group mb-3">
                            {errors.title && errors.title.message ? (
                                <small className="text-danger">{errors.title && errors.title.message}</small>
                            ) : <small>Title*</small>
                            }

                            <input
                                type="text"
                                name="title"
                                placeholder="Enter title"
                                className={errors.title ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                ref={register({
                                    required: "Title is required."
                                })}
                            />
                        </div>


                        {/* Submit Button */}
                        <div className="text-right">
                            <button
                                type="submit"
                                className="btn shadow-none"
                                disabled={props.loading}
                            >
                                {props.loading ? <span>Creating...</span> : <span>Create</span>}
                            </button>
                        </div>

                    </form>
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default SocialTitle;