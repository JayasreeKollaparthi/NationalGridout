// "use client";
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardContent, CardHeader, colors } from '@mui/material';
import { Modal } from 'react-bootstrap';

interface SearchResultsProps {
  searchData: any; // Adjust the type based on your actual data structure
}
const LoadingState = () => (
  <Box sx={{ width: '100%' }}>
    <LinearProgress />
  </Box>
);
const SearchResults: React.FC<SearchResultsProps> = ({ searchData }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);
  const hasDataForNextField = (extract_output: any, fieldName: string): boolean => {
    return Boolean(extract_output[fieldName]);
  };
  if (!searchData) {
    // Loading state or add an error state
    return <LoadingState />;
  }

  const openDialog = (i) => {
    console.log(i)
    if (hits[i] && hits[i].attachment) {
      setSelectedAttachment(hits[i].attachment);
      setShowDialog(true);
      console.log(selectedAttachment)
    }
  };

  const closeDialog = () => {
    setSelectedAttachment(null);
    setShowDialog(false);
  };
  const hits: any[] = searchData.hits

  



  let cards = [];
  for (var i = 0; i < hits.length; i++) {
    let a = i;

  let account = [];
  if (hits[i] && hits[i].fields && hits[i].fields.extract_output && hits[i].fields.extract_output.Accounts) {
    for (let j = 0; j < hits[i].fields.extract_output.Accounts.length; j++) {
      account.push(
        <tr key={j}>
          <td className="text-center" style={{ color: hits[i].fields.extract_output.Accounts[j].Account_Number === '' ? 'red' : 'black' }}>
            {hits[i].fields.extract_output.Accounts[j].Account_Number !== '' ? hits[i].fields.extract_output.Accounts[j].Account_Number : 'Field Missing'}
          </td>
          <td className="text-center" style={{ color: hits[i].fields.extract_output.Accounts[j].Electric_Meter_Number === '' ? 'red' : 'black' }}>
            {hits[i].fields.extract_output.Accounts[j].Electric_Meter_Number !== '' ? hits[i].fields.extract_output.Accounts[j].Electric_Meter_Number : 'Field Missing'}
          </td>
          <td className="text-center" style={{ color: hits[i].fields.extract_output.Accounts[j].Gas_Meter_Number === '' ? 'red' : 'black' }}>
            {hits[i].fields.extract_output.Accounts[j].Gas_Meter_Number !== '' ? hits[i].fields.extract_output.Accounts[j].Gas_Meter_Number : 'Field Missing'}
          </td>
          <td className="text-center" style={{ color: hits[i].fields.extract_output.Accounts[j].Floor_Apt === '' ? 'red' : 'black' }}>
            {hits[i].fields.extract_output.Accounts[j].Floor_Apt !== '' ? hits[i].fields.extract_output.Accounts[j].Floor_Apt : 'Field Missing'}
          </td>
          <td className="text-center" style={{ color: hits[i].fields.extract_output.Accounts[j].House_Number === '' ? 'red' : 'black' }}>
            {hits[i].fields.extract_output.Accounts[j].House_Number !== '' ? hits[i].fields.extract_output.Accounts[j].House_Number : 'Field Missing'}
          </td>
          <td className="text-center" style={{ color: hits[i].fields.extract_output.Accounts[j].Street_Name === '' ? 'red' : 'black' }}>
            {hits[i].fields.extract_output.Accounts[j].Street_Name !== '' ? hits[i].fields.extract_output.Accounts[j].Street_Name : 'Field Missing'}
          </td>
          <td className="text-center" style={{ color: hits[i].fields.extract_output.Accounts[j].City === '' ? 'red' : 'black' }}>
            {hits[i].fields.extract_output.Accounts[j].City !== '' ? hits[i].fields.extract_output.Accounts[j].City : 'Field Missing'}
          </td>
          <td className="text-center">
            {hits[i].fields.extract_output.Accounts[j].Validated === 'Yes' && (<img src="../yes.svg" style={{ width: '20px', margin: 'auto' }} />)}
            {hits[i].fields.extract_output.Accounts[j].Validated !== 'Yes' && (<img src="../no.svg" style={{ width: '20px', margin: 'auto' }} />)}
          </td>
        </tr>
      );
    }
  }

    cards.push(
      <Card className='w-100 mt-4' key={i}>
        <CardContent>
          <div className='card-header row'>
            {hits[i].fields.classifier_output.Label === 'enroll' && (<img src="../enroll.svg" className='card-image text-center mt-3 col-1' />)}
            {hits[i].fields.classifier_output.Label === 'de-enroll' && (<img src="../unenroll.svg" className='card-image text-center mt-3 col-1' />)}
            <CardContent className='col-8 fw-bold text' style={{ color: "#00148c" }}>{hits[i].fields.extract_output.Name}</CardContent>
            <img onClick={(e) => { openDialog(a) }} className="col-1 mt-3 attimg" src="../attachment.svg" alt="Open File" />
          </div>
          <CardContent>
            {hits[i].fields.extract_output.Contact_Email &&
              <span className="badge rounded-pill metadata-fields m-1">
                <span className="metadata-label">Contact Email:</span>
                <span className="metadata-value">{hits[i].fields.extract_output.Contact_Email}</span>
              </span>}
            {hits[i].fields.extract_output.Contact_Email && hits[i].fields.extract_output.New_to_the_LOFL_Program_Yes && hasDataForNextField(hits[i].fields.extract_output, 'New_to_the_LOFL_Program') && (<span className="divider"> | </span>
            )}
            {hits[i].fields.extract_output.New_to_the_LOFL_Program_Yes &&
              <span className="badge rounded-pill metadata-fields m-1">
                <span className="metadata-label">New to the LOFL Program:</span>
                <span className="metadata-value">{hits[i].fields.extract_output.New_to_the_LOFL_Program_Yes}</span>
              </span>}
            {hits[i].fields.extract_output.New_to_the_LOFL_Program_Yes && hits[i].fields.extract_output.City && hasDataForNextField(hits[i].fields.extract_output, 'City') && (<span className="divider"> | </span>
            )}
            {hits[i].fields.extract_output.City &&
              <span className="badge rounded-pill metadata-fields m-1">
                <span className="metadata-label">City:</span>
                <span className="metadata-value">{hits[i].fields.extract_output.City}</span>
              </span>}
            {hits[i].fields.extract_output.City && hits[i].fields.extract_output.State && hasDataForNextField(hits[i].fields.extract_output, 'State') && (<span className="divider"> | </span>
            )}
            {hits[i].fields.extract_output.State &&
              <span className="badge rounded-pill metadata-fields m-1">
                <span className="metadata-label">State:</span>
                <span className="metadata-value">{hits[i].fields.extract_output.State}</span>
              </span>}
            {hits[i].fields.extract_output.State && hits[i].fields.extract_output.Zip_Code && hasDataForNextField(hits[i].fields.extract_output, 'Zip_Code') && (<span className="divider"> | </span>
            )}
            {hits[i].fields.extract_output.Zip_Code &&
              <span className="badge rounded-pill metadata-fields m-1">
                <span className="metadata-label">Zip_Code:</span>
                <span className="metadata-value">{hits[i].fields.extract_output.Zip_Code}</span>
              </span>}
            {hits[i].fields.extract_output.Zip_Code && hits[i].fields.extract_output.Date && hasDataForNextField(hits[i].fields.extract_output, 'Date') && (<span className="divider"> | </span>
            )}
            {hits[i].fields.extract_output.Date &&
              <span className="badge rounded-pill metadata-fields m-1">
                <span className="metadata-label">Date:</span>
                <span className="metadata-value">{hits[i].fields.extract_output.Date}</span>
              </span>}
            {hits[i].fields.extract_output.Date && hits[i].fields.extract_output.Person_Title && hasDataForNextField(hits[i].fields.extract_output, 'Personal_Title') && (<span className="divider"> | </span>
            )}
            {hits[i].fields.extract_output.Person_Title &&
              <span className="badge rounded-pill metadata-fields m-1">
                <span className="metadata-label">Person_Title:</span>
                <span className="metadata-value">{hits[i].fields.extract_output.Person_Title}</span>
              </span>}
            {hits[i].fields.extract_output.Person_Title && hits[i].fields.extract_output.Date && hasDataForNextField(hits[i].fields.extract_output, 'Date') && (<span className="divider"> | </span>
            )}
            {hits[i].hasOwnProperty('emailSentToUser') && (
              <span className="badge rounded-pill metadata-fields m-1">
                <span className="metadata-label">Email sent to user:</span>
                <span className="metadata-value">{hits[i].emailSentToUser ? 'Yes' : 'No'}</span>
              </span>)}

            {hits[i].fields.hasOwnProperty('missing_fields') && <span className="divider"> | </span>}
            {hits[i].fields.hasOwnProperty('missing_fields') && (
              <span className="badge rounded-pill metadata-fields m-1">
                <span className="metadata-label" style={{ float: 'left' }}>Missing Fields:</span>
                {hits[i].fields.missing_fields && hits[i].fields.missing_fields.length > 0 ? (
                  <span key={i} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {hits[i].fields.missing_fields.map((field, index) => (
                      <span key={index} className="metadata-value">
                        {field}
                        {index !== hits[i].fields.missing_fields.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className='metadata-value'>None</span>
                )}
              </span>
            )}

            <Accordion className='tabacc mt-1'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />} className='head'>Accounts
              </AccordionSummary>
              <AccordionDetails className='accAemail acc'>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="text-center">Account Number</th>
                      <th className="text-center">Electric Meter Number</th>
                      <th className="text-center">Gas Meter Number</th>
                      <th className="text-center">Floor/Apt</th>
                      <th className="text-center">House Number</th>
                      <th className="text-center">Street Name</th>
                      <th className="text-center">City</th>
                      <th className="text-center">Validated ?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {account}
                  </tbody>
                </table>
              </AccordionDetails>
            </Accordion>
            <Accordion className='tabacc mt-1'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />} className='head'>Email
              </AccordionSummary>
              <AccordionDetails className='accAemail acc' style={{ marginLeft: "20px", textDecoration: "None" }}>
                <div className="user-section" >
                  <div className="list-item">
                    <div className="list_card_title">User Email:</div>
                    <div className="list_card_data mt-2">
                      <form className="input w-100 border-solid border-1	border-gray-100 rounded-sm">
                        <textarea className="email-content w-100" style={{ resize: "none", height: "auto", opacity: "0.4" }} rows={10} disabled value={hits[i].user_email}></textarea>
                      </form>
                    </div>
                  </div>
                  <div className="list-item mt-3" style={{ paddingBottom: "10px" }}>
                    <div className="list_card_title">Intent:</div>
                    <div className="list_card_data listEmail">
                      {hits[i].fields.classifier_output.Intent}</div>
                  </div>

                  <div className="list-item" style={{ paddingBottom: "10px" }}>
                    <div className="list_card_title">Sentiment:</div>
                    <div className="list_card_data listEmail">
                      {hits[i].fields.classifier_output.Sentiment}</div>
                  </div>
                  <div className="list-item">
                    <div className="list_card_title mb-2">Response Email:</div>
                    <div className="list_card_data mt-2">
                      <form className="input w-100 border-1 border-solid	border-gray-300 rounded-sm" style={{ color: "#666" }}>
                        <textarea className="email-content w-100" style={{ resize: "none", height: "auto" }} rows={10} defaultValue={hits[i].fields.generated_email.generated_email}></textarea>
                      </form>
                      <div className="w-100 my-3" style={{ textAlign: "center" }}>
                        <Button variant="contained" style={{ backgroundColor: "#0d6efd" }}>Send</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </CardContent>
      </Card>

    )
  }
  return (
    <>
      {cards}
      <div>
        <Modal size="xl" show={showDialog} onHide={closeDialog} style={{ width: '100%' }}>
          <Modal.Header closeButton>
            <Modal.Title>Attachment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe src={selectedAttachment} height="500" title="Attachment PDF"></iframe>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
};

export default SearchResults;
