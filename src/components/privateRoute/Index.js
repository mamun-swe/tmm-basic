import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkIfLoggedIn } from '../../utils/Authenticate'

export default function PrivateRoute({ props, children, ...rest }) {
    const loggedIn = checkIfLoggedIn()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn && loggedIn.role === rest.role ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                from: location
                            }}
                        />
                    )
            }
        />
    )
}