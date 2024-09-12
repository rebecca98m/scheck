import React from "react";
import { Theme } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses, TabsProps } from "@mui/material/Tabs";

export const tabsStyles = () => ({
    root: {
        backgroundColor: "#eee",
        borderRadius: "10px",
        minHeight: 44,
    },
    flexContainer: {
        position: "relative",
        padding: "0 3px",
        zIndex: 1,
    },
    indicator: {
        top: 3,
        bottom: 3,
        right: 3,
        height: "auto",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px 0 rgba(0,0,0,0.16)",
    },
});

export const tabItemStyles = (theme: Theme) => ({
    root: {
        fontWeight: 500,
        minHeight: 44,
        minWidth: 96,
        opacity: 0.7,
        color: (theme.vars || theme).palette.text.primary,
        textTransform: "initial",
        "&:hover": {
            opacity: 1,
        },
        [`&.${tabClasses.selected}`]: {
            color: (theme.vars || theme).palette.text.primary,
            opacity: 1,
        },
        [theme.breakpoints.up("md")]: {
            minWidth: 120,
        },
    },
});

function toSx(
    styles: (theme: Theme) => Partial<Record<string, any>>,
    classes: Record<string, string>
) {
    return function sxCallback(theme: Theme) {
        let sx: Record<string, any> = {};
        Object.entries(styles(theme)).forEach(([key, value]) => {
            if (key === "root") {
                sx = { ...sx, ...value };
            } else {
                sx[`& .${classes[key]}`] = value;
            }
        });
        return sx;
    };
}

export function MethodsTab({ sx, setMethod }: TabsProps) {
    const [tabIndex, setTabIndex] = React.useState(0);
    const tabItemSx = toSx(tabItemStyles, tabClasses);
    return (
        <Tabs
            value={tabIndex}
            onChange={(e, index) => {setTabIndex(index); setMethod(index)}}
            sx={[toSx(tabsStyles, tabsClasses), ...(Array.isArray(sx) ? sx : [sx])]}
        >
            <Tab disableRipple label={"Battelle"} sx={tabItemSx} />
            <Tab disableRipple label={"AHP"} sx={tabItemSx} />
        </Tabs>
    );
}
