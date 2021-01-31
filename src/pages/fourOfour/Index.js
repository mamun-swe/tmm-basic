import React from 'react'
import './style.scss'
import { Images } from '../../utils/Images'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div className="four-o-four">
            <div className="flex-center flex-column">
                <img src={Images.fourOfour} className="img-fluid" alt="..." />
                <p className="mb-0">What are you looking ?</p>
                <h5 className="mb-4">Page not found.</h5>
                <Link
                    to="/"
                    type="button"
                    className="btn shadow-none"
                >Back to Home</Link>
            </div>
        </div>
    );
}

export default Index;