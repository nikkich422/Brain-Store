import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function HomeTabs({ setCategory }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabsData = [
    {
      label: "Clothing",
      type: "clothing"
    },
    {
      label: "Kids",
      type: "kids"
    },
    {
      label: "Footwear",
      type: "footwear"
    },
    {
      label: "Toys",
      type: "toys"
    },
    {
      label: "Accessories",
      type: "accessories"
    },
    {
      label: "Jewellery",
      type: "jewellery"
    },
    {
      label: "Home and Furniture",
      type: "home_and_furniture"
    },
    {
      label: "Health and Nutritions",
      type: "health_and_nutritions"
    },
  ]

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        TabIndicatorProps={{
          style: {
            backgroundColor: "red",
            height: 2,
          },
        }}
      >

      {tabsData.map((t) => 
        <Tab label={t.label} key={t.type} onClick={() => setCategory(t.type)} />
      )}
      </Tabs>
    </Box>
  );
}