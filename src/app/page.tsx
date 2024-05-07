// pages/index.tsx
"use client";
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchResults from './SearchResults';
import { Roboto } from 'next/font/google';

var searchParams = {};

const search = async (searchParams: {}) => {
  const url: string = "https://028248-dev-eus2-gai-func-01.azurewebsites.net/api/search"; // Replace with your actual API URL
  // const url: string = "http://localhost:8000/search"; // Replace with your actual API URL
  try {
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(searchParams),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const responseData = await data.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
};
const Home: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  var aggs: any[] = []

  const addFilter = (item: { key: string; val: any }) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (item.key in updatedFilters) {
        const filterValues = updatedFilters[item.key];

        // Toggle the selected value
        const index = filterValues.indexOf(item.val);
        if (index !== -1) {
          // Remove the selected value
          updatedFilters[item.key] = filterValues.filter((value) => value !== item.val);

          // Remove the key if all values are unchecked
          if (updatedFilters[item.key].length === 0) {
            delete updatedFilters[item.key];
          }
        } else {
          // Add the selected value to the array
          updatedFilters[item.key] = [...filterValues, item.val];
        }
      } else {
        // Create a new array for the filter key and add the selected value
        updatedFilters[item.key] = [item.val];
      }

      return updatedFilters;
    });
  };

  const checkSelected = (item: { key: string; val: any }) => {
    if (item.key in filters && Array.isArray(filters[item.key])) {
      return filters[item.key].includes(item.val);
    }
    return false;
  };
  
  const LoadingState = () => (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );

  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // const handleSearch = () => {
  //   search({'text':searchText})
  //   console.log('Performing search with text:', searchText);
  // };
  const handleSearch = async () => {
    setSearchData(null);
    const data = await search({ text: searchText, filters: filters });
    setSearchData(data);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const [searchData, setSearchData] = useState(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // const data = await search(searchParams);
      // setSearchData(data);
      await handleSearch()
    };
    fetchData();
  }, [filters]);

  // if (!searchData) {
  //   // Loading state or add an error state
  //   return <LoadingState />;
  // }

  return (
    <>
      {!searchData && <LoadingState />}
      <main className='container-fluid bg-gray-50'>
        <div className="row top-nav-bar py-4">
          <div className='col-2 flex justify-center'>
            <Image src="/logo.svg" alt="Logo" width={175} height={50} priority />
          </div>
          <div className='col-9'>
            <div className="search">
              <input className="form-control min-h-15 indent-3 border-2	border-gray-300	border-solid rounded-md" value={searchText} onChange={handleInputChange} onKeyUp={handleKeyUp} placeholder="Search..." />
              <button onClick={handleSearch} className="btn btn-primary" type="button">Search</button>
            </div>
          </div>
        </div>
        {searchData &&
          <div className='row pt-6 container-fluid'>
            <div className='col-3 mt-3'>
              {Object.entries(searchData.aggs).sort().map(([key, values], index) => (
                <Accordion defaultExpanded key={key} className='tabacc mt-2'>
                  <AccordionSummary className='accordion text-secondary'
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >{key}
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {values.map((val, valIndex) => (
                        <div key={valIndex} className='checkbox-container'  style={{ padding: '0px 16px 0px 0px', marginTop: '-14px', marginBottom: '-10px', marginLeft: '40px', fontVariantCaps: 'all-petite-caps', fontFamily: 'Roboto, sans-serif', fontWeight:"500", fontSize: '19px'}}>
                          <Checkbox size='small' style={{borderRadius: '5px'}} checked={filters[key]?.includes(val) || false} onClick={() => addFilter({ key, val })} />
                            <label>{val === true ? 'Yes' : val === false ? 'No' : val}</label>
                        </div>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
            <div className='col-9'>
              <SearchResults style={searchData ? {} : { display: 'none' }} searchData={searchData}></SearchResults>
            </div>
          </div>}
      </main>
    </>
  );
};

export default Home;
