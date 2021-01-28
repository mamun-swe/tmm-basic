import React, { useState, useEffect } from 'react'
import './style.scss'
import axios from 'axios'
import Select from 'react-select'
import Icon from 'react-icons-kit'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Images } from '../../utils/Images'
import { ic_add } from 'react-icons-kit/md'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useParams } from 'react-router-dom'

import BranchCreateModal from '../../components/modal/Branch'
import ReligionCreateModal from '../../components/modal/Religion'
import SocialOrderCreateModal from '../../components/modal/SocialOrder'
import CountryCreateModal from '../../components/modal/Country'
import LanguageCreateModal from '../../components/modal/Language'

import PictureAndDescUpdateForm from '../../components/forms/ProfilePictureDescription'
import BasicAndLifestyleUpdateForm from '../../components/forms/BasicAndLifestyle'
import ContactInfoCreateForm from '../../components/forms/ContactInformation'
import HobbiForm from '../../components/forms/Hobbi'
import InterestForm from '../../components/forms/Interests'
import MusicForm from '../../components/forms/FavouriteMusic'

toast.configure({ autoClose: 2000 })
const Edit = () => {
    const { register, handleSubmit, errors } = useForm()
    const { email } = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const [isLoading, setLoading] = useState(true)

    // Input states
    const [branch, setBranch] = useState({ value: null, error: null })
    const [religion, setReligion] = useState({ value: null, error: null })
    const [socialOrder, setSocialOrder] = useState({ value: null, error: null })
    const [birthCountry, setBirthCountry] = useState({ value: null, error: null })
    const [livingCountry, setLivingCountry] = useState({ value: null })
    const [motherTongue, setMotherTongue] = useState({ value: null, error: null })
    const [spokenLanguage, setSpokenLanguage] = useState({ value: [], error: null })
    const [user, setUser] = useState({})

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

    // Country states
    const [isCountryShow, setCountryShow] = useState(false)
    const [isCountryCreate, setCountryCreate] = useState(false)
    const [countryOptions, setCountryOptions] = useState([])

    // Language states
    const [isLanguageShow, setLanguageShow] = useState(false)
    const [isLanguageCreated, setLanguageCreated] = useState(false)
    const [languageOptions, setLanguageOptions] = useState([])

    useEffect(() => {
        // Fetch User
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${api}admin/show/${email}`)
                if (response.status === 200) {
                    setLoading(false)
                    setUser(response.data.user)
                    console.log(response.data.user)
                }
            } catch (error) {
                if (error) {
                    console.log(error.response)
                    toast.warn(error.response.data.message)
                }
            }
        }

        fetchUser()
        getReligion()
        getCountry()
        getBranches()
        getLanguage()
    }, [email])


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

    // OnChange Birth Country
    const onChangeBirthCountry = event => setBirthCountry({ value: event.value, error: null })

    // OnChange Living Country
    const onChangeLivingCountry = event => setLivingCountry({ value: event.value, error: null })

    // OnChange Mother Toungue
    const onChangeMotherTongue = event => setMotherTongue({ value: event.value, error: null })

    // OnChange Spoken Language
    const onChangeSpokenLanguage = event => setSpokenLanguage({ value: event, error: null })


    // Get Branch
    const getBranches = async () => {
        try {
            const response = await axios.get(`${api}admin/branch`)
            if (response.status === 200) {
                setBranchOptions(response.data.branches.map(branch => ({ label: branch.name, value: branch._id })))
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    // Create Branch
    const createBranch = async (data) => {
        try {
            setBranchCreated(true)
            const response = await axios.post(`${api}admin/branch`, data)
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

    // Get Religion
    const getReligion = async () => {
        try {
            const response = await axios.get(`${api}admin/religion`)
            setServerReligions(response.data.religions)
            setReligionOptions(response.data.religions.map(data => ({ label: data.name, value: data.name })))
        } catch (error) {
            if (error) {
                toast.warn(error.response.data.message)
            }
        }
    }

    // Create Religion
    const createReligion = async (data) => {
        try {
            setCreateReligion(true)
            const response = await axios.post(`${api}admin/religion`, data)
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
            const response = await axios.post(`${api}admin/religion/socialorder`, data)
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

    // Get Country
    const getCountry = async () => {
        try {
            const response = await axios.get(`${api}admin/country`)
            if (response.status === 200) {
                setCountryOptions(response.data.countries.map(country => ({ label: country.name, value: country.name })))
            }
        } catch (error) {
            if (error) {
                toast.warn(error.response.data.message)
            }
        }
    }

    // Create Country
    const createCountry = async (data) => {
        try {
            setCountryCreate(true)
            const response = await axios.post(`${api}admin/country`, data)
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

    // Get Language
    const getLanguage = async () => {
        try {
            const response = await axios.get(`${api}admin/language/index`)
            if (response.status === 200) {
                setLanguageOptions(response.data.languages.map(language => ({ label: language.name, value: language.name })))
            }
        } catch (error) {
            if (error) console.log(error.response)
        }
    }

    // Create Language
    const createLanguage = async (data) => {
        try {
            setLanguageCreated(true)
            const response = await axios.post(`${api}admin/language/store`, data)
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
        if (!branch.value) return setBranch({ error: true })

        // Check Religion
        if (!religion.value) return setReligion({ error: true })

        // Check Social Order
        if (!socialOrder.value) return setSocialOrder({ error: true })

        // Check Birth Country
        if (!birthCountry.value) return setBirthCountry({ error: true })

        // Check Mother Toungue
        if (!motherTongue.value) return setMotherTongue({ error: true })

        const regData = {
            ...data,
            branch: branch.value,
            religion: religion.value,
            socialOrder: socialOrder.value,
            birthCountry: birthCountry.value,
            livingCountry: livingCountry.value ? livingCountry.value : null,
            motherTongue: motherTongue.value,
            spokenLanguage: spokenLanguage.value ? spokenLanguage.value : null
        }

        console.log(regData)
        // setUpdate(true)
        // toast.success('Successfully account updated.')
    }

    // if loading
    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="user-edit">
            <div className="card">
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
                <div className="card-body p-4">

                    {/* Form 1 */}
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="row">
                            {/* Branch */}
                            <div className="col-12 col-lg-4 ml-auto">
                                <div className="form-group mb-4">
                                    {branch.error ?
                                        <small className="text-danger">Branch is required.</small>
                                        : <small>Branch</small>
                                    }

                                    <div className="d-flex">
                                        <div className="flex-fill">
                                            <Select
                                                classNamePrefix="custom-select"
                                                styles={customStyles}
                                                placeholder={'Select branch'}
                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                options={branchOptions}
                                                onChange={onChangeBranch}
                                            // defaultOptions={{ value: user.birthCountry, label: user.birthCountry }}
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
                                        defaultValue={user.name ? user.name : null}
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
                                        defaultValue={user.phone ? user.phone : null}
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
                                        defaultValue={user.email ? user.email : null}
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

                                    <div className="d-flex">
                                        <div className="flex-fill">
                                            <Select
                                                classNamePrefix="custom-select"
                                                styles={customStyles}
                                                placeholder={'Select religion'}
                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                options={religionOptions}
                                                onChange={onChangeReligion}
                                            // defaultOptions={{ value: user.religion, label: user.religion }}
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
                                                classNamePrefix="custom-select"
                                                styles={customStyles}
                                                placeholder={'Select birth country'}
                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                options={countryOptions}
                                                onChange={onChangeBirthCountry}
                                                defaultOptions={{ value: user.birthCountry, label: user.birthCountry }}
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

                </div>
            </div>

            {/* Profile Picture & Description form */}
            <PictureAndDescUpdateForm email={email} />

            {/* Basic and lifestyle information form */}
            <BasicAndLifestyleUpdateForm email={email} basicandlifeinfo={user.basicAndLifestyleInformation ? user.basicAndLifestyleInformation : null} />

            {/* Contact information form */}
            <ContactInfoCreateForm email={email} contact={user.contactInformation ? user.contactInformation : null} />

            {/* Personal activities */}
            <div className="card my-lg-4">
                <div className="card-header bg-white">
                    <h6 className="mb-0">Personal Activities</h6>
                </div>
                <div className="card-body p-4">
                    <div className="row">

                        {/* Hobbi create form */}
                        <div className="col-12 col-lg-6 pr-lg-4 border-bottom pb-4 mb-4">
                            <HobbiForm email={email} />
                        </div>

                        {/* Interests create form */}
                        <div className="col-12 col-lg-6 pl-lg-4 border-bottom pb-4 mb-4">
                            <InterestForm email={email} />
                        </div>

                        {/* Music create form */}
                        <div className="col-12 col-lg-6 pl-lg-4 border-bottom pb-4 mb-4">
                            <MusicForm email={email} />
                        </div>

                    </div>
                </div>
            </div>




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
    }),
    smBtn: {
        width: 33,
        height: 34,
    }
}