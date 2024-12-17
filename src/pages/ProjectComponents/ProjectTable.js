import React from 'react';

const ProjectTable = ({ projects, onRowClick, selectedProject }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Проект</th>
          <th>Менеджер</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr
            key={project.id}
            onClick={() => onRowClick(project.id)}
            className={`project-row ${selectedProject === project.id ? 'selected' : ''}`}
          >
            <td>{project.name}</td>
            <td>{project.manager}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProjectTable;
