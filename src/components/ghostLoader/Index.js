import React, { createRef } from 'react'
import Skeleton from 'react-loading-skeleton'

const Index = () => {
    const refs = createRef()
    const fakeArr = [...Array(9).keys()]

    return (
        <div>
            <div className="card mb-4">
                <div className="card-header bg-white p-4">
                    <div className="d-md-flex">
                        <div>
                            <Skeleton
                                animation={true}
                                count={1}
                                width={250}
                                height={35} />
                            <br />
                            <Skeleton
                                animation={true}
                                count={1}
                                width={160}
                                height={20} />
                        </div>
                        <div className="ml-auto">
                            <Skeleton
                                animation={true}
                                count={1}
                                width={150}
                                height={55} />
                        </div>
                    </div>
                </div>

                <div className="card-body p-4">
                    <div className="row">
                        <div className="col-12 col-lg-4 ml-auto mb-4">
                            <div className="d-flex justify-content-end">
                                <div>
                                    <Skeleton
                                        animation={true}
                                        count={1}
                                        width={300}
                                        height={45} />
                                </div>
                                <div>
                                    <Skeleton
                                        className="ml-2 mt-2"
                                        circle={true}
                                        animation={true}
                                        count={1}
                                        width={35}
                                        height={35} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {fakeArr.map((i) => (
                            <div className="col-12 col-lg-4 mb-4" key={i} ref={refs}>
                                <Skeleton
                                    animation={true}
                                    count={1}
                                    width={refs.innerWidth}
                                    height={45} />
                            </div>
                        ))}

                        <div className="col-12 text-right">
                            <Skeleton
                                animation={true}
                                count={1}
                                width={150}
                                height={45} />
                        </div>
                    </div>

                </div>
            </div>

            <div className="card">
                <div className="card-body p-4">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <Skeleton
                                animation={true}
                                count={1}
                                width={200}
                                height={45} />
                        </div>

                        {fakeArr.map((i) => (
                            <div className="col-12 col-lg-4 mb-4" key={i} ref={refs}>
                                <Skeleton
                                    animation={true}
                                    count={1}
                                    width={refs.innerWidth}
                                    height={45} />
                            </div>
                        ))}

                        <div className="col-12 text-right">
                            <Skeleton
                                animation={true}
                                count={1}
                                width={150}
                                height={45} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Index;