import {useState} from "react";
import ReportController from "../../Controller/Report/ReportController";


const NewReport = () => {
    const [input, setInput] = useState({
        title: "",
        type: "battelle",
    })
    const { newReport } = ReportController();
    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if(input.title !=="") {
            newReport(input);
            return;
        }
        alert("Inserisci un titolo valido");
    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev)=> ({
            ...prev,
            [name]:value,
        }));
    };

    return (
        <form onSubmit={handleSubmitEvent}>
            <div className="form_control">
                <label> Titolo
                    <input
                        type="text"
                        id="report-title"
                        name="title"
                        aria-describedby="report-title"
                        aria-invalid="false"
                        onChange={handleInput}
                    />
                </label>
            </div>
            <div className="form_control">

                <label>
                    Metodo:
                    <select name="type" defaultValue="battelle" onChange={handleInput}>
                        <option value="battelle">Battelle</option>
                        <option value="ahp">AHP</option>
                    </select>
                </label>
            </div>
            <button className="btn-submit">Submit</button>
        </form>
    );
};

export default NewReport;

