import { getCookie } from "../utilities/cookie";

export function Save(props) {
    if (props.data.length === 0) {
        return null;
    }

    const handleSave = () => {
        fetch("/save", {
            method: "POST",
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            mode: "same-origin",
            body: JSON.stringify(props.data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });

        props.updateSave(true);
    };

    const trimmedFileName = props.fileName.replace(new RegExp(/\.[^/.]+$/), "");

    return (
        <div className="save-container">
            <div>
                <button onClick={handleSave} disabled={props.saved}>
                    Save
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
