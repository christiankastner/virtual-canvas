import React from 'react'

const AccountOverview = ({ name, email }) => {
    return (
        <div className="account-overview">
            <h1>Account Overview</h1>
            <h3>Profile</h3>
            <table>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        {name}
                    </th>
                </tr>
                <tr>
                    <th>
                        Email
                    </th>
                    <th>
                        {email}
                    </th>
                </tr>
            </table>
        </div>
    )
}

export default AccountOverview