import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useState } from "react";
import styles from "../styles/AppBar.module.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";

export default function Features({ content }) {
  const [idExpanded, setIdExpanded] = useState(null);

  const handleChange = (id) => {
    idExpanded == id ? setIdExpanded(null) : setIdExpanded(id);
  };

  return (
    <div>
      {content.map((featureObj) => {
        return (
          <Accordion
            key={featureObj.title}
            className={
              featureObj.title == idExpanded ? styles.open : styles.close
            }
            id={featureObj.title}
            expanded={featureObj.title == idExpanded}
            onChange={() => handleChange(featureObj.title)}
            sx={{ backgroundColor: "rgba(30, 27, 75, 0.9)" }}
          >
            <AccordionSummary
              className={`${styles.summary}`}
              id={`accordion-summary-${featureObj.title}`}
              aria-controls={`accordion-content-${featureObj.title}`}
              aria-expanded={featureObj.title == idExpanded}
              aria-label={featureObj.arialabel}
              sx={{
                transition: "color 0.3s ease", // Smooth transition for text color
                "&:hover": {
                  color: "lightpink", // Change text color to light pink on hover
                  cursor: "pointer",
                },
              }}
            >
              {/* Main title as link, moving right */}
              <Typography className={styles.mainTitleWrapper}>
                <Link
                  className={styles.mainTitle}
                  to={featureObj.link.address}
                  tabIndex={featureObj.title == idExpanded ? 0 : -1}
                  aria-disabled={
                    featureObj.title == idExpanded ? "false" : "true"
                  }
                  onClick={
                    featureObj.title == idExpanded
                      ? undefined
                      : (e) => e.preventDefault()
                  }
                  underline="none"
                >
                  {featureObj.title}
                </Link>
              </Typography>
              {/* Alt title only visible when open */}
              <Typography
                id={featureObj.titlealt}
                className={styles.altTitle}
                fontSize="1.3rem"
                fontWeight="bolder"
                component="span"
              >
                {featureObj.titlealt}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                id={`accordion-content-${featureObj.title}`}
                aria-labelledby={`accordion-summary-${featureObj.title}`}
                role="region"
              >
                <ul className={styles.featuresList}>
                  {featureObj.content.map((feat) => (
                    <li key={feat.id} className={styles.featureItem}>
                      {feat.text}
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
