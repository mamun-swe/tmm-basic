import React, { useState } from 'react'
import './style.scss'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { Modal, Form } from 'react-bootstrap'

const Branch = (props) => {
    const { register, handleSubmit, errors } = useForm()
    const [isActive, setActive] = useState(true)
    const [country, setCountry] = useState({ value: null, error: null })

    // on change country
    const onChangeCountry = event => setCountry({ value: event.value, error: null })

    // handle Active switch
    const handleSwitch = () => {
        setActive(!isActive)
    }

    const onSubmit = data => {

        // Check country
        if (!country.value) return setCountry({ error: true })

        const branchData = {
            ...data,
            country: country.value,
            isActive: isActive
        }

        props.newdata(branchData)
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
                        <h6 className="mb-0">Create Branch</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Branch Name */}
                        <div className="form-group mb-3">
                            {errors.name && errors.name.message ? (
                                <small className="text-danger">{errors.name && errors.name.message}</small>
                            ) : <small>Branch name*</small>
                            }

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter branch name"
                                className={errors.name ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                ref={register({
                                    required: "Branch name is required."
                                })}
                            />
                        </div>

                        {/* Country */}
                        <div className="form-group mb-3">
                            {country.error ? (
                                <small className="text-danger">Country is required.</small>
                            ) : <small>Country*</small>
                            }

                            <Select
                                name="country"
                                classNamePrefix="custom-select"
                                styles={customStyles}
                                placeholder={'Select country'}
                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                options={props.countries}
                                onChange={onChangeCountry}
                            />
                        </div>

                        {/* City */}
                        <div className="form-group mb-3">
                            {errors.city && errors.city.message ? (
                                <small className="text-danger">{errors.city && errors.city.message}</small>
                            ) : <small>City*</small>
                            }

                            <input
                                type="text"
                                name="city"
                                placeholder="Enter City"
                                className={errors.name ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                ref={register({
                                    required: "City is required."
                                })}
                            />
                        </div>

                        {/* Address */}
                        <div className="form-group mb-3">
                            {errors.address && errors.address.message ? (
                                <small className="text-danger">{errors.address && errors.address.message}</small>
                            ) : <small>Address*</small>
                            }

                            <input
                                type="text"
                                name="address"
                                placeholder="Enter address"
                                className={errors.name ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                ref={register({
                                    required: "Address is required."
                                })}
                            />
                        </div>

                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            className="shadow-none"
                            label={isActive === true ? 'Active' : 'Deactive'}
                            onChange={handleSwitch}
                            checked={isActive}
                        />


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

export default Branch;

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