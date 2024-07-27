import { useNavigate } from 'react-router-dom'

export default function BackButton() {
   const navigate = useNavigate();

   const handleBack = () => {
      navigate(-1); // -1 navigates to the previous page in the history stack
   };

   return (
      <button onClick={handleBack} style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
      }}>
         Back
      </button>
   );
}

