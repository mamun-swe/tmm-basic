import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import { Slider } from 'antd'
import Select from 'react-select'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import { Icon } from 'react-icons-kit'
import { useForm } from 'react-hook-form'
import { ic_add } from 'react-icons-kit/md'

// Create modals
import QualificationModal from '../modal/Qualification'
import WorkingWithModal from '../modal/WorkingWith'
import ProfessionAreaModal from '../modal/ProfessionArea'

toast.configure({ autoClose: 2000 })
const EducationProfession = ({ email, header, educationAndProfession, income }) => {
    const { handleSubmit } = useForm()
    const [isLoading, setLoading] = useState(false)
    // Input States
    const [annualIncome, setAnnualIncome] = useState({
        startFrom: income ? income.startFrom : 0,
        endTo: income ? income.endTo : 100000
    })

    const [qualification, setQualification] = useState({ value: null, error: null })
    const [workingWith, setWorkingWith] = useState({ value: null, error: null })
    const [professionArea, setProfessionArea] = useState({ value: null, error: null })

    // Modal states
    const [showQualification, setShowQualification] = useState(false)
    const [isQualificationCreated, setQualificationCreated] = useState(false)
    const [showWorkingWith, setShowWorkingWith] = useState(false)
    const [isWorkingWithCreated, setWorkingWithCreated] = useState(false)
    const [showProfessionArea, setShowProfessionArea] = useState(false)
    const [isProfessionAreaCreated, setProfessionAreaCreated] = useState(false)

    // Options states
    const [qualificationOptions, setQualificationOptions] = useState([])
    const [workingWithOptions, setWorkingWithOptions] = useState([])
    const [professionAreaOptions, setProfessionAreaOptions] = useState([])

    const onChangeAnnualIncome = value => setAnnualIncome({ startFrom: value[0], endTo: value[1] })

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
        getQualification()
        getWorkingWith()
        getProfessionArea()
    }, [header, getQualification, getWorkingWith, getProfessionArea])

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
    const onSubmit = async () => {
        try {
            // Check qualification
            if ((qualification.value === null || qualification.value === "" || qualification.value === undefined) &&
                (educationAndProfession.qualification === null || educationAndProfession.qualification === "" || educationAndProfession.qualification === undefined)
            ) {
                setQualification({ value: null, error: true })
                return
            }

            // Check workingWith
            if ((workingWith.value === null || workingWith.value === "" || workingWith.value === undefined) &&
                (educationAndProfession.workingWith === null || educationAndProfession.workingWith === "" || educationAndProfession.workingWith === undefined)
            ) {
                setWorkingWith({ value: null, error: true })
                return
            }

            // Check professionArea
            if ((professionArea.value === null || professionArea.value === "" || professionArea.value === undefined) &&
                (educationAndProfession.professionArea === null || educationAndProfession.professionArea === "" || educationAndProfession.professionArea === undefined)
            ) {
                setProfessionArea({ value: null, error: true })
                return
            }

            setLoading(true)
            const newData = {
                email,
                qualification: qualification.value ? qualification.value : educationAndProfession.qualification,
                workingWith: workingWith.value ? workingWith.value : educationAndProfession.workingWith,
                professionArea: professionArea.value ? professionArea.value : educationAndProfession.professionArea,
                annualIncome
            }

            const response = await axios.post(`${api}admin/user/education-profession`, newData, header)
            if (response.status === 201) {
                setLoading(false)
                toast.success(response.data.message)
            }

        } catch (error) {
            if (error) {
                setLoading(false)
                toast.warn(error.response.message)
            }
        }
    }

    return (
        <div>
            <div className="card my-lg-4">
                <div className="card-header bg-white">
                    <h6 className="mb-0">Education & Profession</h6>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Qualification */}
                        <div className="col-12">
                            <div className="form-group mb-4">
                                {qualification.error ? <p className="text-danger">Qualification is required.</p>
                                    : <p>Qualification</p>}

                                <div className="d-flex">
                                    <div className="flex-fill">
                                        <Select
                                            defaultValue={educationAndProfession ? { value: educationAndProfession.qualification, label: educationAndProfession.qualification } : null}
                                            classNamePrefix="custom-select"
                                            styles={customStyles}
                                            placeholder={'Select qualification'}
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            options={qualificationOptions}
                                            onChange={(event) => setQualification({ value: event.value, error: null })}
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
                                {workingWith.error ? <p className="text-danger">Working with is required.</p>
                                    : <p>Working with</p>}

                                <div className="d-flex">
                                    <div className="flex-fill">
                                        <Select
                                            defaultValue={educationAndProfession ? { value: educationAndProfession.workingWith, label: educationAndProfession.workingWith } : null}
                                            classNamePrefix="custom-select"
                                            styles={customStyles}
                                            placeholder={'Select working area'}
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            options={workingWithOptions}
                                            onChange={(event) => setWorkingWith({ value: event.value, error: null })}
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
                                {professionArea.error ? <p className="text-danger">Profession area is required.</p>
                                    : <p>Profession area</p>}

                                <div className="d-flex">
                                    <div className="flex-fill">
                                        <Select
                                            defaultValue={educationAndProfession ? { value: educationAndProfession.professionArea, label: educationAndProfession.professionArea } : null}
                                            classNamePrefix="custom-select"
                                            styles={customStyles}
                                            placeholder={'Select profession area'}
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            options={professionAreaOptions}
                                            onChange={(event) => setProfessionArea({ value: event.value, error: null })}
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
                        <div className="col-12 mb-4">
                            <div className="fprm-group">
                                <p>Annual Income ({annualIncome.startFrom} USD - {annualIncome.endTo} USD)</p>
                                <Slider
                                    range
                                    min={0}
                                    max={500000}
                                    defaultValue={[annualIncome.startFrom, annualIncome.endTo]}
                                    onAfterChange={onChangeAnnualIncome}
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

export default EducationProfession;
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