import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DemoConsultation from '../components/DemoConsultation';

const DemoConsultationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  if (!doctor) {
    return <div>No doctor selected. Please go back and select a doctor.</div>;
  }

  const handleEnd = () => {
    navigate('/appointments');  // or wherever your dashboard/bookings page is
  };

  return <DemoConsultation doctor={doctor} onEnd={handleEnd} />;
};

export default DemoConsultationPage;
