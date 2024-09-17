import React, { useState, useEffect, useRef } from 'react';
import { Card, Chip, Stack, Typography } from "@mui/material";
import {Link} from "react-router-dom";

const ProjectCard = ({ project }) => {
    const createdDate = new Date(project.created_at);
    const updatedDate = new Date(project.updated_at);

    const reports = project.reports;
    const [visibleCount, setVisibleCount] = useState(reports.length);
    const containerRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            const container = containerRef.current;
            if (!container) return;

            let totalWidth = 0;
            let maxVisible = reports.length;

            for (let index = 0; index < container.children.length; index++) {
                const child = container.children[index];
                const childStyle = window.getComputedStyle(child);
                const marginRight = parseFloat(childStyle.marginRight) || 0;
                const marginBottom = parseFloat(childStyle.marginBottom) || 0;
                totalWidth += child.offsetWidth + marginRight + marginBottom;

                if (totalWidth > container.offsetWidth*2+100) {
                    maxVisible = index;
                    break;
                }
            }

            setVisibleCount(maxVisible);
        };

        const handleResize = () => {
            setTimeout(checkOverflow, 100);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [reports]);

    return (
        <Card sx={{ width: 400, height: 250 }} className="ag-courses_item">
            <Link to={'/projects/details/' + project.id} key={project.id}>
                <div className="ag-courses-item_link">
                    <div className="ag-courses-item_bg ag-courses-item_bg_neutral"></div>
                    <Stack className="ag-courses-item_text" direction="column"
                           sx={{ justifyContent: 'space-between', height: '200px', padding: '1em', paddingTop: 0 }}>

                        <Typography variant="h5">{project.title}</Typography>

                        <Stack
                            direction="row"
                            ref={containerRef}
                            sx={{ flexWrap: 'wrap', overflow: 'hidden', height: 110, justifyContent:'center', alignItems:'center' }}
                        >
                            {reports.slice(0, visibleCount).map((report) => (
                                <Chip
                                    key={report.id}
                                    label={report.title}
                                    variant="outlined"
                                    sx={{ mr: 0.5, mb: 0.5, fontSize: 10, padding: 0 }}
                                />
                            ))}
                            {visibleCount < reports.length && (
                                <Chip
                                    label={`altri ${reports.length - visibleCount}`}
                                    variant="outlined"
                                    sx={{ mr: 0.5, mb: 0.5, fontSize: 10, padding: 0 }}
                                />
                            )}
                        </Stack>

                        <Stack>
                            <Typography variant="caption">Data creazione: {createdDate.toLocaleString('it-IT')}</Typography>
                            <Typography variant="caption">Data ultima modifica: {updatedDate.toLocaleString('it-IT')}</Typography>
                        </Stack>

                    </Stack>

                </div>
            </Link>

        </Card>
    );
};

export default ProjectCard;
