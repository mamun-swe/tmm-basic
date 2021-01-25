import React, { useState } from 'react'
import './style.scss'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import Modal from 'react-bootstrap/Modal'

const Religion = (props) => {
    const { register, handleSubmit, errors } = useForm()
    const [religion, setReligion] = useState({ value: null, error: null })


    // onChange religion
    const onChangeReligion = event => setReligion({ value: event.value, error: null })

    const onSubmit = data => {

        // Check Religion
        if (!religion.value) return setReligion({ error: true })

        const newData = {
            religion: religion.value,
            socialOrder: data.socialOrder
        }

        props.newdata(newData)
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
                        <h6 className="mb-0">Create social order</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Social Order */}
                        <div className="form-group mb-3">
                            {errors.socialOrder && errors.socialOrder.message ? (
                                <small className="text-danger">{errors.socialOrder && errors.socialOrder.message}</small>
                            ) : <small>Social Order*</small>
                            }

                            <input
                                type="text"
                                name="socialOrder"
                                placeholder="Enter social order"
                                className={errors.socialOrder ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                ref={register({
                                    required: "Social order is required."
                                })}
                            />
                        </div>

                        {/* Select Religion */}
                        <div className="form-group mb-4">
                            {religion.error ?
                                <small className="text-danger">Religion is required.</small>
                                : <small>Religion*</small>
                            }

                            <Select
                                name="religion"
                                classNamePrefix="custom-select"
                                styles={customStyles}
                                placeholder={'Select religion'}
                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                options={props.religions}
                                onChange={onChangeReligion}
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

export default Religion;

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        height: 42,
        fontSize: 14,
        color: '#000',
        boxShadow: 'none', '&:hover': { borderColor: '1px solid #ced4da' },
        border: state.isFocused ? '1px solid #dfdfdf' : '1px solid #ced4da',
        borderRadius: 0
    })
}