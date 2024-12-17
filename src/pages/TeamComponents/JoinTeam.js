import React, { useState } from 'react';

const JoinTeam = () => {
  const [inviteCode, setInviteCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleJoinTeam = () => {
    if (inviteCode === '1234') { // Здесь можно заменить на логику проверки кода приглашения
      setSuccessMessage('Вы успешно присоединились к команде!');
      setErrorMessage('');
    } else {
      setErrorMessage('Неверный код приглашения.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="join-team programSection">
      <div>
        <label className="profileLabel">Введите код приглашения</label>
        <input
          type="text"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="Код приглашения"
          className="modalInput" // Применяем стили ввода
        />
      </div>
      <div>
        <button onClick={handleJoinTeam} className="Button">Вступить в команду</button>
      </div>

      {successMessage && <div className="restricted-content">{successMessage}</div>}
      {errorMessage && <div className="restricted-content">{errorMessage}</div>}
    </div>
  );
};

export default JoinTeam;
