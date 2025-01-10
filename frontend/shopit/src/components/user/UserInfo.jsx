function UserInfo({ userInfo }) {

    return (
        <div className="row m-4">
            <div className="col-md-3 py-3 card">
                <img src="" alt="user profile" className="img-fluid rounded-circle mb-3 mx-auto" />
                <h4>{userInfo.first_name} {userInfo.last_name}</h4>
                <p className="text-muted">{userInfo.email}</p>
                <button className="btn mt-2">Edit</button>
            </div>
            <div className="col-md-9">
                <div className="card">
                    <div className="card-header">
                        <h5>Account Overview</h5>

                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p>
                                    <strong>Full Name:</strong> {userInfo.first_name} {userInfo.last_name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {userInfo.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {userInfo.phone}
                                </p>

                            </div>
                            <div className="col-md-6">
                                <p>
                                    <strong>City:</strong> {userInfo.city}
                                </p>
                                <p>
                                    <strong>Country:</strong> {userInfo.state}
                                </p>
                                <p>
                                    <strong>Member since:</strong> {userInfo.date_joined}
                                </p>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default UserInfo;