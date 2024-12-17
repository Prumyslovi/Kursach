import React, { useState } from 'react';
import './AdministerTeam.css'; // Импортируем стили

const AdministerTeam = () => {
  const [teamList] = useState([
    {
      id: '1',
      name: 'Команда A',
      key: 'ABC123', // Добавляем уникальный ключ
      members: [
        { name: 'Джон', role: 'Admin' },
        { name: 'Джейн', role: 'Member' }
      ]
    },
    {
      id: '2',
      name: 'Команда B',
      key: 'XYZ456', // Добавляем уникальный ключ
      members: [
        { name: 'Алиса', role: 'Member' },
        { name: 'Боб', role: 'Member' }
      ]
    },
  ]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newMemberName, setNewMemberName] = useState('');
  const [role, setRole] = useState('Member');

  const handleAddMember = () => {
    if (newMemberName) {
      setSelectedTeam({
        ...selectedTeam,
        members: [
          ...selectedTeam.members,
          { name: newMemberName, role },
        ],
      });
      setNewMemberName('');
    }
  };

  const handleRemoveMember = (memberName) => {
    setSelectedTeam({
      ...selectedTeam,
      members: selectedTeam.members.filter((member) => member.name !== memberName),
    });
  };

  const handleRoleChange = (memberName, newRole) => {
    setSelectedTeam({
      ...selectedTeam,
      members: selectedTeam.members.map((member) =>
        member.name === memberName ? { ...member, role: newRole } : member
      ),
    });
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className="administer-team programSection">
      <h3 className="admin-title">Выберите команду для администрирования</h3>
      <ul className="admin-list">
        {teamList.map((team) => (
          <li
            key={team.id}
            className="admin-list-item"
            onClick={() => handleSelectTeam(team)}
          >
            <span>Название: {team.name}</span>
            <span style={{ marginLeft: '10px', fontStyle: 'italic', color: 'gray' }}>Код: {team.key}</span> {/* Уникальный ключ */}
            {selectedTeam && selectedTeam.id === team.id && (
              <div>
                <h4>Состав участников</h4>
                <ul className="members-list">
                  {selectedTeam.members.map((member) => (
                    <li key={member.name} className="team-member">
                      <span>{member.name}</span>
                      <select
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.name, e.target.value)}
                        className='list'
                      >
                        <option value="Member">Участник</option>
                        <option value="Owner">Создатель</option>
                        <option value="Manager">Менеджер</option>
                      </select>
                      <button
                        className="Button"
                        onClick={() => handleRemoveMember(member.name)}
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
                </ul>

                <h4>Добавить участника</h4>
                <div className="add-member-container">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Имя участника"
                    className="modalInput"
                  />
                  <select className='list' value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Member">Участник</option>
                    <option value="Admin">Создатель</option>
                    <option value="Manager">Менеджер</option>
                  </select>
                  <button className="Button" onClick={handleAddMember}>
                    Добавить
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministerTeam;
