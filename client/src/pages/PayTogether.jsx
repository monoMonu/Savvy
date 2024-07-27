import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { serverApi } from '../actions/userAction';

const PayTogether = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [friendEmails, setFriendEmails] = useState('');
  const [amount, setAmount] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [occasion, setOccasion] = useState('');
  const [groupId, setGroupId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateGroup = async () => {
    setLoading(true);
    setError('');
    try {
      const friendIds = await Promise.all(
        friendEmails.split(',').map(async (email) => {
          const response = await serverApi.get(`/user/get-user-id?email=${email.trim()}`);
          console.log(response)
          return response.data?.data?.userId;
        })
      );
      console.log(friendIds)
      const response = await serverApi.post('/transactions/create-group',
        { name: groupName, memberIds: friendIds }
      );

      setGroupId(response.data.group._id);
      alert('Group created successfully');
    } catch (error) {
      console.error('Error creating group:', error);
      setError('Error creating group. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecordPayment = async () => {
    setLoading(true);
    setError('');
    try {
      await serverApi.post('/transactions/record-payment',
        { amount, groupId, occasion, receiverId }
      );
      alert('Payment recorded successfully');
      navigate(-1);
    } catch (error) {
      console.error('Error recording payment:', error);
      setError('Error recording payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pay-together-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#1e1e1e', color: '#f5f5f5' }}>
      <h2 style={{ color: '#f5f5f5' }}>Pay Together</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #444', width: '100%' }}
        />
        <input
          type="text"
          placeholder="Friend Emails (comma separated)"
          value={friendEmails}
          onChange={(e) => setFriendEmails(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #444', width: '100%' }}
        />
        <button
          onClick={handleCreateGroup}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          disabled={loading}
        >
          {loading ? 'Creating Group...' : 'Create Group'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {groupId && (
        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #444', width: '100%' }}
          />
          <input
            type="text"
            placeholder="Receiver's Id"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #444', width: '100%' }}
          />
          <input
            type="text"
            placeholder="Occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #444', width: '100%' }}
          />
          <button
            onClick={handleRecordPayment}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            disabled={loading}
          >
            {loading ? 'Processing Payment...' : 'Make Payment'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export { PayTogether };
