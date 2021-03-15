import React, { createRef, useEffect, useState, useCallback } from "react";
import "./style.scss";
import axios from "axios";
import Icon from "react-icons-kit";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../../../utils/api";
import { Images } from "../../../utils/Images";
import Skeleton from "react-loading-skeleton";
import { loadC } from 'react-icons-kit/ionicons';
import { ic_create, ic_lock, ic_add } from "react-icons-kit/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({ autoClose: 2000 })
const Index = () => {
    const refs = createRef()
    const history = useHistory()
    const [page, setPage] = useState(0)
    const fakeArr = [...Array(30).keys()]
    const windowWidth = window.innerWidth
    const [users, setUsers] = useState([])
    const { register, handleSubmit } = useForm()
    const [isLoading, setLoading] = useState(true)
    const [isLoggingOut, setLoggingOut] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState(users)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })

    console.log(header);

    // Fetch Users
    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin/user/index?_page=${page}&_limit=36`, header)
            if (response.status === 200) {
                setUsers(prevUsers => ([...prevUsers, ...response.data.users]))
                setFilteredUsers(prevUsers => ([...prevUsers, ...response.data.users]))
                setLoading(false)
            }
        } catch (error) {
            if (error) {
                toast.error(error.response.data.message + ' Logging out.')
                setTimeout(() => {
                    localStorage.clear()
                    history.push('/')
                }, 1000)
            }
        }
    }, [page, history, header])

    useEffect(() => {
        fetchUsers()
    }, [page, fetchUsers])

    // Submit to filter user
    const onSubmit = async (data) => {
        try {
            // Find from loaded data
            const result = users.filter((x) => x.email.toLowerCase().includes(data.query.toLowerCase()));
            if (result && result.length > 0) {
                setFilteredUsers(result);
            } else {
                // Find from server
                const serverResult = await axios.get(`${api}admin/user/search?query=${data.query}`, header);
                if (serverResult.status === 200 && serverResult.data) {
                    setFilteredUsers(serverResult.data);
                } else {
                    setFilteredUsers(result);
                }
            }
        } catch (error) {
            if (error) {
                toast.error(error.response.data.message)
            }
        }
    }

    // Logout
    const doLogout = () => {
        setLoggingOut(true)
        localStorage.clear()
        setTimeout(() => {
            setLoggingOut(false)
            history.push('/')
        }, 1000)
    }

    // On change filter
    const filterHandle = (event) => {
        const value = event.target.value;
        if (!value) {
            setLoading(true);
            fetchUsers();
        }
    }

    // is loading from fetch API data
    if (isLoading) {
        return (<div className="users-index">
            <div className="container-fluid py-3 py-lg-4">
                <div className="row"> {/* Search */}
                    <div className="col-12 search-column">
                        <div className="card border-0"></div>
                    </div>

                    {/* Users */}
                    <div className="col-12 px-2 profile-column"> {/* User Card */}
                        {fakeArr.map((i) => (
                            <div className="card border-0" key={i}>
                                <div className="card-body text-center">
                                    <div className="photo-container rounded-circle">
                                        <Skeleton circle={true}
                                            animation={true}
                                            count={1}
                                            width={90}
                                            height={90} />
                                    </div>
                                    <div className="content-container"
                                        ref={refs}>
                                        <Skeleton className="mb-1"
                                            animation={true}
                                            count={1}
                                            width={refs.innerWidth}
                                            height={28} />
                                        <Skeleton animation={true}
                                            count={1}
                                            width={windowWidth > 576 ? 150 : 80}
                                            height={20} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>);
    }


    return (
        <div className="users-index">
            <div className="container-fluid py-3 py-lg-4">
                <div className="row">
                    {/* Search */}
                    <div className="col-12 search-column">
                        <div className="text-center">
                            <h3 className="mb-3">{users.length}Users</h3>
                        </div>

                        <div className="card border-0">
                            <div className="d-flex">
                                <div className="flex-fill">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="query"
                                                className="form-control shadow-none border-0"
                                                placeholder="Search user by e-mail"
                                                ref={register()}
                                                onChange={filterHandle}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Users */}
                    <div className="col-12 px-2 profile-column"> {/* User Card */}
                        <InfiniteScroll
                            dataLength={filteredUsers.length}
                            next={() => setPage(page + 1)}
                            hasMore={true}
                        >
                            {filteredUsers && filteredUsers.length > 0 ?
                                (filteredUsers.map((user, i) => (
                                    <div className="card border-0" key={i}>
                                        <div className="card-body text-center">
                                            <div className="photo-container rounded-circle">
                                                <img
                                                    src={user.profilePicture.clearImage ? user.profilePicture.clearImage : Images.Logo2}
                                                    className="img-fluid"
                                                    alt="..."
                                                />
                                            </div>
                                            <div className="content-container">
                                                <h6 className="text-capitalize">{user.name ? user.name : null}</h6>
                                                <p> {user.email ? user.email : null}</p>
                                            </div>
                                            <Link to={`/dashboard/user/${user.email}`}
                                                type="button"
                                                className="btn shadow-none rounded-circle">
                                                <Icon icon={ic_create} size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                                ) : (
                                    <div className="text-center four-o-four py-4">
                                        <img
                                            src={Images.NoData}
                                            className="img-fluid"
                                            alt="..."
                                        />
                                        <h5>Not data found !!</h5>
                                    </div>)
                            } </InfiniteScroll>
                    </div>
                </div>
            </div>

            {/* Float add button */}
            <Link
                to="/dashboard/create"
                type="button"
                className="btn float-add-btn shadow-lg rounded-circle"
            ><Icon icon={ic_add} size={22} /></Link>

            {/* Float logout button */}
            {isLoggingOut ? <Icon icon={loadC} className="spin" size={40} /> :
                <button
                    type="button"
                    className="btn float-logout-btn shadow-lg rounded-circle"
                    onClick={doLogout}
                >
                    <Icon icon={ic_lock} size={20} />
                </button>
            }
        </div>
    );
};

export default Index;
