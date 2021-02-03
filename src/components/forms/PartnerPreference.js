import React, { useEffect, useState } from 'react'
import './style.scss'
import 'antd/dist/antd.css'
import axios from 'axios'
import { Slider } from 'antd'
import Select from 'react-select'
import { api } from '../../utils/api'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({ autoClose: 2000 })
const PartnerPreference = ({ email }) => {
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(false)

    // Input States
    const [ageRange, setAgeRange] = useState({ startFrom: 18, endTo: 40 })
    const [heightRange, setHeightRange] = useState({ startFrom: 4, endTo: 6 })
    const [materialStatus, setMaterialStatus] = useState([])
    const [religion, setReligion] = useState([])
    const [socialOrder, setSocialOrder] = useState([])
    const [motherTounge, setMotherTounge] = useState(null)
    const [spokenLanguages, setSpokenLanguages] = useState([])

    // Material Options
    const materialStatusOptions = [
        { label: 'Never married', value: 'never_married' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Annulled', value: 'annulled' },
        { label: 'Widowed', value: 'widowed' }
    ]

    // Religion options
    const [religionOptions, setReligionOptions] = useState([])

    // Social order options
    const [socialOrderOptions, setSocialOrderOptions] = useState([])

    // Language options
    const [languageOptions, setLanguageOptions] = useState([])

    // Diet options
    const dietOptions = [
        { label: 'Open to all', value: 'open_to_all' },
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

    useEffect(() => {
        // Get Religion
        const getPartnerPreferenceInfo = async () => {
            try {
                const response = await axios.get(`${api}admin/user/partner-preference/info`)
                setReligionOptions(response.data.religions.map(religion => ({ label: religion, value: religion })))
                setSocialOrderOptions(response.data.socialOrders.map(order => ({ label: order, value: order })))
                setLanguageOptions(response.data.languages.map(language => ({ label: language, value: language })))
                console.log(response.data)

            } catch (error) {
                if (error) {
                    toast.warn(error.response.data.message)
                }
            }
        }

        getPartnerPreferenceInfo()
    }, [])

    // After age change
    const onAfterAgeChange = value => setAgeRange({ startFrom: value[0], endTo: value[1] })

    // After height change
    const onAfterHeightChange = value => setHeightRange({ startFrom: value[0], endTo: value[1] })

    // On change material status handle
    const onChangeMaterialStatus = event => setMaterialStatus({ value: event })

    // On change religion handle
    const onChangeReligion = event => setReligion({ value: event })

    // On change social order
    const onChangeSocialOrder = event => setSocialOrder({ value: event })

    // On change mother tounge
    const onChangeMotherTounge = event => setMotherTounge(event.value)

    // On change spoken language
    const onChangeSpokenLanguages = event => setSpokenLanguages({ value: event })



    // Submit data to API
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const newData = {
                ...data,
                ageRange,
                heightRange,
                materialStatus: materialStatus.value ? materialStatus.value.map(data => data.value) : null,
                religion: religion.value ? religion.value.map(data => data.value) : null,
                socialOrder: socialOrder.value ? socialOrder.value.map(data => data.value) : null,
                motherTounge,
                spokenLanguages: spokenLanguages.value ? spokenLanguages.value.map(data => data.value) : null,
            }

            console.log(newData)
            setTimeout(() => setLoading(false), 1000)
        } catch (error) {
            if (error) console.log(error.response)
        }
    }

    return (
        <div className="partner-preference">
            <div className="card border-0 my-lg-4">
                <div className="card-header bg-white">
                    <h6 className="mb-0">Partner preference</h6>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">

                            {/* Age Range */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <p>Age range ({ageRange.startFrom}-{ageRange.endTo})</p>
                                    <Slider
                                        range
                                        min={18}
                                        max={50}
                                        defaultValue={[ageRange.startFrom, ageRange.endTo]}
                                        onAfterChange={onAfterAgeChange}
                                    />
                                </div>
                            </div>

                            {/* Height Range */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <p>Height range ({heightRange.startFrom}-{heightRange.endTo})</p>
                                    <Slider
                                        range
                                        min={4}
                                        max={7}
                                        defaultValue={[heightRange.startFrom, heightRange.endTo]}
                                        onAfterChange={onAfterHeightChange}
                                    />
                                </div>
                            </div>

                            {/* Material status */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <p>Material status</p>

                                    <Select
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={materialStatusOptions}
                                        onChange={onChangeMaterialStatus}
                                    />
                                </div>
                            </div>

                            {/* Religion */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <p>Religion</p>

                                    <Select
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={religionOptions}
                                        onChange={onChangeReligion}
                                    />
                                </div>
                            </div>

                            {/* Social order */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <p>Social order</p>

                                    <Select
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={socialOrderOptions}
                                        onChange={onChangeSocialOrder}
                                    />
                                </div>
                            </div>

                            {/* Mother tounge */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <p>Mother tounge</p>

                                    <Select
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={languageOptions}
                                        onChange={onChangeMotherTounge}
                                    />
                                </div>
                            </div>

                            {/* Spoken language */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <p>Spoken language</p>

                                    <Select
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={languageOptions}
                                        onChange={onChangeSpokenLanguages}
                                    />
                                </div>
                            </div>

                            {/* location */}

                            {/* Country */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <p>Country</p>

                                    <Select
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={languageOptions}
                                        onChange={onChangeSpokenLanguages}
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
                                    {isLoading ? <span>Adding...</span> : <span>Submit</span>}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PartnerPreference;

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