import React, { useState } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({ autoClose: 2000 })
const FamilyInfo = ({ id, header, family }) => {
    const { register, handleSubmit } = useForm()
    const [isLoading, setLoading] = useState(false)

    const [father, setFather] = useState({
        name: family ? family.father.name : null,
        status: family ? family.father.status : null,
        employedCompany: family ? family.father.employedCompany : null,
        employedDesignation: family ? family.father.employedDesignation : null,
        buisnessCompany: family ? family.father.buisnessCompany : null,
        retiredCompany: family ? family.father.retiredCompany : null,
        retiredDesignation: family ? family.father.retiredDesignation : null,
    })

    const [mother, setMother] = useState({
        name: family ? family.mother.name : null,
        status: family ? family.mother.status : null,
        employedCompany: family ? family.mother.employedCompany : null,
        employedDesignation: family ? family.mother.employedDesignation : null,
        buisnessCompany: family ? family.mother.buisnessCompany : null,
        retiredCompany: family ? family.mother.retiredCompany : null,
        retiredDesignation: family ? family.mother.retiredDesignation : null,
    })

    // Handle father status
    const onChangeFatherStatus = event => setFather({
        ...father,
        employedCompany: family ? family.father.employedCompany : null,
        employedDesignation: family ? family.father.employedDesignation : null,
        buisnessCompany: family ? family.father.buisnessCompany : null,
        retiredCompany: family ? family.father.retiredCompany : null,
        retiredDesignation: family ? family.father.retiredDesignation : null,
        status: event.target.value
    })

    // Handle mateher status
    const onChangeMotherStatus = event => setMother({
        ...mother,
        employedCompany: family ? family.mother.employedCompany : null,
        employedDesignation: family ? family.mother.employedDesignation : null,
        buisnessCompany: family ? family.mother.buisnessCompany : null,
        retiredCompany: family ? family.mother.retiredCompany : null,
        retiredDesignation: family ? family.mother.retiredDesignation : null,
        status: event.target.value
    })

    const onSubmit = async (data) => {
        try {

            const newData = {
                userId: id,
                father: father,
                mother: mother,
                familyLocation: data.familyLocation,
                nativePlace: data.nativePlace,
                numberOfBrothers: data.numberOfBrothers,
                numberOfSisters: data.numberOfSisters,
                numberOfBrothersMarried: data.numberOfBrothersMarried,
                numberOfSistersMarried: data.numberOfSistersMarried,
                familyType: data.familyType,
                familyValue: data.familyValue,
                familyAffluence: data.familyAffluence
            }

            setLoading(true)
            const response = await axios.post(`${api}admin/familyinformation/store`, newData, header)
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
                    <h6 className="mb-0">Family Information</h6>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">

                            {/* Father name */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <small>Father's name</small>
                                    <input
                                        type="text"
                                        name="fathersName"
                                        defaultValue={father.name}
                                        placeholder="Enter father's name"
                                        className="form-control rounded-0 shadow-none"
                                        onChange={(event) => setFather({ name: event.target.value })}
                                    />
                                </div>

                                {/* Father's status */}
                                <div className="form-group mb-4">
                                    <small>Father status</small>
                                    <select
                                        name="fatherStatus"
                                        className="form-control rounded-0 shadow-none"
                                        onChange={onChangeFatherStatus}
                                        ref={register()}
                                        defaultValue={father.status}
                                    >
                                        <option>Select</option>
                                        <option value="Employed">Employed</option>
                                        <option value="Business">Business</option>
                                        <option value="Retired">Retired</option>
                                        <option value="Not Employed">Not Employed</option>
                                        <option value="Passed Away">Passed Away</option>
                                    </select>
                                </div>


                                {/* Optional fields for father status */}
                                {/* Employeed */}
                                {father.status === 'Employed' ?
                                    <div>
                                        <div className="form-group mb-4">
                                            <small>With</small>
                                            <input
                                                type="text"
                                                placeholder="Company Name"
                                                className="form-control rounded-0 shadow-none"
                                                onChange={(event) => setFather({ ...father, employedCompany: event.target.value })}
                                                defaultValue={father.employedCompany}
                                            />
                                        </div>

                                        <div className="form-group mb-4">
                                            <small>As</small>
                                            <input
                                                type="text"
                                                placeholder="Designation"
                                                className="form-control rounded-0 shadow-none"
                                                onChange={(event) => setFather({ ...father, employedDesignation: event.target.value })}
                                                defaultValue={father.employedDesignation}
                                            />
                                        </div>
                                    </div>

                                    // Buisness
                                    : father.status === 'Business' ?
                                        <div className="form-group mb-4">
                                            <small>Nature of Buisness</small>
                                            <input
                                                type="text"
                                                placeholder="Example (Real Estate, Ecommerce)"
                                                className="form-control rounded-0 shadow-none"
                                                onChange={(event) => setFather({ ...father, buisnessCompany: event.target.value })}
                                                defaultValue={father.buisnessCompany}
                                            />
                                        </div>

                                        // Retired
                                        : father.status === 'Retired' ?
                                            <div>
                                                <div className="form-group mb-4">
                                                    <small>From</small>
                                                    <input
                                                        type="text"
                                                        name="retiredFrom"
                                                        className="form-control rounded-0 shadow-none"
                                                        onChange={(event) => setFather({ ...father, retiredCompany: event.target.value })}
                                                        defaultValue={father.retiredCompany}
                                                    />
                                                </div>

                                                <div className="form-group mb-4">
                                                    <small>As</small>
                                                    <input
                                                        type="text"
                                                        name="retiredDesignation"
                                                        placeholder="Designation"
                                                        className="form-control rounded-0 shadow-none"
                                                        onChange={(event) => setFather({ ...father, retiredDesignation: event.target.value })}
                                                        defaultValue={father.retiredDesignation}
                                                    />
                                                </div>
                                            </div>
                                            : null}
                            </div>

                            {/* Mother name */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <small>Mother's name</small>
                                    <input
                                        type="text"
                                        name="mothersName"
                                        placeholder="Enter mother's name"
                                        className="form-control rounded-0 shadow-none"
                                        onChange={(event) => setMother({ name: event.target.value })}
                                        defaultValue={mother.name}
                                    />
                                </div>

                                {/* Mother's status */}
                                <div className="form-group mb-4">
                                    <small>Mohter status</small>
                                    <select
                                        name="motherStatus"
                                        className="form-control rounded-0 shadow-none"
                                        onChange={onChangeMotherStatus}
                                        ref={register()}
                                        defaultValue={mother.status}
                                    >
                                        <option>Select</option>
                                        <option value="Homemaker">Homemaker</option>
                                        <option value="Employed">Employed</option>
                                        <option value="Business">Business</option>
                                        <option value="Retired">Retired</option>
                                        <option value="Passed Away">Passed Away</option>
                                    </select>
                                </div>


                                {/* Optional fields for mother status */}
                                {/* Employeed */}
                                {mother.status === 'Employed' ?
                                    <div>
                                        <div className="form-group mb-4">
                                            <small>With</small>
                                            <input
                                                type="text"
                                                placeholder="Company Name"
                                                className="form-control rounded-0 shadow-none"
                                                onChange={(event) => setMother({ ...mother, employedCompany: event.target.value })}
                                                defaultValue={mother.employedCompany}
                                            />
                                        </div>

                                        <div className="form-group mb-4">
                                            <small>As</small>
                                            <input
                                                type="text"
                                                placeholder="Designation"
                                                className="form-control rounded-0 shadow-none"
                                                onChange={(event) => setMother({ ...mother, employedDesignation: event.target.value })}
                                                defaultValue={mother.employedDesignation}
                                            />
                                        </div>
                                    </div>

                                    // Buisness
                                    : mother.status === 'Business' ?
                                        <div className="form-group mb-4">
                                            <small>Nature of Buisness</small>
                                            <input
                                                type="text"
                                                placeholder="Example (Real Estate, Ecommerce)"
                                                className="form-control rounded-0 shadow-none"
                                                onChange={(event) => setMother({ ...mother, buisnessCompany: event.target.value })}
                                                defaultValue={mother.buisnessCompany}
                                            />
                                        </div>

                                        // Retired
                                        : mother.status === 'Retired' ?
                                            <div>
                                                <div className="form-group mb-4">
                                                    <small>From</small>
                                                    <input
                                                        type="text"
                                                        name="retiredFrom"
                                                        className="form-control rounded-0 shadow-none"
                                                        onChange={(event) => setMother({ ...mother, retiredCompany: event.target.value })}
                                                        defaultValue={mother.retiredCompany}
                                                    />
                                                </div>

                                                <div className="form-group mb-4">
                                                    <small>As</small>
                                                    <input
                                                        type="text"
                                                        name="retiredDesignation"
                                                        placeholder="Designation"
                                                        className="form-control rounded-0 shadow-none"
                                                        onChange={(event) => setMother({ ...mother, retiredDesignation: event.target.value })}
                                                        defaultValue={mother.retiredDesignation}
                                                    />
                                                </div>
                                            </div>
                                            : null}
                            </div>

                            {/* Family location */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <small>Family location</small>
                                    <input
                                        type="text"
                                        name="familyLocation"
                                        placeholder="Your family location"
                                        className="form-control rounded-0 shadow-none"
                                        ref={register()}
                                        defaultValue={family ? family.familyLocation : null}
                                    />
                                </div>
                            </div>

                            {/* Native Place */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <small>Native Place</small>
                                    <input
                                        type="text"
                                        name="nativePlace"
                                        placeholder="Enter Native Place"
                                        className="form-control rounded-0 shadow-none"
                                        ref={register()}
                                        defaultValue={family ? family.nativePlace : null}
                                    />
                                </div>
                            </div>

                            {/* Number of brothers */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <small>Number of brothers</small>
                                    <input
                                        type="number"
                                        name="numberOfBrothers"
                                        placeholder="Enter Number of Brothers"
                                        className="form-control rounded-0 shadow-none"
                                        ref={register()}
                                        defaultValue={family ? family.numberOfBrothers : null}
                                    />
                                </div>
                            </div>

                            {/* Number of sisters */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <small>Number of sisters</small>
                                    <input
                                        type="number"
                                        name="numberOfSisters"
                                        placeholder="Enter Number of Sisters"
                                        className="form-control rounded-0 shadow-none"
                                        ref={register()}
                                        defaultValue={family ? family.numberOfSisters : null}
                                    />
                                </div>
                            </div>

                            {/* Number of brothers married */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <small>Number of brothers married</small>
                                    <input
                                        type="number"
                                        name="numberOfBrothersMarried"
                                        placeholder="Enter Number of brothers married"
                                        className="form-control rounded-0 shadow-none"
                                        ref={register()}
                                        defaultValue={family ? family.numberOfBrothersMarried : null}
                                    />
                                </div>
                            </div>

                            {/* Number of sisters married*/}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <small>Number of sisters married</small>
                                    <input
                                        type="number"
                                        name="numberOfSistersMarried"
                                        placeholder="Enter Number of sisters married"
                                        className="form-control rounded-0 shadow-none"
                                        ref={register()}
                                        defaultValue={family ? family.numberOfSistersMarried : null}
                                    />
                                </div>
                            </div>

                            {/* Family type */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <small>Family Type</small>
                                    <select
                                        name="familyType"
                                        className="form-control rounded-0 shadow-none"
                                        ref={register()}
                                        defaultValue={family ? family.familyType : null}
                                    >
                                        <option value="Joint">Joint</option>
                                        <option value="Nuclear">Nuclear</option>
                                    </select>
                                </div>
                            </div>

                            {/* Family Value */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <small>Family Value</small>
                                    <select
                                        name="familyValue"
                                        className="form-control rounded-0 shadow-none"
                                        ref={register()}
                                        defaultValue={family ? family.familyValue : null}
                                    >
                                        <option value="Traditional">Traditional</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Liberal">Liberal</option>
                                    </select>
                                </div>
                            </div>

                            {/* Family Affluence */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <small>Family Affluence</small>
                                    <select
                                        name="familyAffluence"
                                        className="form-control rounded-0 shadow-none"
                                        ref={register()}
                                        defaultValue={family ? family.familyAffluence : null}
                                    >
                                        <option value="Affluent">Affluent</option>
                                        <option value="Upper Middle Class">Upper Middle Class</option>
                                        <option value="Middle Class">Middle Class</option>
                                        <option value="Lower Middle Class">Lower Middle Class</option>
                                    </select>
                                </div>
                            </div>

                        </div>


                        {/* Submit Button */}
                        <div className="row">
                            <div className="col-12 text-right">
                                <button
                                    type="submit"
                                    className="btn shadow-none"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <span>Saving...</span> : <span>Save Family Info</span>}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div >
    );
};

export default FamilyInfo;