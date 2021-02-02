import React, { useState } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({ autoClose: 2000 })
const ContactInformation = ({ email, contact }) => {
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        try {
            const newData = {
                ...data,
                email
            }

            setLoading(true)
            const response = await axios.post(`${api}admin/contactinfo/store`, newData)
            if (response.status === 201) {
                setLoading(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                toast.warn(error.response.message)
            }
        }
    }

    return (
        <div>
            <div className="card my-lg-4">
                <div className="card-header bg-white">
                    <h6 className="mb-0">Contact Information</h6>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">

                            {/* Person name */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.contactPersonName && errors.contactPersonName.message ? (
                                        <small className="text-danger">{errors.contactPersonName && errors.contactPersonName.message}</small>
                                    ) : <small>Contact person name</small>
                                    }
                                    <input
                                        type="text"
                                        name="contactPersonName"
                                        defaultValue={contact ? contact.contactPersonName : null}
                                        className={errors.contactPersonName ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="Enter contact person name"
                                        ref={register({ required: "Name is required." })}
                                    />
                                </div>
                            </div>

                            {/* Relationship */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.relationship && errors.relationship.message ? (
                                        <small className="text-danger">{errors.relationship && errors.relationship.message}</small>
                                    ) : <small>Relationship with contact person</small>
                                    }
                                    <input
                                        type="text"
                                        name="relationship"
                                        defaultValue={contact ? contact.relationship : null}
                                        className={errors.relationship ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="Enter relationship"
                                        ref={register({ required: "Relationship is required." })}
                                    />
                                </div>
                            </div>

                            {/* Present address */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.presentAddress && errors.presentAddress.message ? (
                                        <small className="text-danger">{errors.presentAddress && errors.presentAddress.message}</small>
                                    ) : <small>Present address</small>
                                    }
                                    <input
                                        type="text"
                                        name="presentAddress"
                                        defaultValue={contact ? contact.presentAddress : null}
                                        className={errors.presentAddress ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="Enter present address"
                                        ref={register({ required: "Present address is required." })}
                                    />
                                </div>
                            </div>

                            {/* Permanent address */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.permanentAddress && errors.permanentAddress.message ? (
                                        <small className="text-danger">{errors.permanentAddress && errors.permanentAddress.message}</small>
                                    ) : <small>Permanent address</small>
                                    }
                                    <input
                                        type="text"
                                        name="permanentAddress"
                                        defaultValue={contact ? contact.permanentAddress : null}
                                        className={errors.permanentAddress ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="Enter permanent address"
                                        ref={register({ required: "Permanent address is required." })}
                                    />
                                </div>
                            </div>

                            {/* NID Number */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <small>NID Number ( Optional )</small>
                                    <input
                                        type="text"
                                        name="nidNumber"
                                        defaultValue={contact ? contact.nidNumber : null}
                                        className={errors.nidNumber ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="Enter NID number"
                                        ref={register()}
                                    />
                                </div>
                            </div>

                            {/* Passport Number */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <small>Passport Number ( Optional )</small>
                                    <input
                                        type="text"
                                        name="passportNumber"
                                        defaultValue={contact ? contact.passportNumber : null}
                                        className={errors.passportNumber ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="Enter passport number"
                                        ref={register()}
                                    />
                                </div>
                            </div>


                            {/* Phone number */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.phoneNumber && errors.phoneNumber.message ? (
                                        <small className="text-danger">{errors.phoneNumber && errors.phoneNumber.message}</small>
                                    ) : <small>Phone number</small>
                                    }
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        defaultValue={contact ? contact.phoneNumber : null}
                                        className={errors.phoneNumber ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="( 01X-XXXX-XXXX )"
                                        ref={register({
                                            required: "Phone number is required.",
                                            pattern: {
                                                value: /^\(?([0-9]{3})\)?([0-9]{8})$/,
                                                message: "Number isn't valid."
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Alt Phone number */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.altPhone && errors.altPhone.message ? (
                                        <small className="text-danger">{errors.altPhone && errors.altPhone.message}</small>
                                    ) : <small>Alt Phone number</small>
                                    }
                                    <input
                                        type="text"
                                        name="altPhone"
                                        defaultValue={contact ? contact.altPhone : null}
                                        className={errors.altPhone ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="( 01X-XXXX-XXXX )"
                                        ref={register({
                                            required: "Alt phone number is required.",
                                            pattern: {
                                                value: /^\(?([0-9]{3})\)?([0-9]{8})$/,
                                                message: "Number isn't valid."
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Time to call */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.convenientTimeToCall && errors.convenientTimeToCall.message ? (
                                        <small className="text-danger">{errors.convenientTimeToCall && errors.convenientTimeToCall.message}</small>
                                    ) : <small>Convenient time to call</small>
                                    }
                                    <input
                                        type="time"
                                        name="convenientTimeToCall"
                                        defaultValue={contact ? contact.convenientTimeToCall : null}
                                        className={errors.convenientTimeToCall ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        ref={register({ required: "Time is required." })}
                                    />
                                </div>
                            </div>


                            {/* Submit Button */}
                            <div className="col-12 text-right">
                                <button
                                    type="submit"
                                    className="btn shadow-none"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <span>Adding...</span> : <span>Add Contacts</span>}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactInformation;