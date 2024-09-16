import * as React from 'react';
import { useEffect, useState } from "react";
import {Avatar, Divider, List, ListItem, Typography} from "@mui/material";
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

const seriesColors = [
    "#3C3F43",
    "#547348",
    "#44626b",
    "#6F3A32",
    "#CEA249",
    "#BFC7BE"
];

export default function ProjectRank({ reports }) {
    const [rank, setRank] = useState([]);

    useEffect(() => {
        let data = reports.map(report => ({
            "value": report.Impatto,
            "label": report.title,
            "id": report.id
        }));

        data = data.sort((a, b) => a.value - b.value);

        setRank(data.slice(0, 3));
        console.log(rank)
    }, [reports]);

    return (
        <>
            {
                rank && rank.length > 0 &&
                <List>
                    <ListItem key={rank[0].id}>
                        <Avatar sx={{mr:2, ml:-1, width: 64, height: 64 }}>
                            <EmojiEventsRoundedIcon/>
                        </Avatar>
                        <Typography variant="h6">
                            {rank[0].label} - {rank[0].value}
                        </Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem key={rank[1].id}>
                        <Avatar sx={{mr:4}}>
                            2
                        </Avatar>
                        <Typography variant="body1">
                            {rank[1].label} - {rank[1].value}
                        </Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem key={rank[2].id}>
                        <Avatar sx={{mr:4}}>
                            3
                        </Avatar>
                        <Typography variant="body2">
                            {rank[2].label} - {rank[2].value}
                        </Typography>
                    </ListItem>

                </List>


            }
        </>


    );
}
