import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import useReport from "../../Controller/Report/ReportController";
import {Fab, Pagination, Stack, Typography} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReportCard from "../components/ReportCard";

const Reports = () => {
    const {reports, getAll} = useReport();

    useEffect(() => {
        getAll();
    }, []);

    const handleChange = (event, value) => {
        getAll(value)
    };


    return (
        <>
            <Typography variant="h2" sx={{mb:2}}>Report salvati</Typography>

                {

                    reports && reports.result && reports.result.data.length > 0 ?
                        <>
                            <Stack spacing={{ xs: 1, sm: 4 }} direction="row" useFlexGap sx={{flexWrap: 'wrap', justifyContent: 'center'}}>
                                {
                                    reports.result.data.map(report => (
                                        <ReportCard report={report}></ReportCard>
                                    ))}

                            </Stack>
                            {
                                reports.result.last_page > 1 &&
                                <Pagination count={reports.result.last_page} onChange={handleChange} sx={{margin: 'auto',
                                    marginTop: '1em'}} />
                            }

                        </>
                         :
                        <p>Nessun report da mostrare</p>
                }





            <Link className="button-right" to="/reports/new"><Fab color="primary"><AddRoundedIcon/></Fab></Link>
        </>
    )
};

export default Reports;
