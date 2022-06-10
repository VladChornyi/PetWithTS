import Title from '../../Components/common/title/Title';
import Button from '../../Components/common/button/Button';
import { ProjectsStyled } from './ProjectsStyled';
import ProjectsList from '../../Components/projects/projectsList/ProjectsList';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import projectSelectors from '../../redux/projects/projects-selectors';
import { token } from '../../redux/auth/auth-operations';
import { authSelectors } from '../../redux/auth';
import CreateProject from '../../Components/projects/createProject/CreateProject';
import projectOperations from '../../redux/projects/projects-operations';
import { AppDispatch, RootState } from '../../redux/store';
import { TToken } from '../../redux/types/typesStore';

const Projects = () => {
  const isAuth = useSelector<RootState, TToken>(authSelectors.getAccessToken);
  const projects = useSelector(projectSelectors.getProjects);
  const dispatch: AppDispatch = useDispatch();

  const [closeModalProject, setCloseModalProject] = useState(false);

  useEffect(() => {
    token.set(isAuth);
    !projects?.length && isAuth && dispatch(projectOperations.getProjects());
  }, [dispatch, isAuth, projects?.length]);

  return (
    <ProjectsStyled>
      <div className="headerWrapper">
        <Title title="Проекти" />
        <div className="buttonWrapper">
          <Button onHandleClick={() => setCloseModalProject(true)} />
          <p className="buttonMessage">Створити проект</p>
        </div>
      </div>
      {projects && <ProjectsList projects={projects} />}
      <CreateProject closeModal={closeModalProject} setCloseModal={setCloseModalProject} />
    </ProjectsStyled>
  );
};

export default Projects;
