import React from 'react';

const AddressForm = (props) => {
    return (
        <div>
            <h5><span>1</span>Shipping Info:</h5>
            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <label>First Name</label><input />
                </div>
                <div className="form-group">
                    <label>Last Name</label><input />
                </div>
                <div className="form-group">
                    <label>Address Line 1</label><input />
                </div>
                <div className="form-group">
                    <label>Address Line 2 (optional)</label><input />
                </div>
                <div className="form-group">
                    <label>City</label><input />
                </div>
                <div className="form-group">
                    <label>State</label><input />
                </div>
                <div className="form-group">
                    <label>Postal Code</label><input />
                </div>
                <div className="form-group">
                    <label>Phone Number</label><input />
                </div>
                <div className="form-group">
                    <label>Order Comments</label><input />
                </div>
                <button
                    type="submit"
                    className="btn btn-info"
                >Submit Order </button>
            </form>
        </div>
    )
}
export default AddressForm