import React, { useState } from "react";
import ProjectTable from './ProjectTable';
import KanbanBoard from './KanbanBoard';
import './ProjectList.css';

const initialData = {
  lanes: {
    'lane1': {
      id: 'lane1',
      title: 'В планах',
      cards: [
        { id: 'Card1', title: 'Сделать бекенд', description: 'Доделать все запросы к БД', createdat: '06.12.2024', deadline: '23.12.2024', assignee: 'Кирилл' },
        { id: 'Card2', title: 'Сделать фронтенд', description: 'Доделать весь интерфейс на react.js', createdat: '06.12.2024', deadline: '23.12.2024', assignee: 'Кирилл' }
      ]
    },
    'lane2': {
      id: 'lane2',
      title: 'В процессе',
      cards: []
    },
    'lane3': {
      id: 'lane3',
      title: 'Выполненные',
      cards: []
    },
    'lane4': {
      id: 'lane4',
      title: 'Не выполненные',
      cards: []
    }
  }
};

const projects = [
  { id: 1, name: "Пример проекта", manager: "Имя менеджера" }
];

const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [data, setData] = useState(initialData);

  const handleRowClick = (projectId) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceLane = data.lanes[source.droppableId];
    const destLane = data.lanes[destination.droppableId];

    // Используем Object.assign для обеспечения сохранения всех лейнов
    const newLanes = { ...data.lanes };

    if (source.droppableId !== destination.droppableId) {
      const [removed] = newLanes[source.droppableId].cards.splice(source.index, 1);
      newLanes[destination.droppableId].cards.splice(destination.index, 0, removed);
    } else {
      const [removed] = newLanes[source.droppableId].cards.splice(source.index, 1);
      newLanes[source.droppableId].cards.splice(destination.index, 0, removed);
    }

    setData({
      ...data,
      lanes: newLanes
    });
  };

  return (
    <div className="teams-table">
      <ProjectTable
        projects={projects}
        onRowClick={handleRowClick}
        selectedProject={selectedProject}
      />
      {selectedProject && (
        <KanbanBoard data={data} onDragEnd={onDragEnd} setData={setData} />
      )}
    </div>
  );
};

export default ProjectList;
