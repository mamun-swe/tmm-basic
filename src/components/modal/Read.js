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
                        <h6 className="mb-0">Create read</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Read title */}
                        <div className="form-group mb-3">
                            {errors.readTitle && errors.readTitle.message ? (
                                <small className="text-danger">{errors.readTitle && errors.readTitle.message}</small>
                            ) : <small>Read title*</small>
                            }

                            <input
                                type="text"
                                name="readTitle"
                                placeholder="Enter read title"
                                className={errors.readTitle ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                ref={register({
                                    required: "Read title is required."
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