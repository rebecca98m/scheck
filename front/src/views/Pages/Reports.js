import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import useReport from "../../Controller/Report/ReportController";
import {Fab, Pagination, Stack, Typography} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReportCard from "../components/ReportCard";

const Reports = () => {
    const {reports, getAll} = useReport();

    const [itemsPerPage, setItemsPerPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(itemsPerPage !== null) {
            getAll(currentPage, itemsPerPage);
        }
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const reportCardWidth = 300;
            const reportCardHeight = 200;

            const itemsPerRow = Math.floor(width / reportCardWidth)-1;
            const itemsPerColumn = Math.floor(height / reportCardHeight) ;

            const newItemsPerPage = itemsPerRow * itemsPerColumn;

            setItemsPerPage(newItemsPerPage);
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);


    return (
        <>
            <Typography variant="h2" sx={{mb:2}}>Report salvati</Typography>

                {

                    reports && reports.result && reports.result.data.length > 0 ?
                        <>
                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap sx={{flexWrap: 'wrap', width:'100%', marginTop:2, marginBottom:1}}>
                                {
                                    reports.result.data.map(report => (
                                        <ReportCard key={report.id} report={report}></ReportCard>
                                    ))}

                            </Stack>
                            {
                                reports.result.last_page > 1 &&
                                <Pagination count={reports.result.last_page} onChange={(event, value) => {setCurrentPage(value)}} sx={{margin: 'auto',
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
