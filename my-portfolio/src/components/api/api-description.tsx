import React from 'react'

export default function APIDescription() {
    return (
        <div>
            <p className='mt-[1.25rem] text-xl font-bold pb-[0.25rem]'>
                Description:
            </p>
            <p>
                A web API, or Application Programming Interface serves as an interface for the back-end and front-end of an application to communicate. This is done by creating a series of endpoints that allows the front-end to query/create/modify data in a stateless and secure manner. A similar interface may also be provided to end-users directly to make queries on a set of data.
                REST defines a set of constraints for the API to follow.
            </p>
        </div>
    )
}