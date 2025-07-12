import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import {useState} from "react"

export default function Features({content}) {
    const [idExpanded, setIdExpanded] = useState(null);

    const handleChange = (id) => {
        console.log(id);
        (idExpanded == id) ? setIdExpanded(null) : setIdExpanded(id)
      };

  return (
    <div>
      
        {content.map((featureObj)=>{
            return(
                <Accordion className={featureObj.title == idExpanded ? "open" : "close"} id={featureObj.title} expanded={featureObj.title == idExpanded} onChange={()=>handleChange(featureObj.title)}>
                <AccordionSummary
                    expandIcon={content.link}
                    aria-controls="panel-content"
                    id="panel-header"
                >
                    <Typography id={featureObj.title} component="span">{featureObj.title}</Typography>
                    <Typography id={featureObj.titlealt} component="span">{featureObj.titlealt}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    Features
                    <ul>
                    {featureObj.content.map((feature) => <li key={feature.id}>{feature.text}</li>)}
                    </ul>    
                </AccordionDetails>
            </Accordion>
            )
        })}
    </div>
  );
}