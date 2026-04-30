import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import { Box, Card, CardMedia, CardContent, Typography, Button, IconButton, MobileStepper } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import IMG1 from '../../static/img/20250920130405_1.jpg';
import IMG2 from '../../static/img/20250920130417_1.jpg';
import IMG3 from '../../static/img/20250920130521_1.jpg';
import IMG4 from '../../static/img/20250920130526_1.jpg';
import IMG5 from '../../static/img/20250920130811_1.jpg';
import SelectorDialog from '../../components/Dialogs/SelectorDialog';


function Home() {
  const images = [IMG1, IMG2];
  const images2 = [IMG3, IMG4, IMG5,];

  const categories = ['home page', 'backpack', 'scoreboard', 'loadout', 'select class', 'select team', 'game hud'];


  const [categoryIndex, setCategoryIndex] = useState(0);
  const [submission, setSubmission] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [index, setIndex] = useState(0);

  const theme = useTheme();

  // useEffect(() => {
  //   console.log('in effect');
  //   if (submission[`${categoryIndex}`]) {
  //     setIndex(submission[`${categoryIndex}`]);
  //   }
  //   else setIndex(0);
  // }, [categories, categoryIndex]);

  const handleNext = () => {
    console.log('sub', submission);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (submission[`${categoryIndex}`]) {
      setIndex(submission[`${categoryIndex + 1}`]);
    }
    else { setIndex(0); }

    setCategoryIndex(categoryIndex + 1);
    handleChange();

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCategoryIndex(categoryIndex - 1);
    setIndex(submission[`${categoryIndex}`]);

  };

  const handleChange = () => {
    const sub = submission;
    sub[`${categoryIndex}`] = index;
    setSubmission(sub);
  }

  const handleSubmit = () => {

  };

  // useEffect(() => { console.log('sub', submission) }, [submission])



  return (
    <Box sx={{ p: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', flexGrow: 1 }}>
      <Typography variant="h4">{categories[categoryIndex]}</Typography>
      <SelectorDialog categoryIndex={categoryIndex} categories={categories} index={index} setIndex={setIndex} />
      {/* <Typography variant="h4">{categories[categoryIndex]}</Typography> */}

      <Box sx={{ width: '100%', height: '100%', flexGrow: 1, justifyContent: 'flex-end', display: 'flex', flexDirection: 'column' }}>
        <MobileStepper
          variant="dots"
          steps={categories.length}
          position="static"
          activeStep={activeStep}
          sx={{ display: 'flex', justifyContent: 'space-between', }}
          nextButton={
            <Button sx={{}} size="large" onClick={activeStep < categories.length - 1 ? handleNext : handleSubmit} disabled={false}>
              {activeStep < categories.length - 1 ? "next" : "submit"}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="large" onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </Box>
    </Box>
  );
}

export default Home;
