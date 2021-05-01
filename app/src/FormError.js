import React from "react";

function FormErrors(props) {
    console.log(props);
    let keycnt = 0;
    if (props.formerrors !== null && props.formerrors.length > 0) {
        return (
            <div className="error container help is-danger">
                <div className="row justify-content-center">
                    <ul>
                        {props.formerrors.map(msg => <li key={keycnt++}>{msg}</li>)}
                    </ul>
                </div>
            </div>
        );
    } else {
        return (<div />);
    }
}

export default FormErrors;