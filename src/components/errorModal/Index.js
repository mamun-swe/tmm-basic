import React, { useEffect } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/api'
import { useHistory } from 'react-router-dom'

const Index = ({ message, header }) => {
    const history = useHistory()

    useEffect(() => {
        const doLogout = async () => {
            try {
                const response = await axios.get(`${api}admin/auth/logout`, header)
                if (response.status === 200) {
                    localStorage.clear()
                    history.push('/')
                }
            } catch (error) {
                if (error) {
                    localStorage.clear()
                    history.push('/')
                }
            }
        }

        setTimeout(() => {
            doLogout()
        }, 2000);
    }, [header, history])

    return (
        <div className="error-modal-container">
            <div className="flex-center flex-column">
                <div className="card border-0 shadow">
                    <h6>{message.data.message}</h6>
                    <h4 className="mb-0">Logging out...</h4>
                </div>
            </div>
        </div>
    );
}

export default Index;