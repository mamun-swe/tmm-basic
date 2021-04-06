import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Icon from 'react-icons-kit'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ic_add } from 'react-icons-kit/md'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import BranchCreateModal from '../../components/modal/Branch'
import ReligionCreateModal from '../../components/modal/Religion'
import SocialOrderCreateModal from '../../components/modal/SocialOrder'
import SocialTitleCreateModal from '../../components/modal/SocialTitle'
import CountryCreateModal from '../../components/modal/Country'
import LanguageCreateModal from '../../components/modal/Language'

toast.configure({ autoClose: 2000 })
const PrimaryInfo = ({ email, user, updated, header }) => {
    const { register, handleSubmit, errors } = useForm()
    const [isUpdate, setUpdate] = useState(false)

    // Input states
    const [branch, setBranch] = useState({ value: null, error: null })
    const [userDOB, setUserDOB] = useState({ value: null, error: null })
    const [religion, setReligion] = useState({ value: null, error: null })
    const [socialOrder, setSocialOrder] = useState({ value: null, error: null })
    const [birthCountry, setBirthCountry] = useState({ value: null, error: null })
    const [livingCountry, setLivingCountry] = useState({ value: null })
    const [motherTongue, setMotherTongue] = useState({ value: null, error: null })
    const [spokenLanguage, setSpokenLanguage] = useState({ value: [], error: null })

    // Branch states
    const [isBranchShow, setBranchShow] = useState(false)
    const [isBranchCreated, setBranchCreated] = useState(false)
    const [branchOptions, setBranchOptions] = useState([])

    // Religion states
    const [serverReligions, setServerReligions] = useState([])
    const [religionOptions, setReligionOptions] = useState([])
    const [isReligionShow, setReligionShow] = useState(false)
    const [isCreateReligion, setCreateReligion] = useState(false)

    // Social order states
    const [isSocialOrderShow, setSocialOrderShow] = useState(false)
    const [isCreateSocialOrder, setCreateSocialOrder] = useState(false)
    const [socialOrderOptions, setSocialOrderOptions] = useState([])

    // Social title
    const [socialTitle, setSocialTitle] = useState({ show: false, value: null, options: [], loading: false })

    // Country states
    const [isCountryShow, setCountryShow] = useState(false)
    const [isCountryCreate, setCountryCreate] = useState(false)
    const [countryOptions, setCountryOptions] = useState([])

    // Language states
    const [isLanguageShow, setLanguageShow] = useState(false)
    const [isLanguageCreated, setLanguageCreated] = useState(false)
    const [languageOptions, setLanguageOptions] = useState([])


    // Get Religion
    const getReligion = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/religion`, header)
            setServerReligions(response.data.religions)
            setReligionOptions(response.data.religions.map(data => ({ label: data.name, value: data.name })))
        } catch (error) {
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
    }, [header])

    // Get social title
    const getSocialTitle = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/religion`, header)
            setSocialTitle({ ...socialTitle, options: response.data.religions.map(data => ({ label: data.name, value: data.name })) })
        } catch (error) {
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
    }, [header])


    // Get Branch
    const getBranches = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/branch`, header)
            if (response.status === 200) {
                setBranchOptions(response.data.branches.map(branch => ({ label: branch.name, value: branch._id })))
            }
        } catch (error) {
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
    }, [header])


    // Get Country
    const getCountry = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/country`, header)
            if (response.status === 200) {
                setCountryOptions(response.data.countries.map(country => ({ label: country.name, value: country.name })))
            }
        } catch (error) {
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
    }, [header])


    // Get Language
    const getLanguage = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/language/index`, header)
            if (response.status === 200) {
                setLanguageOptions(response.data.languages.map(language => ({ label: language.name, value: language.name })))
            }
        } catch (error) {
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
    }, [header])


    useEffect(() => {
        getReligion()
        getCountry()
        getSocialTitle()
        getBranches()
        getLanguage()
    }, [header, getReligion, getSocialTitle, getBranches, getCountry, getLanguage])

    // onChange branch
    const onChangeBranch = event => setBranch({ value: event.value, error: null })

    // onChange religion
    const onChangeReligion = event => {
        setReligion({ value: event.value, error: null })
        // Find single religion
        const singleReligion = serverReligions.find(religion => religion.name === event.value)
        // Set to social orders
        setSocialOrderOptions(singleReligion.socialOrders.map(data => ({ label: data, value: data })))
    }

    // OnChange social order
    const onChangeSocialOrder = event => setSocialOrder({ value: event.value, error: null })

    // OnChange social title
    const onChangeSocialTitle = event => setSocialTitle({ ...socialTitle, value: event.value })

    // OnChange Birth Country
    const onChangeBirthCountry = event => setBirthCountry({ value: event.value, error: null })

    // OnChange Living Country
    const onChangeLivingCountry = event => setLivingCountry({ value: event.value, error: null })

    // OnChange Mother Toungue
    const onChangeMotherTongue = event => setMotherTongue({ value: event.value, error: null })

    // OnChange Spoken Language
    const onChangeSpokenLanguage = event => setSpokenLanguage({ value: event, error: null })

    // Create Branch
    const createBranch = async (data) => {
        try {
            setBranchCreated(true)
            const response = await axios.post(`${api}admin/branch`, data, header)
            if (response.status === 201) {
                getBranches()
                setBranchCreated(false)
                setBranchShow(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setBranchCreated(false)
                toast.warn(error.response.data.message)
            }
        }
    }

    // Create Religion
    const createReligion = async (data) => {
        try {
            setCreateReligion(true)
            const response = await axios.post(`${api}admin/religion`, data, header)
            if (response.status === 201) {
                getReligion()
                setCreateReligion(false)
                setReligionShow(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setCreateReligion(false)
                setReligionShow(false)
                toast.warn(error.response.data.message)
            }
        }
    }

    // Create Social Order
    const createSocialOrder = async (data) => {
        try {
            setCreateSocialOrder(true)
            const response = await axios.post(`${api}admin/religion/socialorder`, data, header)
            if (response.status === 201) {
                getReligion()
                setCreateSocialOrder(false)
                setSocialOrderShow(false)
                toast.success(response.data.message)
            }

        } catch (error) {
            if (error) {
                setCreateSocialOrder(false)
                toast.warn(error.response.data.message)
            }
        }
    }

    // Create social title
    const createSocialTitle = async data => {
        try {
            console.log(data)
            setSocialTitle({ ...socialTitle, show: true, options: data, loading: true })

            setTimeout(() => {
                setSocialTitle({ ...socialTitle, show: false, value: null, loading: true })
            }, 2000);

        } catch (error) {
            if (error) {
                setSocialTitle({ ...socialTitle, show: false, value: null, loading: false })
                toast.warn(error.response.data.message)
            }
        }
    }


    // Create Country
    const createCountry = async (data) => {
        try {
            setCountryCreate(true)
            const response = await axios.post(`${api}admin/country`, data, header)
            if (response.status === 201) {
                getCountry()
                setCountryCreate(false)
                setCountryShow(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setCountryCreate(false)
                toast.warn(error.response.data.message)
            }
        }
    }


    // Create Language
    const createLanguage = async (data) => {
        try {
            setLanguageCreated(true)
            const response = await axios.post(`${api}admin/language/store`, data, header)
            if (response.status === 201) {
                getLanguage()
                setLanguageCreated(false)
                setLanguageShow(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setLanguageCreated(false)
                toast.warn(error.response.data.message)
            }
        }
    }


    // Submit Registration Data
    const onSubmit = async (data) => {

        // Check Branch
        if ((branch.value === "") && (user.baranchId === "")) {
            setBranch({ error: true })
            return false
        }

        // Check DOB
        if ((userDOB.value === null || userDOB.value === "" || userDOB.value === undefined) && (user.userDOB === null || user.userDOB === "" || user.userDOB === undefined)) {
            setUserDOB({ error: true })
            return false
        }

        // Check Religion
        if ((religion.value === null || religion.value === "" || religion.value === undefined) && (user.religion === null || user.religion === "" || user.religion === undefined)) {
            setReligion({ error: true })
            return false
        }

        // Check Social Order
        if ((socialOrder.value === null || socialOrder.value === "" || socialOrder.value === undefined) && (user.socialOrder === null || user.socialOrder === "" || user.socialOrder === undefined)) {
            setSocialOrder({ error: true })
            return false
        }

        // Check Birth Country
        if ((birthCountry.value === null || birthCountry.value === "" || birthCountry.value === undefined) && (user.birthCountry === null || user.birthCountry === "" || user.birthCountry === undefined)) {
            setBirthCountry({ error: true })
            return false
        }

        // Check Mother Toungue
        if ((motherTongue.value === null || motherTongue.value === "" || motherTongue.value === undefined) && (user.language.motherTongue === null || user.language.motherTongue === "" || user.language.motherTongue === undefined)) {
            setMotherTongue({ error: true })
            return false
        }


        const primaryData = {
            ...data,
            email: email,
            baranchId: branch.value ? branch.value : user.baranchId,
            religion: religion.value ? religion.value : user.religion,
            dob: userDOB.value ? userDOB.value : user.dob,
            socialOrder: socialOrder.value ? socialOrder.value : user.socialOrder,
            socialTitle: socialTitle.value ? socialTitle.value : user.socialTitle,
            birthCountry: birthCountry.value ? birthCountry.value : user.birthCountry,
            livingCountry: livingCountry.value ? livingCountry.value : user.livingCountry,
            motherTongue: motherTongue.value ? motherTongue.value : user.language.motherTongue,
            spokenLanguage: spokenLanguage.value ? spokenLanguage.value.map(data => data.value) : null
        }

        try {
            setUpdate(true)
            const response = await axios.put(`${api}admin/user/primaryinfo/update`, primaryData, header)
            if (response.status === 201) {
                updated(true)
                setUpdate(false)
                toast.success(response.data.message)
            }

        } catch (error) {
            if (error) {
                setUpdate(false)
                toast.warn(error.response.data.message)
            }
        }
    }

    // Check Max Age is < 18
    const maxAge = () => {
        const dateNow = new Date()
        const yearNow = dateNow.getFullYear()
        const lastAge = `${yearNow - 18}`
        return lastAge
    }

    return (
        <div>
            {/* Form 1 */}
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Branch */}
                <div className="row">
                    <div className="col-12 col-lg-4 ml-auto">
                        <div className="form-group mb-4">
                            {branch.error ?
                                <small className="text-danger">Branch is required.</small>
                                : <small>Branch</small>
                            }

                            <div className="d-flex">
                                <div className="flex-fill">
                                    <Select
                                        value={{ value: user.baranchId, label: 'TMM Dhaka' }}
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Select branch'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={branchOptions}
                                        onChange={onChangeBranch}
                                    />
                                </div>
                                <div className="pl-2 pt-1">
                                    <button
                                        type="button"
                                        style={customStyles.smBtn}
                                        className="btn shadow-none rounded-circle p-1"
                                        onClick={() => setBranchShow(true)}
                                    >
                                        <Icon icon={ic_add} size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                                defaultValue={user.name}
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
                                defaultValue={user.phone}
                                className={errors.phone ? "form-control shadow-none danger-border" : "form-control shadow-none"}
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
                            <small>E-mail</small>
                            <input
                                type="text"
                                disabled
                                defaultValue={user.email}
                                className="form-control shadow-none"
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
                                defaultValue={user.gender}
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
                                defaultValue={user.lookingFor}
                            >
                                <option value="bride">Bride</option>
                                <option value="groom">Groom</option>
                            </select>
                        </div>
                    </div>

                    {/* DOB */}
                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            {userDOB.error ? (
                                <small className="text-danger">Date of birth is required*</small>
                            ) : <small>Date of birth</small>}

                            <div>
                                <DatePicker
                                    selected={Date.parse(user.dob || userDOB.value)}
                                    onChange={date => setUserDOB({ value: date, error: null })}
                                    maxDate={new Date(maxAge(), 1, 1)}
                                    showDisabledMonthNavigation
                                    className={errors.dob ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Religion */}
                    <div className="col-12 col-lg-4">

                        <div className="form-group mb-4">
                            {religion.error ?
                                <small className="text-danger">Religion is required.</small>
                                : <small>Religion</small>
                            }

                            <div className="d-flex">
                                <div className="flex-fill">
                                    <Select
                                        defaultValue={{ value: user.religion, label: user.religion }}
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Select religion'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={religionOptions}
                                        onChange={onChangeReligion}
                                    />
                                </div>
                                <div className="pl-2 pt-1">
                                    <button
                                        type="button"
                                        style={customStyles.smBtn}
                                        className="btn shadow-none rounded-circle p-1"
                                        onClick={() => setReligionShow(true)}
                                    >
                                        <Icon icon={ic_add} size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social order */}
                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            {socialOrder.error ?
                                <small className="text-danger">Social order is required.</small>
                                : <small>Social order</small>
                            }

                            <div className="d-flex">
                                <div className="flex-fill">
                                    <Select
                                        defaultValue={{ value: user.socialOrder, label: user.socialOrder }}
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Social order'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={socialOrderOptions}
                                        onChange={onChangeSocialOrder}
                                    />
                                </div>
                                <div className="pl-2 pt-1">
                                    <button
                                        type="button"
                                        style={customStyles.smBtn}
                                        className="btn shadow-none rounded-circle p-1"
                                        onClick={() => setSocialOrderShow(true)}
                                    >
                                        <Icon icon={ic_add} size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social title */}
                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <small>Social title</small>

                            <div className="d-flex">
                                <div className="flex-fill">
                                    <Select
                                        // defaultValue={{ value: user.socialOrder, label: user.socialOrder }}
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Social order'}
                                        cSocialTitleCreateModalomponents={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={socialTitle.options}
                                        onChange={onChangeSocialTitle}
                                    />
                                </div>
                                <div className="pl-2 pt-1">
                                    <button
                                        type="button"
                                        style={customStyles.smBtn}
                                        className="btn shadow-none rounded-circle p-1"
                                        onClick={() => setSocialTitle({ ...socialTitle, show: true })}
                                    >
                                        <Icon icon={ic_add} size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Birth Country */}
                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            {birthCountry.error ?
                                <small className="text-danger">Birth country is required.</small>
                                : <small>Birth country</small>
                            }

                            <div className="d-flex">
                                <div className="flex-fill">
                                    <Select
                                        defaultValue={{ value: user.birthCountry, label: user.birthCountry }}
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Select birth country'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={countryOptions}
                                        onChange={onChangeBirthCountry}
                                    />
                                </div>
                                <div className="pl-2 pt-1">
                                    <button
                                        type="button"
                                        style={customStyles.smBtn}
                                        className="btn shadow-none rounded-circle p-1"
                                        onClick={() => setCountryShow(true)}
                                    >
                                        <Icon icon={ic_add} size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Living Country */}
                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <small>Living country</small>

                            <div className="d-flex">
                                <div className="flex-fill">
                                    <Select
                                        defaultValue={{ value: user.livingCountry, label: user.livingCountry }}
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Social order'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={countryOptions}
                                        onChange={onChangeLivingCountry}
                                    />
                                </div>
                                <div className="pl-2 pt-1">
                                    <button
                                        type="button"
                                        style={customStyles.smBtn}
                                        className="btn shadow-none rounded-circle p-1"
                                        onClick={() => setCountryShow(true)}
                                    >
                                        <Icon icon={ic_add} size={22} />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Mother tounge  */}
                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            {motherTongue.error ?
                                <small className="text-danger">Mother toungue is required.</small>
                                : <small>Mother tounge</small>
                            }

                            <div className="d-flex">
                                <div className="flex-fill">
                                    <Select
                                        defaultValue={{ value: user.language.motherTongue, label: user.language.motherTongue }}
                                        classNamePrefix="custom-select"
                                        styles={customStyles}
                                        placeholder={'Select mother tounge'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={languageOptions}
                                        onChange={onChangeMotherTongue}
                                    />
                                </div>
                                <div className="pl-2 pt-1">
                                    <button
                                        type="button"
                                        style={customStyles.smBtn}
                                        className="btn shadow-none rounded-circle p-1"
                                        onClick={() => setLanguageShow(true)}
                                    >
                                        <Icon icon={ic_add} size={22} />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Spoken language  */}
                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <small>Spoken language</small>

                            <div className="d-flex">
                                <div className="flex-fill">
                                    <Select
                                        defaultValue={user.language.spokenLanguage ? user.language.spokenLanguage.map(item => ({ value: item, label: item })) : null}
                                        isMulti
                                        styles={customStyles}
                                        classNamePrefix="custom-select"
                                        placeholder={'Select spoken language'}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        options={languageOptions}
                                        onChange={onChangeSpokenLanguage}
                                    />
                                </div>
                                <div className="pl-2 pt-1">
                                    <button
                                        type="button"
                                        style={customStyles.smBtn}
                                        className="btn shadow-none rounded-circle p-1"
                                        onClick={() => setLanguageShow(true)}
                                    >
                                        <Icon icon={ic_add} size={22} />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="btn shadow-none"
                        disabled={isUpdate}
                    >
                        {isUpdate ? <span>Updating...</span> : <span>Update</span>}
                    </button>
                </div>
            </form>

            {/* Modals */}

            {/* Branch create modal */}
            {isBranchShow ?
                <BranchCreateModal
                    show={isBranchShow}
                    newdata={createBranch}
                    countries={countryOptions}
                    isCreate={isBranchCreated}
                    onHide={() => setBranchShow(false)}
                />
                : null}

            {/* Religion create modal */}
            {isReligionShow ?
                <ReligionCreateModal
                    show={isReligionShow}
                    newdata={createReligion}
                    isCreate={isCreateReligion}
                    onHide={() => setReligionShow(false)}
                />
                : null}

            {/* Social order create modal */}
            {isSocialOrderShow ?
                <SocialOrderCreateModal
                    show={isSocialOrderShow}
                    religions={religionOptions}
                    newdata={createSocialOrder}
                    isCreate={isCreateSocialOrder}
                    onHide={() => setSocialOrderShow(false)}
                />
                : null}

            {/* Social title modal */}
            {socialTitle.show ?
                <SocialTitleCreateModal
                    show={socialTitle.show}
                    create={createSocialTitle}
                    loading={socialTitle.loading}
                    onHide={() => setSocialTitle({ show: false, value: null, loading: false })}
                />
                : null}

            {/* Country create modal */}
            {isCountryShow ?
                <CountryCreateModal
                    show={isCountryShow}
                    newdata={createCountry}
                    isCreate={isCountryCreate}
                    onHide={() => setCountryShow(false)}
                />
                : null}

            {/* Language create modal  */}
            {isLanguageShow ?
                <LanguageCreateModal
                    show={isLanguageShow}
                    newdata={createLanguage}
                    isCreate={isLanguageCreated}
                    onHide={() => setLanguageShow(false)}
                />
                : null}
        </div>
    );
}

export default PrimaryInfo;

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        height: 42,
        fontSize: 14,
        color: '#000',
        boxShadow: 'none', '&:hover': { borderColor: '1px solid #ced4da' },
        border: state.isFocused ? '1px solid #dfdfdf' : '1px solid #ced4da',
        borderRadius: 0
    }),
    smBtn: {
        width: 33,
        height: 34,
    }
}