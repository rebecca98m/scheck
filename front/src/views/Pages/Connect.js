import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import useReport from "../../Controller/Report/ReportController";
import { Fab, Pagination, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReportCard from "../components/ReportCard";
import CableRoundedIcon from "@mui/icons-material/CableRounded";
import useProject from "../../Controller/Project/ProjectController";

const Reports = () => {
    const { connectableReports, project, getConnectableReports, getReportsFromProject } = useProject();
    const {connect, disconnect} = useReport();
    const { id } = useParams();

    useEffect(() => {
        getReportsFromProject(id);
        getConnectableReports();
    }, [id]);

    const connectedPagination = (event, value) => {
        getReportsFromProject(id, value);
    };

    const connectablePagination = (event, value) => {
        getConnectableReports(value);
    };

    const connectReport = (reportId) => {
        connect(reportId, id).then(() => {
            getReportsFromProject(id);
            getConnectableReports();
        });
    };

    const disconnectReport = (reportId) => {
        disconnect(reportId, id).then(() => {
            getReportsFromProject(id);
            getConnectableReports();
        });

    };

    return (
        <>
            <Typography variant="h2" sx={{ mb: 2 }}>Gestisci progetto</Typography>

            <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>Report collegabili</Typography>

            {connectableReports && connectableReports.result && connectableReports.result.data.length > 0 ? (
                <>
                    <Stack spacing={{ xs: 1, sm: 4}} direction="row" useFlexGap sx={{ flexWrap: 'wrap', justifyContent: 'start', mb:2 }}>
                        {connectableReports.result.data.map(report => (
                            <ReportCard key={report.id} report={report} connectable={true} connectReport={ () => connectReport(report.id)}></ReportCard>
                        ))}
                    </Stack>
                    {
                        connectableReports.result.last_page > 1 &&
                        <Pagination
                            count={connectableReports.result.last_page}
                            onChange={connectablePagination}
                            sx={{ margin: 'auto', marginTop: '1em' }}
                        />
                    }

                </>
            ) : (
                <p>Nessun report da mostrare</p>
            )}



            <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>Report collegati</Typography>

            {project && project.result && project.result.reports && project.result.reports.length > 0 ? (
                <>
                    <Stack spacing={{ xs: 1, sm: 4 }} direction="row" useFlexGap sx={{ flexWrap: 'wrap', justifyContent: 'start', mb:2 }}>
                        {project.result.reports.map(report => (
                            <ReportCard key={report.id} report={report} connected={true} disconnectReport={ () => disconnectReport(report.id)}></ReportCard>
                        ))}
                    </Stack>
                    {
                        project.result.reports.last_page > 1 &&

                        <Pagination
                            count={project.result.reports.last_page}
                            onChange={connectedPagination}
                            sx={{ margin: 'auto', marginTop: '1em' }}
                        />
                    }

                </>
            ) : (
                <p>Nessun report da mostrare</p>
            )}
        </>
    );
};

export default Reports;
