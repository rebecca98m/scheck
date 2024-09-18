import {useState} from "react";
import ReportController from "../../Controller/Report/ReportController";
import {useNavigate, useNavigation, useParams} from "react-router-dom";


const NewReport = () => {
    const [input, setInput] = useState({
        title: "",
        type: "battelle",
    })
    const { newReport } = ReportController();
    const navigate = useNavigate();
    const {projectid} = useParams();
    const handleSubmitEvent = (e) => {
        e.preventDefault();
        input.project_id = projectid;
        if(input.title !=="") {
            newReport(input).then(() => {
                if(projectid !== undefined) {
                    navigate("/projects/details/" + projectid);
                }
                else {
                    navigate("/reports");
                }

            })
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

