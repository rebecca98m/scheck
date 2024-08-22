import React, { useState, useEffect } from 'react'
import {Link, useNavigation, useParams} from "react-router-dom";
import useReport from "../../Controller/Report/ReportController";

const Report = () => {
    const {reportDetails, getReportDetails} = useReport();
    const {id} = useParams();


    useEffect(() => {
        getReportDetails(id);
    }, [id]);

    return (
        <>
            <h1>{reportDetails && reportDetails.result ? reportDetails.result.title : "caricamento"}</h1>

            {
                reportDetails && reportDetails.result && reportDetails.result.element_values.length > 0 ?
                    reportDetails.result.element_values.map(value => (
                        <p>{value.element.name}: {value.magnitude} | {value.correlation_level}</p>

                    )) :
                    <p>Nessun valore da mostrare</p>
            }

        </>
    )
};

export default Report;
