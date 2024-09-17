import React, { useCallback } from 'react';
import { Link } from "react-router-dom";
import { Card, Fab, Stack, Typography } from "@mui/material";
import CableRoundedIcon from "@mui/icons-material/CableRounded";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import useReport from "../../Controller/Report/ReportController";

const ReportCard = ({ report, connectable, connected, disconnectReport, connectReport }) => {
    const getLevel = (value, min, max) => {
        const percentage = ((value - min) / (max - min)) * 100;
        if (percentage < 33) {
            return "ag-courses-item_bg ag-courses-item_bg_low";
        }
        if (percentage < 66) {
            return "ag-courses-item_bg ag-courses-item_bg_medium";
        }
        return "ag-courses-item_bg ag-courses-item_bg_high";
    };

    const createdDate = useCallback(() => new Date(report.created_at), [report]);
    const updatedDate = useCallback(() => new Date(report.updated_at), [report]);
    const impactLevel = useCallback(() => getLevel(report.impact, report.min_impact, report.max_impact), [report]);

    return (
        <Stack direction="row" sx={{ alignItems: 'center' }}>
        <Card sx={{ flexGrow:2, height: 150 }} className="ag-courses_item">

            <Link to={'/reports/details/' + report.id} key={report.id}>
                <div className="ag-courses-item_link">
                    <div className={impactLevel()}></div>

                        <Stack className="ag-courses-item_text" direction="column" sx={{ justifyContent: 'space-between', height: '100px', padding: 2, paddingTop: 0 }}>
                            {report.project && (
                                <Typography variant="h6" color="info">{report.project.title}</Typography>
                            )}
                            <Typography variant="h5">{report.title}</Typography>
                            <Stack>
                                <Typography variant="caption">Data creazione: {createdDate().toLocaleString('it-IT')}</Typography>
                                <Typography variant="caption">Data ultima modifica: {updatedDate().toLocaleString('it-IT')}</Typography>
                            </Stack>
                    </Stack>
                </div>
            </Link>
        </Card>
            {connectable && (
                <Fab sx={{ml:2}} onClick={connectReport} className="connect-button" color={"success"} size="small">
                    <CableRoundedIcon />
                </Fab>
            )}

            {connected && (
                <Fab sx={{ml:2}} onClick={disconnectReport} className="connect-button" color={"error"} size="small">
                    <RemoveRoundedIcon />
                </Fab>
            )}
        </Stack>
    );
};

export default ReportCard;
