import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import 'antd/dist/antd.css'
import axios from 'axios'
import { Slider } from 'antd'
import Select from 'react-select'
import { api } from '../../utils/api'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md'
import 'react-toastify/dist/ReactToastify.css'
import CreatableSelect from 'react-select/creatable'

// Create modals
import QualificationModal from '../modal/Qualification'
import WorkingWithModal from '../modal/WorkingWith'
import ProfessionAreaModal from '../modal/ProfessionArea'

toast.configure({ autoClose: 2000 })
const PartnerPreference = ({ email, updated, preference, header }) => {
    const { handleSubmit } = useForm()
    const [isLoading, setLoading] = useState(false)

    // Modal states
    const [showQualification, setShowQualification] = useState(false)
    const [isQualificationCreated, setQualificationCreated] = useState(false)
    const [showWorkingWith, setShowWorkingWith] = useState(false)
    const [isWorkingWithCreated, setWorkingWithCreated] = useState(false)
    const [showProfessionArea, setShowProfessionArea] = useState(false)
    const [isProfessionAreaCreated, setProfessionAreaCreated] = useState(false)

    // Input States
    const [ageRange, setAgeRange] = useState({
        startFrom: preference ? preference.ageRange.startFrom : 18,
        endTo: preference ? preference.ageRange.endTo : 40
    })
    const [heightRange, setHeightRange] = useState({
        startFrom: preference ? preference.heightRange.startFrom : 4,
        endTo: preference ? preference.heightRange.endTo : 6
    })
    const [materialStatus, setMaterialStatus] = useState([])
    const [religion, setReligion] = useState([])
    const [socialOrder, setSocialOrder] = useState([])
    const [motherTounge, setMotherTounge] = useState(null)
    const [spokenLanguages, setSpokenLanguages] = useState([])
    const [countries, setCountries] = useState([])
    const [stateDivision, setStateDivision] = useState([])
    const [city, setCity] = useState([])

    const [qualifications, setQualifications] = useState([])
    const [workingWith, setWorkingWith] = useState([])
    const [professionArea, setProfessionArea] = useState([])
    const [annualIncome, setAnnualIncome] = useState({
        startFrom: preference ? preference.annualIncome.startFrom : 40000,
        endTo: preference ? preference.annualIncome.endTo : 60000
    })
    const [diet, setDiet] = useState([])
    const [bloodGroup, setBloodGroup] = useState([])
    const [healthInformation, setHealthInformation] = useState([])
    const [disability, setDisability] = useState([])

    // Material Options
    const materialStatusOptions = [
        { label: 'Never married', value: 'never married' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Annulled', value: 'annulled' },
        { label: 'Widowed', value: 'widowed' }
    ]

    // Options states
    const [religionOptions, setReligionOptions] = useState([])
    const [socialOrderOptions, setSocialOrderOptions] = useState([])
    const [languageOptions, setLanguageOptions] = useState([])
    const [countryOptions, setCountryOptions] = useState([])
    const [qualificationOptions, setQualificationOptions] = useState([])
    const [workingWithOptions, setWorkingWithOptions] = useState([])
    const [professionAreaOptions, setProfessionAreaOptions] = useState([])
    const dietOptions = [
        { label: 'Open to all', value: 'open to all' },
        { label: 'veg', value: 'veg' },
        { label: 'non-veg', value: 'non-veg' },
        { label: 'vegan', value: 'vegan' }
    ]
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
    const healthInfOptions = [
        { label: 'No Health Problem', value: 'No Health Problem' },
        { label: 'HIV positive', value: 'HIV positive' },
        { label: 'Diabetes', value: 'Diabetes' },
        { label: 'Low BP', value: 'Low BP' },
        { label: 'Hight BP', value: 'Hight BP' },
        { label: 'Heart Aliments)', value: 'ABHeart Aliments' },
        { label: 'Other', value: 'Other' },
    ]
    const disabilityOptions = [
        { label: 'None', value: 'none' },
        { label: 'Physical disability', value: 'physical disability' }
    ]

    // Get partner preference
    const getPartnerPreferenceInfo = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/user/partner-preference/info`, header)
            setReligionOptions(response.data.religions.map(religion => ({ label: religion, value: religion })))
            setSocialOrderOptions(response.data.socialOrders.map(order => ({ label: order, value: order })))
            setLanguageOptions(response.data.languages.map(language => ({ label: language, value: language })))
            setCountryOptions(response.data.countries.map(country => ({ label: country, value: country })))
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }, [header])

    // Get Qualification
    const getQualification = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/qualification`, header)
            if (response.status === 200) {
                setQualificationOptions(response.data.qualifications.map(qualification => ({ label: qualification.title, value: qualification.title })))
            }
        } catch (error) {
            if (error) {
                if (error) {
                    toast.error(`${error.response.data.message}`, {
                        position: "bottom-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            }
        }
    }, [header])

    // Get working with
    const getWorkingWith = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/working-with`, header)
            if (response.status === 200) {
                setWorkingWithOptions(response.data.works.map(work => ({ label: work.title, value: work.title })))
            }
        } catch (error) {
            if (error) {
                if (error) {
                    toast.error(`${error.response.data.message}`, {
                        position: "bottom-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            }
        }
    }, [header])

    // Get profession area
    const getProfessionArea = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/profession`, header)
            if (response.status === 200) {
                setProfessionAreaOptions(response.data.professions.map(profession => ({ label: profession.title, value: profession.title })))
            }
        } catch (error) {
            if (error) {
                if (error) {
                    toast.error(`${error.response.data.message}`, {
                        position: "bottom-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            }
        }
    }, [header])


    useEffect(() => {
        getPartnerPreferenceInfo()
        getQualification()
        getWorkingWith()
        getProfessionArea()
    }, [header, getPartnerPreferenceInfo, getQualification, getWorkingWith, getProfessionArea])

    // On Change methods
    const onAfterAgeChange = value => setAgeRange({ startFrom: value[0], endTo: value[1] })
    const onAfterHeightChange = value => setHeightRange({ startFrom: value[0], endTo: value[1] })
    const onChangeMaterialStatus = event => setMaterialStatus({ value: event })
    const onChangeReligion = event => setReligion({ value: event })
    const onChangeSocialOrder = event => setSocialOrder({ value: event })
    const onChangeMotherTounge = event => setMotherTounge(event.value)
    const onChangeSpokenLanguages = event => setSpokenLanguages({ value: event })
    const onChangeCountries = event => setCountries({ value: event })
    const onChangeStateDivision = event => setStateDivision({ value: event })
    const onChangeCity = event => setCity({ value: event })

    const onChangeQualification = event => setQualifications({ value: event })
    const onChangeWorkingWith = event => setWorkingWith({ value: event })
    const onChangeProfessionArea = event => setProfessionArea({ value: event })
    const onChangeAnnualIncome = value => setAnnualIncome({ startFrom: value[0], endTo: value[1] })
    const onChangeDiet = event => setDiet({ value: event })
    const onChangeBloodGroup = event => setBloodGroup({ value: event })
    const onChangeHealthInfo = event => setHealthInformation({ value: event })
    const onChangeDisability = event => setDisability({ value: event })

    // Create Qualification
    const createQualification = async (data) => {
        try {
            setQualificationCreated(true)
            const response = await axios.post(`${api}admin/qualification/store`, data, header)
            if (response.status === 201) {
                getQualification()
                setQualificationCreated(false)
                setShowQualification(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setQualificationCreated(false)
                toast.warn(error.response.data.message)
            }
        }
    }

    // Create working with
    const createWorkingWith = async (data) => {
        try {
            setWorkingWithCreated(true)
            const response = await axios.post(`${api}admin/working-with/store`, data, header)
            if (response.status === 201) {
                getWorkingWith()
                setWorkingWithCreated(false)
                setShowWorkingWith(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setWorkingWithCreated(false)
                toast.warn(error.response.data.message)
            }
        }
    }

    // Create profession area
    const createProfessionArea = async (data) => {
        try {
            setProfessionAreaCreated(true)
            const response = await axios.post(`${api}admin/profession/store`, data, header)
            if (response.status === 201) {
                getProfessionArea()
                setProfessionAreaCreated(false)
                setShowProfessionArea(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setProfessionAreaCreated(false)
                toast.warn(error.response.data.message)
            }
        }
    }

    // Submit data to API
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const newData = {
                email,
                ...data,
                ageRange,
                heightRange,
                materialStatus: materialStatus.value ? materialStatus.value.map(data => data.value) : preference ? preference.materialStatus : null,
                religion: religion.value ? religion.value.map(data => data.value) : preference ? preference.religion : null,
                socialOrder: socialOrder.value ? socialOrder.value.map(data => data.value) : preference ? preference.socialOrder : null,
                motherTounge: motherTounge ? motherTounge : preference ? preference.motherTounge : null,
                spokenLanguages: spokenLanguages.value ? spokenLanguages.value.map(data => data.value) : preference ? preference.spokenLanguages : null,
                country: countries.value ? countries.value.map(data => data.value) : preference ? preference.location.country : null,
                stateDivision: stateDivision.value ? stateDivision.value.map(data => data.value) : preference ? preference.location.stateDivision : null,
                city: city.value ? city.value.map(data => data.value) : preference ? preference.location.city : null,

                qualifications: qualifications.value ? qualifications.value.map(data => data.value) : preference ? preference.educationAndProfession.qualification : null,
                workingWith: workingWith.value ? workingWith.value.map(data => data.value) : preference ? preference.educationAndProfession.workingWith : null,
                professionArea: professionArea.value ? professionArea.value.map(data => data.value) : preference ? preference.educationAndProfession.professionArea : null,
                annualIncome,

                diet: diet.value ? diet.value.map(data => data.value) : preference ? preference.diet : null,
                bloodGroup: bloodGroup.value ? bloodGroup.value.map(data => data.value) : preference ? preference.bloodGroup : null,
                healthInformation: healthInformation.value ? healthInformation.value.map(data => data.value) : preference ? preference.healthInformation : null,
                disability: disability.value ? disability.value.map(data => data.value) : preference ? preference.disability : null
            }

            const response = await axios.post(`${api}admin/partnerpreference/create`, newData, header)
            if (response.status === 201) {
                updated(true)
                setLoading(false)
                toast.success(response.data.message)
            }

        } catch (error) {
            if (error) {
                setLoading(false)
                console.log(error.response)
                toast.warn(error.response.message)
            }
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
                                        defaultValue={preference ? preference.materialStatus && preference.materialStatus.map(item => ({ value: item, label: item })) : null}
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
                                        defaultValue={preference ? preference.religion && preference.religion.map(item => ({ value: item, label: item })) : null}
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
                                        defaultValue={preference ? preference.socialOrder && preference.socialOrder.map(item => ({ value: item, label: item })) : null}
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
                                        defaultValue={preference && preference.motherTounge ? { value: preference.motherTounge, label: preference.motherTounge } : null}
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
                                        defaultValue={preference && preference.spokenLanguages ? preference.spokenLanguages.map(item => ({ value: item, label: item })) : null}
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={languageOptions}
                                        onChange={onChangeSpokenLanguages}
                                    />
                                </div>
                            </div>

                            {/* partner location */}

                            {/* Country */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <p>Country</p>

                                    <Select
                                        defaultValue={preference ? preference.location.country && preference.location.country.map(item => ({ value: item, label: item })) : null}
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={countryOptions}
                                        onChange={onChangeCountries}
                                    />
                                </div>
                            </div>

                            {/* State / Division */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <p>State / Division</p>

                                    <CreatableSelect
                                        defaultValue={preference ? preference.location.stateDivision && preference.location.stateDivision.map(item => ({ value: item, label: item })) : null}
                                        isMulti
                                        styles={customStyles}
                                        onChange={onChangeStateDivision}
                                    />
                                </div>
                            </div>

                            {/* City */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    <p>City</p>

                                    <CreatableSelect
                                        defaultValue={preference ? preference.location.city && preference.location.city.map(item => ({ value: item, label: item })) : null}
                                        isMulti
                                        styles={customStyles}
                                        onChange={onChangeCity}
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <h6>Education & Profession</h6>
                            </div>

                            {/* Qualification */}
                            <div className="col-12">
                                <div className="form-group mb-4">
                                    <p>Qualification</p>

                                    <div className="d-flex">
                                        <div className="flex-fill">
                                            <Select
                                                defaultValue={preference ? preference.educationAndProfession.qualification &&
                                                    preference.educationAndProfession.qualification.map(item => ({ value: item, label: item }))
                                                    : null}
                                                classNamePrefix="custom-select"
                                                isMulti
                                                styles={customStyles}
                                                placeholder={'Select qualification'}
                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                options={qualificationOptions}
                                                onChange={onChangeQualification}
                                            />
                                        </div>
                                        <div className="pl-2 pt-1">
                                            <button
                                                type="button"
                                                style={customStyles.smBtn}
                                                className="btn shadow-none rounded-circle p-1"
                                                onClick={() => setShowQualification(true)}
                                            >
                                                <Icon icon={ic_add} size={22} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Working with */}
                            <div className="col-12">
                                <div className="form-group mb-4">
                                    <p>Working with</p>

                                    <div className="d-flex">
                                        <div className="flex-fill">
                                            <Select
                                                defaultValue={preference ? preference.educationAndProfession.workingWith &&
                                                    preference.educationAndProfession.workingWith.map(item => ({ value: item, label: item }))
                                                    : null}
                                                classNamePrefix="custom-select"
                                                isMulti
                                                styles={customStyles}
                                                placeholder={'Select working area'}
                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                options={workingWithOptions}
                                                onChange={onChangeWorkingWith}
                                            />
                                        </div>
                                        <div className="pl-2 pt-1">
                                            <button
                                                type="button"
                                                style={customStyles.smBtn}
                                                className="btn shadow-none rounded-circle p-1"
                                                onClick={() => setShowWorkingWith(true)}
                                            >
                                                <Icon icon={ic_add} size={22} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profession area */}
                            <div className="col-12">
                                <div className="form-group mb-4">
                                    <p>Profession area</p>

                                    <div className="d-flex">
                                        <div className="flex-fill">
                                            <Select
                                                defaultValue={
                                                    preference ? preference.educationAndProfession.professionArea &&
                                                        preference.educationAndProfession.professionArea.map(item => ({ value: item, label: item }))
                                                        : null}
                                                classNamePrefix="custom-select"
                                                isMulti
                                                styles={customStyles}
                                                placeholder={'Select profession area'}
                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                options={professionAreaOptions}
                                                onChange={onChangeProfessionArea}
                                            />
                                        </div>
                                        <div className="pl-2 pt-1">
                                            <button
                                                type="button"
                                                style={customStyles.smBtn}
                                                className="btn shadow-none rounded-circle p-1"
                                                onClick={() => setShowProfessionArea(true)}
                                            >
                                                <Icon icon={ic_add} size={22} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Annual Income */}
                            <div className="col-12">
                                <div className="fprm-group">
                                    <p>Annual Income ({annualIncome.startFrom} USD - {annualIncome.endTo} USD)</p>
                                    <Slider
                                        range
                                        min={1000}
                                        max={500000}
                                        defaultValue={[annualIncome.startFrom, annualIncome.endTo]}
                                        onAfterChange={onChangeAnnualIncome}
                                    />
                                </div>
                            </div>

                            {/* Diet */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <p>Diet</p>

                                    <Select
                                        defaultValue={preference ? preference.diet && preference.diet.map(item => ({ value: item, label: item })) : null}
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={dietOptions}
                                        onChange={onChangeDiet}
                                    />
                                </div>
                            </div>

                            {/* Blood Group */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <p>Blood Group</p>
                                    <Select
                                        defaultValue={preference ? preference.bloodGroup && preference.bloodGroup.map(item => ({ value: item, label: item })) : null}
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={bloodGroupOptions}
                                        onChange={onChangeBloodGroup}
                                    />
                                </div>
                            </div>

                            {/* Health information */}
                            <div className="col-12">
                                <div className="form-group mb-4">
                                    <p>Health information</p>
                                    <Select
                                        defaultValue={preference ? preference.healthInformation && preference.healthInformation.map(item => ({ value: item, label: item })) : null}
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={healthInfOptions}
                                        onChange={onChangeHealthInfo}
                                    />
                                </div>
                            </div>

                            {/* Disability */}
                            <div className="col-12">
                                <div className="form-group mb-4">
                                    <p>Disability</p>
                                    <Select
                                        defaultValue={preference ? preference.disability && preference.disability.map(item => ({ value: item, label: item })) : null}
                                        classNamePrefix="custom-select"
                                        isMulti
                                        styles={customStyles}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={disabilityOptions}
                                        onChange={onChangeDisability}
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

            {/* Qualification create modal */}
            {showQualification ?
                <QualificationModal
                    show={showQualification}
                    isCreate={isQualificationCreated}
                    newdata={createQualification}
                    onHide={() => setShowQualification(false)}
                />
                : null}

            {/* Working with create modal */}
            <WorkingWithModal
                show={showWorkingWith}
                isCreate={isWorkingWithCreated}
                newdata={createWorkingWith}
                onHide={() => setShowWorkingWith(false)}
            />

            {/* Profession area create modal */}
            <ProfessionAreaModal
                show={showProfessionArea}
                isCreate={isProfessionAreaCreated}
                newdata={createProfessionArea}
                onHide={() => setShowProfessionArea(false)}
            />


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