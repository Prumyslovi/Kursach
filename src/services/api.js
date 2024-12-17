import axios from 'axios';

const API_URL = 'http://localhost:5062/api';

export const fetchMembers = async () => {
  const response = await axios.get(`${API_URL}/Member/GetAllMembers`); 
  return response.data;
}

export const addMember = async (memberData) => {
  const response = await axios.post(`${API_URL}/Member/AddMember`, memberData); 
  return response.data;
}

export const fetchMember = async (login, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/Member/GetMember`, // URL API
      { 
        Login: login, // Тело запроса, ключи должны совпадать с полями модели в ASP.NET
        Password: password
      }, 
      {
        headers: { 'Content-Type': 'application/json' } // Указываем Content-Type
      }
    );
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error.response || error);
    throw error; // Повторно выбрасываем ошибку для дальнейшей обработки
  }
}

export const fetchProfile = async (memberId) => {
  try {
    console.log('Отправка запроса на сервер...');
    console.log('ID участника перед запросом:', memberId);

    const response = await axios.post(
      `${API_URL}/Member/GetProfile`, // URL для получения данных
      memberId,  // Отправляем только GUID, без обертки в объект
      {
        headers: {
          'Content-Type': 'application/json',  // Указываем Content-Type
        },
      }
    );

    console.log('Ответ от сервера:', response.data);
    return response.data;  // Возвращаем данные из ответа
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error.response || error);
    throw error;  // Пробрасываем ошибку для дальнейшей обработки
  }
};

export const updateProfile = async (updatedData) => {
  try {
    const response = await fetch(`${API_URL}/Member/UpdateMember`, {
      method: 'PUT',  // Используем PUT для обновления данных
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),  // Отправляем обновленные данные
    });

    if (!response.ok) {
      throw new Error('Не удалось обновить данные');
    }

    const result = await response.json();
    return result;  // Возвращаем результат, если обновление прошло успешно
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    throw error;  // Бросаем ошибку, чтобы обработать её в компоненте
  }
};

export const fetchUserTeams = async (memberId) => {
  try {
      const response = await axios.get(`${API_URL}/MemberRole/GetUserTeams/${memberId}`, {
        method: 'PUT',  // Используем PUT для обновления данных
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberId),  // Отправляем обновленные данные
      });
      return response.data;
  } catch (error) {
      console.error('Ошибка при получении команд пользователя:', error);
      throw error;
  }
};

export const fetchTeamMembers = async (teamId) => {
  try {
    const response = await axios.get(`${API_URL}/Team/GetTeamMembers/${teamId}`, {
      method: 'PUT',  // Используем PUT для обновления данных
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamId),  // Отправляем обновленные данные
    });
    return response.data; // Возвращаем данные участников с их ролями
  } catch (error) {
    console.error('Ошибка при загрузке участников команды:', error);
    throw error; // Возбуждаем ошибку, чтобы можно было обработать её в компоненте
  }
};

