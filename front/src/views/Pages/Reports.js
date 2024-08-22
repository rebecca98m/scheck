import React, { useState, useEffect } from 'react'
import { endLoad, startLoad } from '../../utils/utils';
import {Link} from "react-router-dom";
import useReport from "../../Controller/Report/ReportController";

const Reports = () => {
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const {reports, getAll} = useReport();

    useEffect(() => {
        getAll();

    }, []);

    return (
        <>
            <h1>Report salvati</h1>
            {

                    reports && reports.result && reports.result.length > 0 ?
                        reports.result.map(report => (
                            <Link to={'/reports/details/' + report.id} key={report.id}> {report.title} {report.type} </Link>
                        )) :
                        <p>Nessun report da mostrare</p>
            }



            <Link className="button" to="/reports/new">Nuovo report</Link>
        </>
    )
};

export default Reports;
