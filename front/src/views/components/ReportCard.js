import React, {useCallback, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Card, Button, Stack, Typography } from "@mui/material";

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

    const [stackStyle, setStackStyle] = useState({});
    const [linkStyle, setLinkStyle] = useState({});

    useEffect(() => {
        if (connected || connectable) {
            setStackStyle({ alignItems: 'center', width: 400 });
            setLinkStyle({ padding: '20px 20px 0px 20px' });
        } else {
            setStackStyle({ alignItems: 'center' });
            setLinkStyle({ height:'100%' });
        }
    }, [connected, connectable]);

    return (
        <Stack direction="column" sx={stackStyle}>
            <Card sx={{ flexGrow: 1 }} className="ag-courses_item">
                <Link to={'/reports/details/' + report.id} key={report.id}>
                    <div className="ag-courses-item_link" style={linkStyle}>
                        <div className={impactLevel()}></div>

                        <Stack className="ag-courses-item_text" direction="column" sx={{ justifyContent: 'space-between'}}>
                            {report.project && (
                                <Typography className={"card-project-title"} variant="h6" color="info">{report.project.title}</Typography>
                            )}
                            <Typography variant="h5">{report.title}</Typography>
                            <Stack>
                                <Typography variant="caption">Data creazione: {createdDate().toLocaleString('it-IT')}</Typography>
                                <Typography variant="caption">Data ultima modifica: {updatedDate().toLocaleString('it-IT')}</Typography>
                            </Stack>
                        </Stack>
                    </div>
                </Link>
                {connectable && (
                    <Button className={'card-button'} sx={{width:400}} onClick={connectReport}  color={"success"}>
                        Connetti
                    </Button>
                )}

                {connected && (
                    <Button className={'card-button'} sx={{width:400}} onClick={disconnectReport}  color={"error"}>
                        Disconnetti
                    </Button>
                )}
            </Card>

        </Stack>
    );
};

export default ReportCard;
