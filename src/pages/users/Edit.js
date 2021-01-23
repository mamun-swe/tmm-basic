import React, { useState } from 'react'
import './style.scss'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import { Images } from '../../utils/Images'
import { Link } from 'react-router-dom'

toast.configure({ autoClose: 2000 })

const Edit = () => {
    const { register, handleSubmit, errors } = useForm()
    const [religion, setReligion] = useState({ value: null, error: null })
    const [socialOrder, setSocialOrder] = useState({ value: null, error: null })
    const [birthCountry, setBirthCountry] = useState({ value: null, error: null })
    const [livingCountry, setLivingCountry] = useState({ value: null })
    const [isLoading, setLoading] = useState(false)

    const religions = [
        { value: 'Muslim', label: 'Muslim' },
        { value: 'Hindu', label: 'Hindu' },
        { value: 'Chistams', label: 'Chistams' }
    ]

    const socialOrders = [
        { value: 'Muslim', label: 'Muslim' },
        { value: 'Hindu', label: 'Hindu' },
        { value: 'Chistams', label: 'Chistams' }
    ]

    const countries = [
        { value: 'Bangladesh', label: 'Bangladesh' },
        { value: 'Pakistan', label: 'Pakistan' },
        { value: 'India', label: 'India' }
    ]

    // onChange religion
    const onChangeReligion = event => setReligion({ value: event.value, error: null })

    // OnChange social order
    const onChangeSocialOrder = event => setSocialOrder({ value: event.value, error: null })

    // OnChange Birth Country
    const onChangeBirthCountry = event => setBirthCountry({ value: event.value, error: null })

    // OnChange Living Country
    const onChangeLivingCountry = event => setLivingCountry({ value: event.value, error: null })


    // Submit Registration Data
    const onSubmit = async (data) => {

        // Check Religion
        if (!religion.value) return setReligion({ error: true })

        // Check Social Order
        if (!socialOrder.value) return setSocialOrder({ error: true })

        // Check Birth Country
        if (!birthCountry.value) return setBirthCountry({ error: true })

        const regData = {
            ...data,
            religion: religion.value,
            socialOrder: socialOrder.value,
            birthCountry: birthCountry.value,
            livingCountry: livingCountry.value ? livingCountry.value : null
        }

        console.log(regData)
        setLoading(true)
        toast.success('Successfully account updated.')
    }


    return (
        <div className="user-edit">
            <div className="card border-0">
                <div className="card-header bg-white p-4">
                    <div className="d-flex">
                        <div>
                            <h4 className="mb-0">User Edit</h4>
                            <p className="mb-0"><Link to="/">Go Back</Link> to see registered users.</p>
                        </div>
                        <div className="ml-auto">
                            <img src={Images.Logo} className="img-fluid" alt="Company logo" />
                        </div>
                    </div>
                </div>
                <div className="card-body pt-4 pb-4 pb-lg-5">

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">

                            {/* Name */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.name && errors.name.message ? (
                                        <small className="text-danger">{errors.name && errors.name.message}</small>
                                    ) : <small>Name</small>
                                    }
                                    <input
                                        type="text"
                                        name="name"
                                        className={errors.name ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="Your name"
                                        ref={register({
                                            required: "Name is required.",
                                            minLength: {
                                                value: 5,
                                                message: "Minimun length 5 character."
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.phone && errors.phone.message ? (
                                        <small className="text-danger">{errors.phone && errors.phone.message}</small>
                                    ) : <small>Phone number</small>
                                    }
                                    <input
                                        type="text"
                                        name="phone"
                                        className={errors.password ? "form-control shadow-none danger-border" : "form-control shadow-none"}
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

                            {/* E-mail */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.email && errors.email.message ? (
                                        <small className="text-danger">{errors.email && errors.email.message}</small>
                                    ) : <small>E-mail</small>
                                    }
                                    <input
                                        type="text"
                                        name="email"
                                        className={errors.email ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="E-mail"
                                        ref={register({
                                            required: "E-mail is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.gender && errors.gender.message ? (
                                        <small className="text-danger">{errors.gender && errors.gender.message}</small>
                                    ) : <small>Gender</small>
                                    }

                                    <select
                                        name="gender"
                                        className={errors.gender ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        ref={register({
                                            required: "Gender is required."
                                        })}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>

                            {/* Looking For */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.lookingFor && errors.lookingFor.message ? (
                                        <small className="text-danger">{errors.lookingFor && errors.lookingFor.message}</small>
                                    ) : <small>Looking for</small>
                                    }

                                    <select
                                        name="lookingFor"
                                        className={errors.lookingFor ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        ref={register({
                                            required: "Select what you want."
                                        })}
                                    >
                                        <option value="groom">Groom</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>

                            {/* DOB */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.dob && errors.dob.message ? (
                                        <small className="text-danger">{errors.dob && errors.dob.message}</small>
                                    ) : <small>Date of birth</small>
                                    }

                                    <input
                                        type="date"
                                        name="dob"
                                        className={errors.dob ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        defaultValue={Date}
                                        ref={register({
                                            required: "Date of birth is required"
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Religion */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {religion.error ?
                                        <small className="text-danger">Religion is required.</small>
                                        : <small>Religion</small>
                                    }
                                    <Select
                                        name="religion"
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Select religion'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={religions}
                                        onChange={onChangeReligion}
                                    />
                                </div>
                            </div>

                            {/* Social order */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {socialOrder.error ?
                                        <small className="text-danger">Social order is required.</small>
                                        : <small>Social order</small>
                                    }
                                    <Select
                                        name="religion"
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Social order'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={socialOrders}
                                        onChange={onChangeSocialOrder}
                                    />
                                </div>
                            </div>

                            {/* Birth Country */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {birthCountry.error ?
                                        <small className="text-danger">Birth country is required.</small>
                                        : <small>Birth country</small>
                                    }
                                    <Select
                                        name="birthCountry"
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Select birth country'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={countries}
                                        onChange={onChangeBirthCountry}
                                    />
                                </div>
                            </div>

                            {/* Living Country */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <small>Living country</small>
                                    <Select
                                        name="livingCountry"
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Social order'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={countries}
                                        onChange={onChangeLivingCountry}
                                    />
                                </div>
                            </div>

                        </div>


                        {/* Submit Button */}
                        <div className="text-right">
                            <button
                                type="submit"
                                className="btn shadow-none"
                                disabled={isLoading}
                            >
                                {isLoading ? <span>Updating...</span> : <span>Update</span>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Edit;

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