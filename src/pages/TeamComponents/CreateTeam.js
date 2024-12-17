import React, { useState } from 'react';
import '../styles/Modal.css';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!teamName || !teamDescription) {
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }
    setSuccessMessage('Команда успешно создана!');
    setErrorMessage('');
  };

  return (
    <div className="create-team programSection">
      <form onSubmit={handleCreateTeam}>
        <div>
          <label className="profileLabel">Название команды</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Введите название команды"
            className="modalInput" // Применяем стили ввода
          />
        </div>
        <div>
          <label className="profileLabel">Описание команды</label>
          <textarea
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            placeholder="Введите описание команды"
            className="modalInput" // Применяем стили ввода
          />
        </div>
        <button type="submit" className="Button">Создать команду</button>
      </form>

      {successMessage && <div className="restricted-content">{successMessage}</div>}
      {errorMessage && <div className="restricted-content">{errorMessage}</div>}
    </div>
  );
};

export default CreateTeam;
