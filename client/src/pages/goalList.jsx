import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverApi } from '../actions/userAction';

// Goal Component
function Goal({ goal, onSave }) {
   const [amount, setAmount] = useState('');

   const handleSave = () => {
      onSave(goal._id, amount);
      setAmount('');
   };

   return (
      <div style={styles.goal}>
         <h3 style={styles.goalTitle}>{goal.title}</h3>
         <p>Target: ${goal.targetAmount}</p>
         <p>Saved: ${goal.savedAmount}</p>
         <p>Progress: {((goal.savedAmount / goal.targetAmount) * 100).toFixed(2)}%</p>
         <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount to save"
            style={styles.input}
         />
         <button onClick={handleSave} style={styles.button}>Save</button>
      </div>
   );
}

// GoalsPage Component
function GoalsPage() {
   const [goals, setGoals] = useState([]);
   const [newGoal, setNewGoal] = useState({
      title: '',
      targetAmount: '',
      frequency: '',
      amountPerFrequency: ''
   });

   useEffect(() => {
      // Fetch goals from the server
      serverApi.get('/goals').then((response) => {
         setGoals(response.data.goals);
      });
   }, []);

   const handleInputChange = (e) => {
      setNewGoal({
         ...newGoal,
         [e.target.name]: e.target.value
      });
   };

   const handleCreateGoal = () => {
      serverApi.post('/goals/create-goal', newGoal).then((response) => {
         setGoals(response.data.goals);
         setNewGoal({
            title: '',
            targetAmount: '',
            frequency: '',
            amountPerFrequency: ''
         });
      });
   };

   const handleSave = (goalId, amount) => {
      serverApi.post('/goals/update-goal', { goalId, savedAmount: amount }).then((response) => {
         setGoals(response.data.goals);
      });
   };

   return (
      <div style={styles.container}>
         <BackButton />
         <h2 style={styles.header}>Goal-Based Savings</h2>
         <div style={styles.goalForm}>
            <h3>Create New Goal</h3>
            <input
               type="text"
               name="title"
               value={newGoal.title}
               onChange={handleInputChange}
               placeholder="Goal title"
               style={styles.input}
            />
            <input
               type="number"
               name="targetAmount"
               value={newGoal.targetAmount}
               onChange={handleInputChange}
               placeholder="Target amount"
               style={styles.input}
            />
            <input
               type="text"
               name="frequency"
               value={newGoal.frequency}
               onChange={handleInputChange}
               placeholder="Frequency"
               style={styles.input}
            />
            <input
               type="number"
               name="amountPerFrequency"
               value={newGoal.amountPerFrequency}
               onChange={handleInputChange}
               placeholder="Amount per frequency"
               style={styles.input}
            />
            <button onClick={handleCreateGoal} style={styles.button}>Create Goal</button>
         </div>
         <div>
            {goals.map((goal) => (
               <Goal key={goal._id} goal={goal} onSave={handleSave} />
            ))}
         </div>
      </div>
   );
}

// BackButton Component
function BackButton() {
   const navigate = useNavigate();

   const handleBack = () => {
      navigate(-1); // -1 navigates to the previous page in the history stack
   };

   return (
      <button onClick={handleBack} style={styles.backButton}>
         Back
      </button>
   );
}

const styles = {
   container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
   },
   header: {
      textAlign: 'center',
      marginBottom: '20px',
   },
   goalForm: {
      border: '1px solid #ddd',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '15px',
   },
   goal: {
      border: '1px solid #ddd',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '15px',
   },
   goalTitle: {
      marginBottom: '10px',
      fontSize: '20px',
      fontWeight: 'bold',
   },
   input: {
      display: 'block',
      width: 'calc(100% - 20px)',
      padding: '8px',
      margin: '5px 0',
   },
   button: {
      padding: '10px 15px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
   },
   backButton: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      padding: '10px 15px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
   },
};

export default GoalsPage;
