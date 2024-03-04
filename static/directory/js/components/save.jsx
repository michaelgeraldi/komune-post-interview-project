/* eslint-disable no-unused-vars */
import { getCookie } from "../utilities/cookie";
import { useState } from "react";

export function Save(props) {
    const [button, setButton] = useState({
        text: "Save",
        buttonClass: ""
    });

    if (props.data.length === 0) {
        return null;
    }

    const handleSave = () => {
        props.updateSave(true);
        setButton({
            text: "Saving...",
            buttonClass: "button-loading",
        });

        fetch("/save", {
            method: "POST",
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            mode: "same-origin",
            body: JSON.stringify(props.data),
        })
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    setButton({
                        text: "Saved!",
                        buttonClass: "button-success",
                    });
                    setTimeout(() => {
                        setButton({text: "Save", buttonClass: ""});
                    }, 2000);
                }, 2000);
            });
    };

    const trimmedFileName = props.fileName.replace(new RegExp(/\.[^/.]+$/), "");

    return (
        <div className="save-container">
            <div>
                <button
                    onClick={handleSave}
                    disabled={props.saved}
                    className={button.buttonClass}
                >
                    {button.text}
                </button>
            </div>
            <div>
                <a href={"/download"} download={`${trimmedFileName}.json`}>
                    <button disabled={!props.saved}>Download</button>
                </a>
            </div>
        </div>
    );
}
