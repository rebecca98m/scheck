import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import useReport from "../../Controller/Report/ReportController";
import {Divider, Fab, InputAdornment, Pagination, Stack, Typography} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReportCard from "../components/ReportCard";
import CableRoundedIcon from "@mui/icons-material/CableRounded";
import useProject from "../../Controller/Project/ProjectController";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Back from "../components/Back";

const Reports = () => {
    const { connectableReports, project, getConnectableReports, getReportsFromProject } = useProject();
    const {connect, disconnect} = useReport();
    const { id } = useParams();

    const [itemsPerPage, setItemsPerPage] = useState(null);
    const [currentPageConnected, setCurrentPageConnected] = useState(1);
    const [currentPageConnectable, setCurrentPageConnectable] = useState(1);
    const [searchText, setSearchText] = useState(null);

    useEffect(() => {
        if(itemsPerPage !== null) {
            getReportsFromProject(id, currentPageConnected, itemsPerPage, searchText);
            getConnectableReports(currentPageConnectable, itemsPerPage, searchText);
        }

    }, [id, itemsPerPage]);

    useEffect(() => {
        if(itemsPerPage !== null) {
            setCurrentPageConnectable(prev => prev === 1 ? 0 : 1);
            setCurrentPageConnected(prev => prev === 1 ? 0 : 1);
        }

    }, [searchText]);

    useEffect(() => {
        if(itemsPerPage !== null) {
            getReportsFromProject(id, currentPageConnected, itemsPerPage, searchText);
        }

    }, [currentPageConnected]);

    useEffect(() => {
        if(itemsPerPage !== null) {
            getConnectableReports(currentPageConnectable, itemsPerPage, searchText);
        }

    }, [currentPageConnectable]);


    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const reportCardWidth = 300;
            const reportCardHeight = 200;

            const itemsPerRow = Math.floor(width / reportCardWidth)-1;
            const itemsPerColumn = Math.floor(height / reportCardHeight) ;

            const newItemsPerPage = Math.floor(itemsPerRow * itemsPerColumn /2);

            setItemsPerPage(newItemsPerPage);
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    const connectReport = (reportId) => {
        connect(reportId, id).then(() => {
            if(itemsPerPage !== null) {
                getReportsFromProject(id, currentPageConnected, itemsPerPage, searchText);
                getConnectableReports(currentPageConnectable, itemsPerPage, searchText);
            }
        });
    };

    const disconnectReport = (reportId) => {
        disconnect(reportId, id).then(() => {
            if(itemsPerPage !== null) {
                getReportsFromProject(id, currentPageConnected, itemsPerPage, searchText);
                getConnectableReports(currentPageConnectable, itemsPerPage, searchText);
            }
        });

    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    return (
        <>
            <Stack direction={"row"} sx={{alignItems:'center', justifyContent:'space-between', mr:2, mt:2}}>
                <Stack direction={"row"} sx={{alignItems:'center'}}>
                    <Back/>
                    <Typography variant="h2">Gestisci progetto</Typography>
                </Stack>

                <TextField
                    sx={{width:300}}
                    type="text"
                    id="search-text"
                    name="search-text"
                    label="Cerca"
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRoundedIcon />
                            </InputAdornment>
                        ),
                    }}
                />

            </Stack>

            <Stack direction="row" sx={{ justifyContent: 'center'}}>
                <Stack direction="column" sx={{justifyContent: 'center'}}>
                    <Typography variant="h4" sx={{ mt: 3, mb:2 }}>Report collegabili</Typography>

                    {connectableReports && connectableReports.data.length > 0 ? (
                        <>
                            <Stack spacing={{ xs: 1, sm: 4}} direction="column" useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center', mb:2, minHeight:600 }}>
                                {connectableReports.data.map(report => (
                                    <ReportCard key={report.id} report={report} connectable={true} connectReport={ () => connectReport(report.id)}></ReportCard>
                                ))}
                            </Stack>
                            {
                                connectableReports.last_page > 1 &&
                                <Pagination
                                    count={connectableReports.last_page}
                                    onChange={(event, value) => {setCurrentPageConnectable(value)}}
                                    sx={{ margin: 'auto', marginTop: '1em' }}
                                />
                            }

                        </>
                    ) : (
                        <Stack sx={{minHeight:800, marginTop:10}}>
                            <Typography variant="h5">Nessun report da mostrare</Typography>
                        </Stack>

                    )}
                </Stack>

                <Divider variant="middle" orientation="vertical" sx={{m:8}} />

                <Stack direction="column" sx={{alignItems: 'center'}}>
                    <Typography variant="h4" sx={{ mt: 3, mb:2 }}>Report collegati</Typography>

                    {project && project.reports && project.reports.data && project.reports.data.length > 0 ? (
                        <>
                            <Stack spacing={{ xs: 1, sm: 4 }} direction="column" useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center', mb:2, minHeight:600 }}>
                                {project.reports.data.map(report => (
                                    <ReportCard key={report.id} report={report} connected={true} disconnectReport={ () => disconnectReport(report.id)}></ReportCard>
                                ))}
                            </Stack>
                            {
                                project.reports.last_page > 1 &&

                                <Pagination
                                    count={project.reports.last_page}
                                    onChange={(event, value) => {setCurrentPageConnected(value)}}
                                    sx={{ margin: 'auto', marginTop: '1em' }}
                                />
                            }

                        </>
                    ) : (
                        <Stack sx={{minHeight:800, marginTop:10}}>
                            <Typography variant="h5">Nessun report da mostrare</Typography>
                        </Stack>
                    )}
                </Stack>
            </Stack>


        </>
    );
};

export default Reports;
