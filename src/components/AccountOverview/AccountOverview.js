import React from 'react'
import "./AccountOverview.scss"

const AccountOverview = ({ user }) => {
    return (
        <div className="account-overview">
            <h1>Account Overview</h1>
            <h3>Profile</h3>
            <table>
                <tr>
                    <th>
                        <span>Name</span>
                    </th>
                    <th>
                        <p>{user.name}</p>
                    </th>
                </tr>
                <tr>
                    <th>
                        <span>Email</span>
                    </th>
                    <th>
                        <p>{user.email}</p>
                    </th>
                </tr>
            </table>
        </div>
    )
}

export default AccountOverview