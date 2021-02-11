import React, { useState } from 'react'
import './style.scss'
import axios from 'axios'
import Select from 'react-select'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({ autoClose: 2000 })
const BasicAndLifestyle = ({ email, basicandlifeinfo, header }) => {
    const { register, handleSubmit, errors } = useForm()
    const [diet, setDiet] = useState({ value: [], error: null })
    const [bloodGroup, setBloodGroup] = useState({ value: null, error: null })
    const [healthInformation, setHealthInformation] = useState({ value: null, error: null })
    const [isLoading, setLoading] = useState(false)

    // Diet options
    const dietOptions = [
        { label: 'Open to all', value: 'open to all' },
        { label: 'veg', value: 'veg' },
        { label: 'non-veg', value: 'non-veg' },
        { label: 'vegan', value: 'vegan' }
    ]

    // Blood Group options
    const bloodGroupOptions = [
        { label: 'A(+ev)', value: 'A(+ev)' },
        { label: 'A(-ev)', value: 'A(-ev)' },
        { label: 'B(+ev)', value: 'B(+ev)' },
        { label: 'B(-ev)', value: 'B(-ev)' },
        { label: 'AB(+ev)', value: 'AB(+ev)' },
        { label: 'AB(-ev)', value: 'AB(-ev)' },
        { label: 'O(+ev)', value: 'O(+ev)' },
        { label: 'O(-ev)', value: 'O(-ev)' },
    ]

    // Health information options
    const healthInfOptions = [
        { label: 'No Health Problem', value: 'No Health Problem' },
        { label: 'HIV positive', value: 'HIV positive' },
        { label: 'Diabetes', value: 'Diabetes' },
        { label: 'Low BP', value: 'Low BP' },
        { label: 'Hight BP', value: 'Hight BP' },
        { label: 'Heart Aliments)', value: 'ABHeart Aliments' },
        { label: 'Other', value: 'Other' },
    ]

    // onChange diet handle
    const onChangeDiet = event => setDiet({ value: event, error: null })

    // onChange bloog group handle
    const onChangeBloodGroup = event => setBloodGroup({ value: event.value, error: null })

    // onChange health information
    const onChangeHealthInfo = event => setHealthInformation({ value: event.value, error: null })

    // Submit Form
    const onSubmit = async (data) => {
        try {
            // Check diet
            if ((diet.value === null || diet.value === "" || diet.value === undefined) &&
                (basicandlifeinfo.diet === null || basicandlifeinfo.diet === "" || basicandlifeinfo.diet === undefined)
            ) {
                setDiet({ error: true })
                return false
            }

            // Check blood group
            if ((bloodGroup.value === null || bloodGroup.value === "" || bloodGroup.value === undefined) &&
                (basicandlifeinfo.bloodGroup === null || basicandlifeinfo.bloodGroup === "" || basicandlifeinfo.bloodGroup === undefined)
            ) {
                setBloodGroup({ error: true })
                return false
            }

            // Check health information
            if ((bloodGroup.value === null || bloodGroup.value === "" || bloodGroup.value === undefined) &&
                (basicandlifeinfo.bloodGroup === null || basicandlifeinfo.bloodGroup === "" || basicandlifeinfo.bloodGroup === undefined)
            ) {
                setHealthInformation({ error: true })
                return false
            }

            const newData = {
                ...data,
                email: email,
                diet: diet.value.length ? diet.value.map(diet => diet.value) : basicandlifeinfo.diet,
                bloodGroup: bloodGroup.value ? bloodGroup.value : basicandlifeinfo.bloodGroup,
                healthInformation: healthInformation.value ? healthInformation.value : basicandlifeinfo.healthInformation
            }

            setLoading(true)
            const response = await axios.post(`${api}admin/basic-and-lifestle/store`, newData, header)
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
        <div>
            <div className="card my-lg-4">
                <div className="card-header bg-white">
                    <h6 className="mb-0">Basic and lifestyle</h6>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">

                            {/* Age */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.age && errors.age.message ? (
                                        <small className="text-danger">{errors.age && errors.age.message}</small>
                                    ) : <small>Age</small>
                                    }
                                    <input
                                        type="number"
                                        name="age"
                                        defaultValue={basicandlifeinfo ? basicandlifeinfo.age : null}
                                        className={errors.age ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="Enter your age"
                                        ref={register({
                                            required: "Age is required.",
                                            pattern: {
                                                value: /^[1-9]?[0-9]{1}$|^100$/,
                                                message: "Age isn't valid."
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Material status */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.materialStatus && errors.materialStatus.message ? (
                                        <small className="text-danger">{errors.materialStatus && errors.materialStatus.message}</small>
                                    ) : <small>Material status</small>
                                    }

                                    <select
                                        name="materialStatus"
                                        className={errors.materialStatus ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        ref={register({
                                            required: "Material status is required."
                                        })}
                                        defaultValue={basicandlifeinfo ? basicandlifeinfo.materialStatus : null}
                                    >
                                        <option value="never married">Never married</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="annulled">Annulled</option>
                                        <option value="widowed">Widowed</option>
                                    </select>
                                </div>
                            </div>

                            {/* Height */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.height && errors.height.message ? (
                                        <small className="text-danger">{errors.height && errors.height.message}</small>
                                    ) : <small>Height</small>
                                    }
                                    <input
                                        type="text"
                                        name="height"
                                        defaultValue={basicandlifeinfo ? basicandlifeinfo.height : null}
                                        className={errors.height ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="Height in feet (e.g: 5.0, 5.5, 5.8, 5.10, 6)"
                                        ref={register({
                                            required: "Height is required.",
                                            pattern: {
                                                value: /^[-+]?[0-9]+\.[0-9]+$/,
                                                message: "Height isn't valid."
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Body weight */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.bodyWeight && errors.bodyWeight.message ? (
                                        <small className="text-danger">{errors.bodyWeight && errors.bodyWeight.message}</small>
                                    ) : <small>Body weight</small>
                                    }
                                    <input
                                        type="number"
                                        name="bodyWeight"
                                        defaultValue={basicandlifeinfo ? basicandlifeinfo.bodyWeight : null}
                                        className={errors.bodyWeight ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder="Body weight in (kg)"
                                        ref={register({
                                            required: "Body weight is required.",
                                            pattern: {
                                                value: /^[1-9]?[0-9]{1}$|^500$/,
                                                message: "Body weight isn't valid."
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Diet */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {diet.error ? <small className="text-danger">Diet is required.</small>
                                        : <small>Diet</small>}

                                    <Select
                                        defaultValue={basicandlifeinfo ? basicandlifeinfo.diet.map(item => ({ value: item, label: item })) : null}
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        placeholder={'Select diet'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={dietOptions}
                                        onChange={onChangeDiet}
                                    />
                                </div>
                            </div>

                            {/* Blood Group */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {bloodGroup.error ? <small className="text-danger">Blood group is required.</small>
                                        : <small>Blood group</small>}

                                    <Select
                                        defaultValue={basicandlifeinfo ? { value: basicandlifeinfo.bloodGroup, label: basicandlifeinfo.bloodGroup } : null}
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Select blood group'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={bloodGroupOptions}
                                        onChange={onChangeBloodGroup}
                                    />
                                </div>
                            </div>

                            {/* Health Information */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {healthInformation.error ? <small className="text-danger">Health information is required.</small>
                                        : <small>Health information</small>}

                                    <Select
                                        defaultValue={basicandlifeinfo ? { value: basicandlifeinfo.healthInformation, label: basicandlifeinfo.healthInformation } : null}
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Select option'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={healthInfOptions}
                                        onChange={onChangeHealthInfo}
                                    />
                                </div>
                            </div>

                            {/* Disability */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.disability && errors.disability.message ? (
                                        <small className="text-danger">{errors.disability && errors.disability.message}</small>
                                    ) : <small>Disability {basicandlifeinfo ? basicandlifeinfo.disability : null}</small>
                                    }

                                    <select
                                        name="disability"
                                        className={errors.disability ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        ref={register({ required: "Disability is required." })}
                                        defaultValue={basicandlifeinfo ? basicandlifeinfo.disability : null}
                                    >
                                        <option value="none">None</option>
                                        <option value="physical disability">Physical disability</option>
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="col-12 text-right">
                                <button
                                    type="submit"
                                    className="btn shadow-none"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <span>Adding...</span> : <span>Add Lifestyle</span>}
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BasicAndLifestyle;

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