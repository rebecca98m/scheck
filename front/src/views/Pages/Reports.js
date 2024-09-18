import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import useReport from "../../Controller/Report/ReportController";
import {Fab, InputAdornment, Pagination, Stack, Typography} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReportCard from "../components/ReportCard";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Reports = () => {
    const {reports, getAll} = useReport();

    const [itemsPerPage, setItemsPerPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState(null);

    useEffect(() => {
        if(itemsPerPage !== null) {
            getAll(currentPage, itemsPerPage, searchText);
        }
    }, [currentPage, itemsPerPage, searchText]);

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

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }


    return (
        <>
            <Stack direction={"row"} sx={{alignItems:'center', justifyContent:'space-between', mr:2, mt:2}}>
                <Typography variant="h2">Report salvati</Typography>
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
                        <Stack sx={{minHeight:800, marginTop:10}}>
                            <Typography variant="h5">Nessun report da mostrare</Typography>
                        </Stack>
                }

            <Link className="button-right" to="/reports/new"><Fab color="primary"><AddRoundedIcon/></Fab></Link>
        </>
    )
};

export default Reports;
